import "next-auth";

types/next-auth.d.ts
import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      firstName: string,
      lastName: string,
      verified: boolean,
      email: string,
      phone: number,
    }
  }
}