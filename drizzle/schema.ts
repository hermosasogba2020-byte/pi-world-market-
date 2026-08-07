import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, longtext, boolean, datetime, index, unique } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

/**
 * Core user table backing auth flow.
 * Extended with role-based access control for multi-service platform.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  passwordHash: varchar("passwordHash", { length: 255 }),
  phone: varchar("phone", { length: 20 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  // User profile details
  avatar: text("avatar"), // URL to profile picture
  bio: text("bio"),
  country: varchar("country", { length: 100 }),
  city: varchar("city", { length: 100 }),
  // Account status
  isVerified: boolean("isVerified").default(false),
  isBanned: boolean("isBanned").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
}, (table) => ({
  emailIdx: index("email_idx").on(table.email),
  openIdIdx: index("openId_idx").on(table.openId),
}));

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * User roles/permissions table - tracks which services each user can access
 */
export const userRoles = mysqlTable("userRoles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  roleType: mysqlEnum("roleType", ["buyer", "seller", "trainer", "recruiter", "candidate", "driver", "wholesaler", "dropshipper", "investor", "ambassador", "admin"]).notNull(),
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index("userRoles_userId_idx").on(table.userId),
}));

export type UserRole = typeof userRoles.$inferSelect;
export type InsertUserRole = typeof userRoles.$inferInsert;

/**
 * Seller shops - personalized storefronts for vendors
 */
export const shops = mysqlTable("shops", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  logo: text("logo"), // URL
  banner: text("banner"), // URL
  category: varchar("category", { length: 100 }), // e.g., "electronics", "fashion"
  isVerified: boolean("isVerified").default(false),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0"),
  totalReviews: int("totalReviews").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  userIdIdx: index("shops_userId_idx").on(table.userId),
  slugIdx: index("shops_slug_idx").on(table.slug),
}));

export type Shop = typeof shops.$inferSelect;
export type InsertShop = typeof shops.$inferInsert;

/**
 * Marketplace products
 */
export const products = mysqlTable("products", {
  id: int("id").autoincrement().primaryKey(),
  shopId: int("shopId").notNull().references(() => shops.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),
  description: longtext("description"),
  category: varchar("category", { length: 100 }).notNull(),
  subcategory: varchar("subcategory", { length: 100 }),
  price: decimal("price", { precision: 12, scale: 2 }).notNull(),
  discountPrice: decimal("discountPrice", { precision: 12, scale: 2 }),
  images: longtext("images"), // JSON array of image URLs
  stock: int("stock").default(0),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0"),
  totalReviews: int("totalReviews").default(0),
  status: mysqlEnum("status", ["active", "inactive", "archived"]).default("active"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  shopIdIdx: index("products_shopId_idx").on(table.shopId),
  categoryIdx: index("products_category_idx").on(table.category),
  slugIdx: index("products_slug_idx").on(table.slug),
}));

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

/**
 * Online courses/training
 */
export const courses = mysqlTable("courses", {
  id: int("id").autoincrement().primaryKey(),
  trainerId: int("trainerId").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),
  description: longtext("description"),
  category: varchar("category", { length: 100 }).notNull(),
  level: mysqlEnum("level", ["beginner", "intermediate", "advanced"]).default("beginner"),
  price: decimal("price", { precision: 12, scale: 2 }).notNull(),
  thumbnail: text("thumbnail"), // URL
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0"),
  totalReviews: int("totalReviews").default(0),
  totalStudents: int("totalStudents").default(0),
  duration: int("duration"), // in hours
  status: mysqlEnum("status", ["draft", "published", "archived"]).default("draft"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  trainerIdIdx: index("courses_trainerId_idx").on(table.trainerId),
  categoryIdx: index("courses_category_idx").on(table.category),
  slugIdx: index("courses_slug_idx").on(table.slug),
}));

export type Course = typeof courses.$inferSelect;
export type InsertCourse = typeof courses.$inferInsert;

/**
 * Course lessons/modules
 */
export const lessons = mysqlTable("lessons", {
  id: int("id").autoincrement().primaryKey(),
  courseId: int("courseId").notNull().references(() => courses.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  videoUrl: text("videoUrl"),
  duration: int("duration"), // in minutes
  orderIndex: int("orderIndex").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  courseIdIdx: index("lessons_courseId_idx").on(table.courseId),
}));

export type Lesson = typeof lessons.$inferSelect;
export type InsertLesson = typeof lessons.$inferInsert;

/**
 * Course enrollments and progress tracking
 */
export const courseEnrollments = mysqlTable("courseEnrollments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  courseId: int("courseId").notNull().references(() => courses.id, { onDelete: "cascade" }),
  enrolledAt: timestamp("enrolledAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
  progress: int("progress").default(0), // percentage 0-100
  status: mysqlEnum("status", ["enrolled", "in_progress", "completed", "dropped"]).default("enrolled"),
}, (table) => ({
  userIdIdx: index("courseEnrollments_userId_idx").on(table.userId),
  courseIdIdx: index("courseEnrollments_courseId_idx").on(table.courseId),
  uniqueEnrollment: unique("unique_enrollment").on(table.userId, table.courseId),
}));

export type CourseEnrollment = typeof courseEnrollments.$inferSelect;
export type InsertCourseEnrollment = typeof courseEnrollments.$inferInsert;

/**
 * Job postings
 */
export const jobs = mysqlTable("jobs", {
  id: int("id").autoincrement().primaryKey(),
  recruiterId: int("recruiterId").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),
  description: longtext("description"),
  category: varchar("category", { length: 100 }).notNull(),
  jobType: mysqlEnum("jobType", ["full-time", "part-time", "contract", "freelance", "temporary"]).notNull(),
  location: varchar("location", { length: 255 }),
  salaryMin: decimal("salaryMin", { precision: 12, scale: 2 }),
  salaryMax: decimal("salaryMax", { precision: 12, scale: 2 }),
  experience: varchar("experience", { length: 100 }), // e.g., "1-3 years"
  skills: longtext("skills"), // JSON array
  status: mysqlEnum("status", ["open", "closed", "archived"]).default("open"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  recruiterIdIdx: index("jobs_recruiterId_idx").on(table.recruiterId),
  categoryIdx: index("jobs_category_idx").on(table.category),
  slugIdx: index("jobs_slug_idx").on(table.slug),
}));

export type Job = typeof jobs.$inferSelect;
export type InsertJob = typeof jobs.$inferInsert;

/**
 * Job applications
 */
export const jobApplications = mysqlTable("jobApplications", {
  id: int("id").autoincrement().primaryKey(),
  jobId: int("jobId").notNull().references(() => jobs.id, { onDelete: "cascade" }),
  candidateId: int("candidateId").notNull().references(() => users.id, { onDelete: "cascade" }),
  cvUrl: text("cvUrl"), // URL to CV/Resume
  coverLetter: longtext("coverLetter"),
  status: mysqlEnum("status", ["pending", "reviewed", "shortlisted", "rejected", "accepted"]).default("pending"),
  appliedAt: timestamp("appliedAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  jobIdIdx: index("jobApplications_jobId_idx").on(table.jobId),
  candidateIdIdx: index("jobApplications_candidateId_idx").on(table.candidateId),
}));

export type JobApplication = typeof jobApplications.$inferSelect;
export type InsertJobApplication = typeof jobApplications.$inferInsert;

/**
 * Travel/Tourism listings
 */
export const travels = mysqlTable("travels", {
  id: int("id").autoincrement().primaryKey(),
  providerId: int("providerId").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),
  description: longtext("description"),
  type: mysqlEnum("type", ["tour", "transport", "accommodation", "package"]).notNull(),
  destination: varchar("destination", { length: 255 }).notNull(),
  departureDate: datetime("departureDate"),
  returnDate: datetime("returnDate"),
  price: decimal("price", { precision: 12, scale: 2 }).notNull(),
  capacity: int("capacity"), // Number of available spots
  booked: int("booked").default(0), // Number of bookings
  images: longtext("images"), // JSON array
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0"),
  totalReviews: int("totalReviews").default(0),
  status: mysqlEnum("status", ["available", "full", "cancelled"]).default("available"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  providerIdIdx: index("travels_providerId_idx").on(table.providerId),
  typeIdx: index("travels_type_idx").on(table.type),
  slugIdx: index("travels_slug_idx").on(table.slug),
}));

export type Travel = typeof travels.$inferSelect;
export type InsertTravel = typeof travels.$inferInsert;

/**
 * Travel bookings
 */
export const travelBookings = mysqlTable("travelBookings", {
  id: int("id").autoincrement().primaryKey(),
  travelId: int("travelId").notNull().references(() => travels.id, { onDelete: "cascade" }),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  quantity: int("quantity").notNull(), // Number of spots
  totalPrice: decimal("totalPrice", { precision: 12, scale: 2 }).notNull(),
  status: mysqlEnum("status", ["pending", "confirmed", "cancelled", "completed"]).default("pending"),
  bookedAt: timestamp("bookedAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  travelIdIdx: index("travelBookings_travelId_idx").on(table.travelId),
  userIdIdx: index("travelBookings_userId_idx").on(table.userId),
}));

export type TravelBooking = typeof travelBookings.$inferSelect;
export type InsertTravelBooking = typeof travelBookings.$inferInsert;

/**
 * Messages between users
 */
export const messages = mysqlTable("messages", {
  id: int("id").autoincrement().primaryKey(),
  senderId: int("senderId").notNull().references(() => users.id, { onDelete: "cascade" }),
  recipientId: int("recipientId").notNull().references(() => users.id, { onDelete: "cascade" }),
  content: longtext("content").notNull(),
  isRead: boolean("isRead").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  senderIdIdx: index("messages_senderId_idx").on(table.senderId),
  recipientIdIdx: index("messages_recipientId_idx").on(table.recipientId),
}));

export type Message = typeof messages.$inferSelect;
export type InsertMessage = typeof messages.$inferInsert;

/**
 * Reviews and ratings for products, courses, shops, etc.
 */
export const reviews = mysqlTable("reviews", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  targetType: mysqlEnum("targetType", ["product", "shop", "course", "job", "travel", "user"]).notNull(),
  targetId: int("targetId").notNull(), // ID of the reviewed item
  rating: int("rating").notNull(), // 1-5
  title: varchar("title", { length: 255 }),
  content: longtext("content"),
  isVerifiedPurchase: boolean("isVerifiedPurchase").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  userIdIdx: index("reviews_userId_idx").on(table.userId),
  targetIdx: index("reviews_target_idx").on(table.targetType, table.targetId),
}));

export type Review = typeof reviews.$inferSelect;
export type InsertReview = typeof reviews.$inferInsert;

/**
 * Orders for marketplace products
 */
export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  orderNumber: varchar("orderNumber", { length: 50 }).notNull().unique(),
  totalPrice: decimal("totalPrice", { precision: 12, scale: 2 }).notNull(),
  status: mysqlEnum("status", ["pending", "confirmed", "shipped", "delivered", "cancelled"]).default("pending"),
  shippingAddress: longtext("shippingAddress"), // JSON
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  userIdIdx: index("orders_userId_idx").on(table.userId),
  orderNumberIdx: index("orders_orderNumber_idx").on(table.orderNumber),
}));

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;

/**
 * Order items
 */
export const orderItems = mysqlTable("orderItems", {
  id: int("id").autoincrement().primaryKey(),
  orderId: int("orderId").notNull().references(() => orders.id, { onDelete: "cascade" }),
  productId: int("productId").notNull().references(() => products.id, { onDelete: "cascade" }),
  quantity: int("quantity").notNull(),
  price: decimal("price", { precision: 12, scale: 2 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  orderIdIdx: index("orderItems_orderId_idx").on(table.orderId),
  productIdIdx: index("orderItems_productId_idx").on(table.productId),
}));

export type OrderItem = typeof orderItems.$inferSelect;
export type InsertOrderItem = typeof orderItems.$inferInsert;

/**
 * User favorites/wishlist
 */
export const favorites = mysqlTable("favorites", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  itemType: mysqlEnum("itemType", ["product", "course", "job", "travel"]).notNull(),
  itemId: int("itemId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index("favorites_userId_idx").on(table.userId),
  itemIdx: index("favorites_item_idx").on(table.itemType, table.itemId),
}));

export type Favorite = typeof favorites.$inferSelect;
export type InsertFavorite = typeof favorites.$inferInsert;

/**
 * Invoices for orders
 */
export const invoices = mysqlTable("invoices", {
  id: int("id").autoincrement().primaryKey(),
  orderId: int("orderId").notNull().references(() => orders.id, { onDelete: "cascade" }),
  invoiceNumber: varchar("invoiceNumber", { length: 50 }).notNull().unique(),
  totalAmount: decimal("totalAmount", { precision: 12, scale: 2 }).notNull(),
  pdfUrl: text("pdfUrl"), // URL to generated PDF
  status: mysqlEnum("status", ["draft", "issued", "paid", "cancelled"]).default("issued"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  orderIdIdx: index("invoices_orderId_idx").on(table.orderId),
  invoiceNumberIdx: index("invoices_invoiceNumber_idx").on(table.invoiceNumber),
}));

export type Invoice = typeof invoices.$inferSelect;
export type InsertInvoice = typeof invoices.$inferInsert;

/**
 * Claims/Disputes for orders
 */
export const claims = mysqlTable("claims", {
  id: int("id").autoincrement().primaryKey(),
  orderId: int("orderId").notNull().references(() => orders.id, { onDelete: "cascade" }),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  reason: varchar("reason", { length: 255 }).notNull(),
  description: longtext("description"),
  status: mysqlEnum("status", ["open", "in_review", "resolved", "closed"]).default("open"),
  decision: text("decision"), // Admin decision
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  orderIdIdx: index("claims_orderId_idx").on(table.orderId),
  userIdIdx: index("claims_userId_idx").on(table.userId),
}));

export type Claim = typeof claims.$inferSelect;
export type InsertClaim = typeof claims.$inferInsert;

/**
 * GPS Locations for tracking
 */
export const locations = mysqlTable("locations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  latitude: decimal("latitude", { precision: 10, scale: 8 }).notNull(),
  longitude: decimal("longitude", { precision: 11, scale: 8 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index("locations_userId_idx").on(table.userId),
}));

export type Location = typeof locations.$inferSelect;
export type InsertLocation = typeof locations.$inferInsert;

/**
 * Dropshipping relationships
 */
export const dropshipProducts = mysqlTable("dropshipProducts", {
  id: int("id").autoincrement().primaryKey(),
  productId: int("productId").notNull().references(() => products.id, { onDelete: "cascade" }),
  wholesalerId: int("wholesalerId").notNull().references(() => users.id, { onDelete: "cascade" }),
  dropshipperId: int("dropshipperId").notNull().references(() => users.id, { onDelete: "cascade" }),
  wholesalePrice: decimal("wholesalePrice", { precision: 12, scale: 2 }).notNull(),
  dropshipPrice: decimal("dropshipPrice", { precision: 12, scale: 2 }).notNull(),
  commission: decimal("commission", { precision: 5, scale: 2 }).notNull(), // percentage
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  productIdIdx: index("dropshipProducts_productId_idx").on(table.productId),
  wholesalerIdIdx: index("dropshipProducts_wholesalerId_idx").on(table.wholesalerId),
  dropshipperIdIdx: index("dropshipProducts_dropshipperId_idx").on(table.dropshipperId),
}));

export type DropshipProduct = typeof dropshipProducts.$inferSelect;
export type InsertDropshipProduct = typeof dropshipProducts.$inferInsert;

/**
 * Real Estate listings
 */
export const realEstateListings = mysqlTable("realEstateListings", {
  id: int("id").autoincrement().primaryKey(),
  agentId: int("agentId").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),
  description: longtext("description"),
  type: mysqlEnum("type", ["house", "apartment", "land", "commercial", "office"]).notNull(),
  price: decimal("price", { precision: 15, scale: 2 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  area: int("area"), // in square meters
  bedrooms: int("bedrooms"),
  bathrooms: int("bathrooms"),
  images: longtext("images"), // JSON array
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0"),
  totalReviews: int("totalReviews").default(0),
  status: mysqlEnum("status", ["available", "sold", "rented", "archived"]).default("available"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  agentIdIdx: index("realEstateListings_agentId_idx").on(table.agentId),
  typeIdx: index("realEstateListings_type_idx").on(table.type),
  slugIdx: index("realEstateListings_slug_idx").on(table.slug),
}));

export type RealEstateListing = typeof realEstateListings.$inferSelect;
export type InsertRealEstateListing = typeof realEstateListings.$inferInsert;

/**
 * Vehicle listings
 */
export const vehicleListings = mysqlTable("vehicleListings", {
  id: int("id").autoincrement().primaryKey(),
  sellerId: int("sellerId").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),
  description: longtext("description"),
  type: mysqlEnum("type", ["car", "motorcycle", "truck", "bus", "boat", "aircraft"]).notNull(),
  brand: varchar("brand", { length: 100 }).notNull(),
  model: varchar("model", { length: 100 }).notNull(),
  year: int("year"),
  price: decimal("price", { precision: 15, scale: 2 }).notNull(),
  mileage: int("mileage"), // in kilometers
  images: longtext("images"), // JSON array
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0"),
  totalReviews: int("totalReviews").default(0),
  status: mysqlEnum("status", ["available", "sold", "archived"]).default("available"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  sellerIdIdx: index("vehicleListings_sellerId_idx").on(table.sellerId),
  typeIdx: index("vehicleListings_type_idx").on(table.type),
  slugIdx: index("vehicleListings_slug_idx").on(table.slug),
}));

export type VehicleListing = typeof vehicleListings.$inferSelect;
export type InsertVehicleListing = typeof vehicleListings.$inferInsert;

/**
 * Investment projects
 */
export const investmentProjects = mysqlTable("investmentProjects", {
  id: int("id").autoincrement().primaryKey(),
  entrepreneurId: int("entrepreneurId").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),
  description: longtext("description"),
  category: varchar("category", { length: 100 }).notNull(),
  targetAmount: decimal("targetAmount", { precision: 15, scale: 2 }).notNull(),
  raisedAmount: decimal("raisedAmount", { precision: 15, scale: 2 }).default("0"),
  minInvestment: decimal("minInvestment", { precision: 12, scale: 2 }).notNull(),
  expectedReturn: decimal("expectedReturn", { precision: 5, scale: 2 }), // percentage
  status: mysqlEnum("status", ["draft", "active", "funded", "closed"]).default("draft"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  entrepreneurIdIdx: index("investmentProjects_entrepreneurId_idx").on(table.entrepreneurId),
  categoryIdx: index("investmentProjects_category_idx").on(table.category),
  slugIdx: index("investmentProjects_slug_idx").on(table.slug),
}));

export type InvestmentProject = typeof investmentProjects.$inferSelect;
export type InsertInvestmentProject = typeof investmentProjects.$inferInsert;

/**
 * Investments
 */
export const investments = mysqlTable("investments", {
  id: int("id").autoincrement().primaryKey(),
  projectId: int("projectId").notNull().references(() => investmentProjects.id, { onDelete: "cascade" }),
  investorId: int("investorId").notNull().references(() => users.id, { onDelete: "cascade" }),
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
  status: mysqlEnum("status", ["pending", "confirmed", "completed"]).default("pending"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  projectIdIdx: index("investments_projectId_idx").on(table.projectId),
  investorIdIdx: index("investments_investorId_idx").on(table.investorId),
}));

export type Investment = typeof investments.$inferSelect;
export type InsertInvestment = typeof investments.$inferInsert;
