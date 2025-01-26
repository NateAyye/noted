// import withAuth from 'next-auth/middleware';


// export default withAuth(
//   // `withAuth` augments your `Request` with the user's token.
//   function middleware(req) {
//     console.log(req.nextauth.token)
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => token?.role === "admin",
//     },
//   },
// )

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - auth
//      * - aboutpage
//      * - favicon.ico (favicon file)
//      * - robots.txt
//      * - images
//      * - login
//      * - homepage (represented with $ after beginning /)
//      */
//     '/((?!api|_next/static|_next/image|auth|favicon.ico|robots.txt|images|login|about|$).*)',
//   ],
// };

function middleware() {
  // console.log(req.nextUrl.href);
}

export default middleware;
