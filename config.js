// Backend base URL (works for local, preview, and production)
export const serverUrl =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

// Optional: simple helper for debugging
export const isProduction = import.meta.env.PROD;