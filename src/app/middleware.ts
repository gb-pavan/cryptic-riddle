// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { RateLimiterMemory } from 'rate-limiter-flexible';

// // Create in-memory rate limiter: 5 requests per 60 seconds
// const rateLimiter = new RateLimiterMemory({
//   points: 5,
//   duration: 60,
// });

// // Helper function to extract IP address
// const getClientIp = (request: NextRequest): string => {
//   const forwardedFor = request.headers.get('x-forwarded-for');
//   if (forwardedFor) {
//     const ipList = forwardedFor.split(',');
//     if (ipList.length > 0) return ipList[0].trim();
//   }

//   return '127.0.0.1'; // fallback in dev/local environments
// };

// export async function middleware(request: NextRequest): Promise<NextResponse> {
//   const ip: string = getClientIp(request);

//   try {
//     await rateLimiter.consume(ip);
//     return NextResponse.next();
//   } catch (rateLimitError: unknown) {
//     return new NextResponse(
//       JSON.stringify({ error: 'Too many requests. Please try again later.' }),
//       {
//         status: 429,
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//   }
// }

// // Only run middleware on this route
// export const config = {
//   matcher: '/api/encrypt',
// };

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
  points: 5,
  duration: 60,
});

const getClientIp = (request: NextRequest): string => {
  const forwardedFor = request.headers.get('x-forwarded-for');
  return forwardedFor?.split(',')[0]?.trim() || '127.0.0.1';
};

export async function middleware(request: NextRequest) {
  const ip = getClientIp(request);
  const expectedApiKey = process.env.API_KEY;
  const providedApiKey = request.headers.get('x-api-key');

  // 1. Rate limit by IP
  try {
    await rateLimiter.consume(ip);
  } catch {
    return new NextResponse(
      JSON.stringify({ error: 'Too many requests. Please try again later.' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // 2. Check API key
  if (!expectedApiKey || providedApiKey !== expectedApiKey) {
    return new NextResponse(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/encrypt',
};

