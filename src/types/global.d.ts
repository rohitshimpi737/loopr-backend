// Global type declarations for Node.js
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
    
    interface Global {
      console: Console;
      process: NodeJS.Process;
    }
  }
  
  // Make console and process available globally
  var console: Console;
  var process: NodeJS.Process;
  var __dirname: string;
  var __filename: string;
  var require: NodeRequire;
  var module: NodeModule;
}

// Express Request extensions
export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

export {};
