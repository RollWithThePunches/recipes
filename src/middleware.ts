import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Basic auth for staging environment
export function middleware(request: NextRequest) {
  // Only apply auth protection in production/staging
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next()
  }

  // Allow access to auth-related pages and API routes
  const authPaths = ['/login', '/create-account', '/reset-password', '/api/auth']
  const isAuthPath = authPaths.some(path => request.nextUrl.pathname.startsWith(path))
  
  if (isAuthPath) {
    return NextResponse.next()
  }

  // Check for basic auth header
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader) {
    // Return 401 with WWW-Authenticate header to prompt for credentials
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Staging Access"',
      },
    })
  }

  // Basic auth format: "Basic base64(username:password)"
  const encodedCredentials = authHeader.split(' ')[1]
  if (!encodedCredentials) {
    return new NextResponse('Invalid authentication', { status: 401 })
  }

  try {
    const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString()
    const [username, password] = decodedCredentials.split(':')
    
    // For staging, use a simple hardcoded credential
    // In production, you'd want to use environment variables
    const validUsername = process.env.STAGING_USERNAME || 'admin'
    const validPassword = process.env.STAGING_PASSWORD || 'staging123'
    
    if (username === validUsername && password === validPassword) {
      return NextResponse.next()
    }
  } catch (error) {
    console.error('Auth error:', error)
  }

  return new NextResponse('Invalid credentials', { status: 401 })
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
} 