export const ENV = {
  // Identifies this app instance (used inside signed session JWTs)
  appId: process.env.APP_ID ?? "pi-world-market",

  // Secret used to sign/verify the session cookie (JWT). MUST be set in production.
  cookieSecret: process.env.JWT_SECRET ?? "",

  // MySQL connection string, e.g. mysql://user:pass@host:3306/dbname
  databaseUrl: process.env.DATABASE_URL ?? "",

  isProduction: process.env.NODE_ENV === "production",

  // openId of the account that should automatically get the "admin" role
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",

  // OpenAI-compatible Chat Completions API (used for AI chat features).
  // Works with OpenAI directly, or any OpenAI-compatible provider/gateway.
  openaiApiKey: process.env.OPENAI_API_KEY ?? "",
  openaiBaseUrl: process.env.OPENAI_BASE_URL ?? "https://api.openai.com",
  openaiChatModel: process.env.OPENAI_CHAT_MODEL ?? "gpt-4o-mini",
  openaiImageModel: process.env.OPENAI_IMAGE_MODEL ?? "gpt-image-1",

  // S3-compatible object storage (AWS S3, Cloudflare R2, MinIO, ...)
  s3Bucket: process.env.S3_BUCKET ?? "",
  s3Region: process.env.S3_REGION ?? "auto",
  s3Endpoint: process.env.S3_ENDPOINT ?? "", // leave empty for real AWS S3
  s3AccessKeyId: process.env.S3_ACCESS_KEY_ID ?? "",
  s3SecretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? "",
  s3PublicBaseUrl: process.env.S3_PUBLIC_BASE_URL ?? "", // optional CDN/public URL prefix

  // Google Maps (used for geocoding/directions/places features)
  googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY ?? "",
};
