import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

export enum authState {
  loading = "loading",
  authenticated = "authenticated",
  unauthenticated = "unauthenticated",
}

export const updateSession = (session: Session, token: JWT) => {
  if (token) {
    session.user.id = token?.id as string;
    session.user.name = token?.firstName + " " + token?.lastName;
    session.user.firstName = token?.firstName as string;
    session.user.lastName = token?.lastName as string;
    session.user.email = token?.email as string;
    session.user.phone = token?.phone as string;
    session.user.countryCode = token?.countryCode as string;
    session.user.isEmailVerified = token?.isEmailVerified as boolean;
    session.user.role = token?.role as string;
    session.user.image = token?.image as string;
  }
  return session;
};

export const updateToken = (token: JWT, user: User) => {
  if (token) {
    token.id = user.id;
    token.image = user?.image;
    token.name = user?.firstName + " " + user?.lastName;
    token.email = user?.email;
    token.phone = user?.phone;
    token.firstName = user?.firstName;
    token.lastName = user?.lastName;
    token.isEmailVerified = user?.isEmailVerified;
    token.role = user?.role;
    token.countryCode = user?.countryCode;
  }
  return token;
};
