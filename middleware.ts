import {withAuth, NextRequestWithAuth} from "next-auth/middleware";
import {NextResponse} from 'next/server'

export default withAuth(
  (request: NextRequestWithAuth) => {
    if (request.nextUrl.pathname.startsWith("/admin") && request.nextauth.token?.role !== 'admin') {
      return NextResponse.redirect(process.env.HOST + ':' + process.env.PORT + '/login')
      // return NextResponse.rewrite(new URL('/denied', request.url))
    }
  },
  {
    callbacks: {
      authorized: ({token}) => !!token
    }
  }
)

export const config = {matcher: ["/admin"]}
