import NextAuth, { DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    firstName?: string;
    lastName?: string;
    phone?: string;
    countryCode?: string;
    gender?: string;
    isEmailVerified?: boolean;
    token?: string;
    role?: string;
  }

  interface Session {
    user: {
      id?: string;
      name?: string;
      firstName?: string;
      lastName?: string;
      countryCode?: string;
      phone?: string;
      email: ?string;
      token?: string;
      role?: string;
      isEmailVerified?:boolean
      image?:string;
    };
  }
}
