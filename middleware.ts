// Use the Edge-safe auth that doesn't pull in Node-only modules (mongodb/crypto)
export { auth as default } from "@/auth-edge"

export const config = {
  matcher: [    
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)"
  ],
}