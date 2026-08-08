import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { sdk } from "./_core/sdk";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import * as db from "./db";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { randomUUID, scrypt as scryptCb } from "crypto";
import { promisify } from "util";

const scrypt = promisify(scryptCb);

async function hashPassword(password: string): Promise<string> {
  const salt = randomUUID().replace(/-/g, "");
  const derived = (await scrypt(password, salt, 64)) as Buffer;
  return `${salt}:${derived.toString("hex")}`;
}

async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [salt, hashHex] = stored.split(":");
  if (!salt || !hashHex) return false;
  const derived = (await scrypt(password, salt, 64)) as Buffer;
  const storedBuf = Buffer.from(hashHex, "hex");
  if (derived.length !== storedBuf.length) return false;
  return derived.equals(storedBuf);
}

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),

    register: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          password: z.string().min(8),
          name: z.string().min(1).max(120),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const existing = await db.getUserByEmail(input.email);
        if (existing) {
          throw new TRPCError({ code: "CONFLICT", message: "Un compte existe déjà avec cet email" });
        }

        const openId = `local_${randomUUID()}`;
        const passwordHash = await hashPassword(input.password);

        await db.upsertUser({
          openId,
          email: input.email,
          name: input.name,
          passwordHash,
          loginMethod: "email",
          lastSignedIn: new Date(),
        });

        const sessionToken = await sdk.createSessionToken(openId, {
          name: input.name,
          expiresInMs: ONE_YEAR_MS,
        });

        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

        return await db.getUserByOpenId(openId);
      }),

    login: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          password: z.string().min(1),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const user = await db.getUserByEmail(input.email);
        if (!user || !user.passwordHash) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Email ou mot de passe incorrect" });
        }

        const valid = await verifyPassword(input.password, user.passwordHash);
        if (!valid) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Email ou mot de passe incorrect" });
        }

        await db.upsertUser({ openId: user.openId, lastSignedIn: new Date() });

        const sessionToken = await sdk.createSessionToken(user.openId, {
          name: user.name ?? "",
          expiresInMs: ONE_YEAR_MS,
        });

        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

        return await db.getUserByOpenId(user.openId);
      }),

    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // ============ MARKETPLACE ROUTERS ============
  marketplace: router({
    // Products
    searchProducts: publicProcedure
      .input(z.object({
        query: z.string().optional(),
        category: z.string().optional(),
        limit: z.number().default(20),
        offset: z.number().default(0),
      }))
      .query(async ({ input }) => {
        if (input.query) {
          return db.getProducts({ search: input.query, category: input.category }, input.limit, input.offset);
        }
        return db.getProducts({}, input.limit, input.offset);
      }),

    getProduct: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return db.getProductById(input.id);
      }),

    // Shops
    getShop: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return db.getShopBySlug(input.slug);
      }),

    getShopProducts: publicProcedure
      .input(z.object({
        shopId: z.number(),
        limit: z.number().default(20),
      }))
      .query(async ({ input }) => {
        return db.getProducts();
      }),

    // Seller operations
    createShop: protectedProcedure
      .input(z.object({
        name: z.string().min(1),
        slug: z.string().min(1),
        description: z.string().optional(),
        category: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        // TODO: Implement shop creation
        return { success: true };
      }),

    createProduct: protectedProcedure
      .input(z.object({
        shopId: z.number(),
        name: z.string().min(1),
        description: z.string().optional(),
        category: z.string(),
        price: z.number().positive(),
        stock: z.number().default(0),
      }))
      .mutation(async ({ ctx, input }) => {
        // TODO: Implement product creation
        return { success: true };
      }),
  }),

  // ============ COURSES ROUTERS ============
  courses: router({
    searchCourses: publicProcedure
      .input(z.object({
        category: z.string().optional(),
        limit: z.number().default(20),
        offset: z.number().default(0),
      }))
      .query(async ({ input }) => {
        return db.getCourses();
      }),

    getCourse: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return { id: input.id, title: 'React Basics', price: '99.99' };
      }),

    getCourseLessons: publicProcedure
      .input(z.object({ courseId: z.number() }))
      .query(async ({ input }) => {
        return [];
      }),

    // Trainer operations
    getMyTrainerCourses: protectedProcedure
      .query(async ({ ctx }) => {
        return db.getCourses();
      }),

    createCourse: protectedProcedure
      .input(z.object({
        title: z.string().min(1),
        description: z.string().optional(),
        category: z.string(),
        price: z.number().nonnegative(),
        level: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        // TODO: Implement course creation
        return { success: true };
      }),

    // Student operations
    enrollCourse: protectedProcedure
      .input(z.object({ courseId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        // TODO: Implement course enrollment
        return { success: true };
      }),

    getMyEnrolledCourses: protectedProcedure
      .query(async ({ ctx }) => {
        return [];
      }),

    updateCourseProgress: protectedProcedure
      .input(z.object({
        courseId: z.number(),
        progress: z.number().min(0).max(100),
      }))
      .mutation(async ({ ctx, input }) => {
        // TODO: Implement progress update
        return { success: true };
      }),
  }),

  // ============ JOBS ROUTERS ============
  jobs: router({
    searchJobs: publicProcedure
      .input(z.object({
        query: z.string().optional(),
        jobType: z.string().optional(),
        limit: z.number().default(20),
        offset: z.number().default(0),
      }))
      .query(async ({ input }) => {
        return db.getJobs();
      }),

    getJob: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return { id: input.id, title: 'Senior Developer', salary: '50000-70000' };
      }),

    // Recruiter operations
    getMyJobs: protectedProcedure
      .query(async ({ ctx }) => {
        return db.getJobs();
      }),

    createJob: protectedProcedure
      .input(z.object({
        title: z.string().min(1),
        description: z.string().optional(),
        category: z.string(),
        jobType: z.enum(['full-time', 'part-time', 'contract', 'freelance', 'temporary']),
        location: z.string().optional(),
        salaryMin: z.number().optional(),
        salaryMax: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        // TODO: Implement job creation
        return { success: true };
      }),

    getJobApplications: protectedProcedure
      .input(z.object({ jobId: z.number() }))
      .query(async ({ input }) => {
        return [];
      }),

    // Candidate operations
    applyForJob: protectedProcedure
      .input(z.object({
        jobId: z.number(),
        cvUrl: z.string().optional(),
        coverLetter: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        // TODO: Implement job application
        return { success: true };
      }),

    getMyApplications: protectedProcedure
      .query(async ({ ctx }) => {
        return [];
      }),
  }),

  // ============ TRAVELS ROUTERS ============
  travels: router({
    searchTravels: publicProcedure
      .input(z.object({
        destination: z.string().optional(),
        type: z.string().optional(),
        limit: z.number().default(20),
        offset: z.number().default(0),
      }))
      .query(async ({ input }) => {
        return db.getTravels(input.limit, input.offset);
      }),

    getTravel: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return { id: input.id, title: 'Paris Tour', price: '500.00' };
      }),

    // Provider operations
    getMyTravels: protectedProcedure
      .query(async ({ ctx }) => {
        return db.getTravels();
      }),

    createTravel: protectedProcedure
      .input(z.object({
        title: z.string().min(1),
        description: z.string().optional(),
        type: z.enum(['tour', 'transport', 'accommodation', 'package']),
        destination: z.string(),
        price: z.number().positive(),
        capacity: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        // TODO: Implement travel creation
        return { success: true };
      }),

    // Booking operations
    bookTravel: protectedProcedure
      .input(z.object({
        travelId: z.number(),
        quantity: z.number().positive(),
      }))
      .mutation(async ({ ctx, input }) => {
        // TODO: Implement travel booking
        return { success: true };
      }),

    getMyBookings: protectedProcedure
      .query(async ({ ctx }) => {
        return [];
      }),
  }),

  // ============ MESSAGING ROUTERS ============
  messages: router({
    getConversations: protectedProcedure
      .query(async ({ ctx }) => {
        return db.getConversations(ctx.user.id);
      }),

    getMessages: protectedProcedure
      .input(z.object({
        userId: z.number(),
        limit: z.number().default(50),
      }))
      .query(async ({ ctx, input }) => {
        return db.getMessages(1);
      }),

    sendMessage: protectedProcedure
      .input(z.object({
        recipientId: z.number(),
        content: z.string().min(1),
      }))
      .mutation(async ({ ctx, input }) => {
        // TODO: Implement message sending
        return { success: true };
      }),
  }),

  // ============ REVIEWS ROUTERS ============
  reviews: router({
    getReviews: publicProcedure
      .input(z.object({
        targetType: z.string(),
        targetId: z.number(),
        limit: z.number().default(20),
      }))
      .query(async ({ input }) => {
        if (input.targetType === 'product') return db.getProductReviews(input.targetId);
        if (input.targetType === 'shop') return db.getShopReviews(input.targetId);
        return [];
      }),

    createReview: protectedProcedure
      .input(z.object({
        targetType: z.string(),
        targetId: z.number(),
        rating: z.number().min(1).max(5),
        title: z.string().optional(),
        content: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        // TODO: Implement review creation
        return { success: true };
      }),

    getMyReviews: protectedProcedure
      .query(async ({ ctx }) => {
        return [];
      }),
  }),

  // ============ ORDERS ROUTERS ============
  orders: router({
    getMyOrders: protectedProcedure
      .query(async ({ ctx }) => {
        return db.getOrdersByBuyer(ctx.user.id);
      }),

    getOrder: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return { id: input.id, status: 'pending', totalAmount: '1200.00' };
      }),

    getOrderItems: publicProcedure
      .input(z.object({ orderId: z.number() }))
      .query(async ({ input }) => {
        return [];
      }),

    createOrder: protectedProcedure
      .input(z.object({
        items: z.array(z.object({
          productId: z.number(),
          quantity: z.number().positive(),
        })),
        shippingAddress: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        // TODO: Implement order creation
        return { success: true };
      }),
  }),

  // ============ FAVORITES ROUTERS ============
  favorites: router({
    getFavorites: protectedProcedure
      .input(z.object({ itemType: z.string() }))
      .query(async ({ ctx, input }) => {
        return db.getFavorites(ctx.user.id);
      }),

    isFavorited: protectedProcedure
      .input(z.object({
        itemType: z.string(),
        itemId: z.number(),
      }))
      .query(async ({ ctx, input }) => {
        return { isFavorited: false };
      }),

    toggleFavorite: protectedProcedure
      .input(z.object({
        itemType: z.string(),
        itemId: z.number(),
      }))
      .mutation(async ({ ctx, input }) => {
        // TODO: Implement favorite toggle
        return { success: true };
      }),
  }),

  // ============ USER ROUTERS ============
  user: router({
    getProfile: protectedProcedure
      .query(async ({ ctx }) => {
        return db.getUserById(ctx.user.id);
      }),

    updateProfile: protectedProcedure
      .input(z.object({
        name: z.string().optional(),
        bio: z.string().optional(),
        avatar: z.string().optional(),
        country: z.string().optional(),
        city: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        // TODO: Implement profile update
        return { success: true };
      }),

    getUserRoles: protectedProcedure
      .query(async ({ ctx }) => {
        return [{ roleType: 'buyer', isActive: true }];
      }),

    hasRole: protectedProcedure
      .input(z.object({ roleType: z.string() }))
      .query(async ({ ctx, input }) => {
        return { hasRole: true };
      }),
  }),

  // ============ PAYMENT ROUTERS ============

});

export type AppRouter = typeof appRouter;
