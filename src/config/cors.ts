import { CorsOptions } from "cors";

const ALLOWED_ORIGINS = [process.env.FRONTEND_URL];

export const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};