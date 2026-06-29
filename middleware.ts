import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Custom logic can be added here if needed
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/login',
      error: '/login',
    },
  }
);

export const config = { 
  matcher: ["/dashboard/:path*", "/api/schedule/:path*"] 
};