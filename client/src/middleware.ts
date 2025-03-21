import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService";

type Role = keyof typeof roleBasedPrivateRoutes

const authRoutes = ['/login', '/register']

const roleBasedPrivateRoutes = {
    admin: [/^\/admin(\/.*)?$/, /^\/checkOut$/, /^\/My-orders$/, /^\/profile$/],
    customer: [/^\/checkOut$/, /^\/My-orders$/, /^\/profile$/],
}

export const middleware = async (request: NextRequest) => {
    const { pathname } = request.nextUrl
    const userInfo = await getCurrentUser()

    if (!userInfo) {
        if (authRoutes.includes(pathname)) {
            return NextResponse.next()
        } else {
            return NextResponse.redirect(new URL(`/login?redirectPath=${pathname}`, request.url))
        }
    }

    if (userInfo?.role === "customer" && /^\/admin(\/.*)?$/.test(pathname)) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as Role]) {
        const routes = roleBasedPrivateRoutes[userInfo?.role as Role]
        if (routes.some(route => pathname.match(route))) {
            return NextResponse.next()
        }
    }

    return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
    matcher: [
        '/login',
        '/register',
        '/checkOut',
        '/profile',
        '/My-orders',
        '/admin',
        "/admin/:path*",
    ]
}