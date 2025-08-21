import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if maintenance mode is enabled
  const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';
  
  if (isMaintenanceMode) {
    // Maintenance mode: redirect all traffic to maintenance page
    if (request.nextUrl.pathname === '/maintenance') {
      return NextResponse.next();
    }
    
    // Redirect all other traffic to maintenance page
    return NextResponse.redirect(new URL('/maintenance', request.url));
  } else {
    // Production mode: prevent access to maintenance page
    if (request.nextUrl.pathname === '/maintenance') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    
    // Allow normal traffic
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - img (image files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|img).*)',
  ],
};
