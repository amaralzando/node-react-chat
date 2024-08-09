import { SIDENAV_ITEMS } from "@/src/menu_constants";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // Make middleware async
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get("gasachat.token")?.value;

  // Extract protected paths from SIDENAV_ITEMS
  const protectedPaths = SIDENAV_ITEMS.flatMap((group) =>
    group.menuList.flatMap((item) =>
      item.protected
        ? item.path
        : (item.subMenuItems || [])
            .filter((subItem) => subItem.protected)
            .map((subItem) => subItem.path)
    )
  );

  // Check if the current route is protected
  const isProtectedRoute = protectedPaths.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    try {
      if (!tokenCookie) {
        // Redirect if token is not valid
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (error) {
      // Handle token validation errors (e.g., token not found)
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Continue to the requested route if not protected or user is authenticated
  return NextResponse.next();
}
