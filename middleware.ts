import { NextResponse } from 'next/server';
import rateLimit from 'express-rate-limit';

// Create a rate limiter
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'Too many requests from this IP, please try again after a minute.'
});

// Middleware function
export async function middleware(request: NextRequest) {
  // Apply rate limiting
  return new Promise((resolve) => {
    limiter(request, {}, (result) => {
      if (result instanceof Error) {
        return resolve(NextResponse.json({ error: result.message }, { status: 429 }));
      }
      return resolve(NextResponse.next());
    });
  });
}

// Define which paths the middleware should apply to
export const config = {
  matcher: '/api/:path*', // Apply to all API routes
}; 