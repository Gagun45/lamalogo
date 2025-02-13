import { NextResponse } from "next/server"


export const authConfig = {
    pages: {
        signIn: "/login"
    },
    providers: [],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // console.log('Session user: ', user)
                token.name = user.username
                token.email = user.email
                token.isAdmin = user.isAdmin
                if (user.dbID) {
                    token.dbID = user.dbID
                } else {
                    token.dbID = user.id
                }
            }
            // console.log('Session token: ', token)
            return token
        },
        async session({ session, token }) {
            session.user.name = token.name
            session.user.email = token.email
            session.user.isAdmin = token.isAdmin
            session.dbID = token.dbID
            // session.isClown = token
            // console.log("Session session: ", session)
            return session
        },
        authorized({ auth, request }) {
            // console.log("Session auth: ", auth)
            const user = auth?.user
            // console.log(auth?.user)
            const isOnAdminPanel = request.nextUrl?.pathname.startsWith('/admin')
            const isOnBlogPanel = request.nextUrl?.pathname.startsWith('/blog')
            const isOnLoginPanel = request.nextUrl?.pathname.startsWith('/login')

            // // ONLY ADMIN CAN REACH THE ADMIN DASHBOARD
            if (isOnAdminPanel && !user?.isAdmin) {
                return false
            }

            // // ONLY AUTHENTICATED CAN REACH THE BLOG DASHBOARD
            if (isOnBlogPanel && !user) {
                return false
            }

            // ONLY UNAUTHENTICATED CAN REACH THE LOGIN DASHBOARD
            if (isOnLoginPanel && user) {
                return NextResponse.redirect(new URL('/', request.nextUrl))
            }
            return true
        }
    }
}