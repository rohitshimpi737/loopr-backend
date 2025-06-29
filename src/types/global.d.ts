// Global type declarations
import { Request } from 'express';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PORT?: string;
      MONGODB_URI: string;
      JWT_SECRET: string;
      ALLOWED_ORIGINS?: string;
    }
  }
}

// Express Request extensions
export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

export {};
