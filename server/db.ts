import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { InsertUser, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance.
// DB_SSL=true (recommended default for hosted DBs like TiDB Cloud, PlanetScale,
// Railway's managed MySQL over the public network, etc.) enables TLS.
// Set DB_SSL=false only for a local/unencrypted MySQL instance.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      const useSsl = process.env.DB_SSL !== "false";
      const pool = mysql.createPool({
        uri: process.env.DATABASE_URL,
        ...(useSsl ? { ssl: { minVersion: "TLSv1.2" } } : {}),
      });
      _db = drizzle(pool);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ============ USER OPERATIONS ============

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod", "passwordHash"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getUserByEmail(email: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ============ MOCK DATA HELPERS ============
// These return mock data for rapid development

export async function getProducts(filters?: any, limit = 20, offset = 0) {
  return [
    {
      id: 1,
      shopId: 1,
      name: "Laptop Premium",
      slug: "laptop-premium",
      description: "High-performance laptop for professionals",
      category: "Electronics",
      subcategory: "Computers",
      price: "1500.00",
      discountPrice: "1200.00",
      images: JSON.stringify(["https://via.placeholder.com/500"]),
      stock: 10,
      rating: "4.5",
      totalReviews: 45,
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      shopId: 1,
      name: "Wireless Mouse",
      slug: "wireless-mouse",
      description: "Ergonomic wireless mouse",
      category: "Electronics",
      subcategory: "Accessories",
      price: "25.00",
      discountPrice: "20.00",
      images: JSON.stringify(["https://via.placeholder.com/500"]),
      stock: 50,
      rating: "4.8",
      totalReviews: 120,
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
}

export async function getProductById(id: number) {
  return {
    id: 1,
    shopId: 1,
    name: "Laptop Premium",
    slug: "laptop-premium",
    description: "High-performance laptop for professionals with 16GB RAM and 512GB SSD",
    category: "Electronics",
    subcategory: "Computers",
    price: "1500.00",
    discountPrice: "1200.00",
    images: JSON.stringify([
      "https://via.placeholder.com/500",
      "https://via.placeholder.com/500",
      "https://via.placeholder.com/500",
    ]),
    stock: 10,
    rating: "4.5",
    totalReviews: 45,
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export async function getShopBySlug(slug: string) {
  return {
    id: 1,
    userId: 1,
    name: "TechStore Premium",
    slug: "techstore-premium",
    description: "Your trusted source for premium technology products",
    logo: "https://via.placeholder.com/100",
    banner: "https://via.placeholder.com/1200x300",
    category: "Electronics",
    isVerified: true,
    rating: "4.7",
    totalReviews: 250,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export async function getShops(limit = 10, offset = 0) {
  return [
    {
      id: 1,
      userId: 1,
      name: "TechStore Premium",
      slug: "techstore-premium",
      description: "Your trusted source for premium technology products",
      logo: "https://via.placeholder.com/100",
      banner: "https://via.placeholder.com/1200x300",
      category: "Electronics",
      isVerified: true,
      rating: "4.7",
      totalReviews: 250,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
}

export async function getCourses(limit = 10, offset = 0) {
  return [
    {
      id: 1,
      trainerId: 1,
      title: "Web Development Masterclass",
      description: "Learn modern web development with React and Node.js",
      category: "Technology",
      level: "beginner",
      price: "99.00",
      image: "https://via.placeholder.com/500",
      rating: "4.8",
      totalReviews: 320,
      enrolledCount: 1500,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
}

export async function getJobs(limit = 10, offset = 0) {
  return [
    {
      id: 1,
      recruiterId: 1,
      title: "Senior React Developer",
      description: "We are looking for an experienced React developer",
      jobType: "full-time",
      category: "Technology",
      location: "Remote",
      salary: "80000.00",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
}

export async function getTravels(limit = 10, offset = 0) {
  return [
    {
      id: 1,
      providerId: 1,
      title: "Paris City Tour",
      description: "Explore the beauty of Paris with our guided tour",
      type: "tour",
      location: "Paris, France",
      price: "500.00",
      image: "https://via.placeholder.com/500",
      rating: "4.9",
      totalReviews: 200,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
}

// ============ ORDER OPERATIONS ============

export async function createOrder(data: any) {
  return {
    id: Math.floor(Math.random() * 10000),
    buyerId: data.buyerId,
    sellerId: data.sellerId,
    totalAmount: data.totalAmount,
    status: "pending",
    createdAt: new Date(),
  };
}

export async function getOrdersByBuyer(buyerId: number) {
  return [
    {
      id: 1,
      buyerId,
      sellerId: 1,
      totalAmount: "1200.00",
      status: "delivered",
      createdAt: new Date(),
    },
  ];
}

export async function getOrdersBySeller(sellerId: number) {
  return [
    {
      id: 1,
      buyerId: 1,
      sellerId,
      totalAmount: "1200.00",
      status: "pending",
      createdAt: new Date(),
    },
  ];
}

// ============ MESSAGE OPERATIONS ============

export async function getConversations(userId: number) {
  return [
    {
      id: 1,
      user1Id: userId,
      user2Id: 2,
      createdAt: new Date(),
    },
  ];
}

export async function getMessages(conversationId: number) {
  return [
    {
      id: 1,
      conversationId,
      senderId: 1,
      content: "Hello, I'm interested in your product",
      createdAt: new Date(),
    },
  ];
}

// ============ REVIEW OPERATIONS ============

export async function getProductReviews(productId: number) {
  return [
    {
      id: 1,
      productId,
      reviewerId: 1,
      rating: 5,
      comment: "Excellent product, highly recommended!",
      createdAt: new Date(),
    },
  ];
}

export async function getShopReviews(shopId: number) {
  return [
    {
      id: 1,
      shopId,
      reviewerId: 1,
      rating: 5,
      comment: "Great seller, fast shipping!",
      createdAt: new Date(),
    },
  ];
}

// ============ FAVORITE OPERATIONS ============

export async function getFavorites(userId: number) {
  return [
    { id: 1, userId, productId: 1, createdAt: new Date() },
  ];
}

// ============ DROPSHIPPING OPERATIONS ============

export async function getDropshippingProducts(supplierId: number) {
  return [
    {
      id: 1,
      supplierId,
      name: "Wireless Headphones",
      price: "50.00",
      stock: 100,
      createdAt: new Date(),
    },
  ];
}

export async function getDropshipperImports(dropshipperId: number) {
  return [
    {
      id: 1,
      dropsipperId: dropshipperId,
      productId: 1,
      marginPercent: "50.00",
      priceResale: "75.00",
      profitPi: "25.00",
      totalSales: 10,
      createdAt: new Date(),
    },
  ];
}

// ============ GPS OPERATIONS ============

export async function getNearbyShops(latitude: number, longitude: number, radiusKm = 10) {
  return [
    {
      id: 1,
      name: "TechStore Premium",
      latitude: latitude + 0.01,
      longitude: longitude + 0.01,
      distance: 2.5,
    },
  ];
}

export async function getNearbyDrivers(latitude: number, longitude: number, radiusKm = 5) {
  return [
    {
      id: 1,
      name: "John Driver",
      latitude: latitude + 0.005,
      longitude: longitude + 0.005,
      distance: 1.2,
    },
  ];
}

// ============ INVOICE OPERATIONS ============

export async function generateInvoice(orderId: number) {
  return {
    id: Math.floor(Math.random() * 10000),
    orderId,
    invoiceNumber: `INV-${Date.now()}`,
    totalAmount: "1200.00",
    createdAt: new Date(),
  };
}

// ============ DISPUTE OPERATIONS ============

export async function createDispute(data: any) {
  return {
    id: Math.floor(Math.random() * 10000),
    orderId: data.orderId,
    buyerId: data.buyerId,
    reason: data.reason,
    status: "open",
    createdAt: new Date(),
  };
}

export async function getDisputes(userId: number) {
  return [
    {
      id: 1,
      orderId: 1,
      buyerId: userId,
      reason: "Product not received",
      status: "open",
      createdAt: new Date(),
    },
  ];
}
