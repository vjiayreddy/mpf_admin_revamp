import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { userLogin } from "src/apollo/hooks/useLogin";
import { APP_ROUTES } from "src/configs/routes";
import jwt_decode from "jwt-decode";
import { updateSession, updateToken } from "src/helpers";

const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    //maxAge: 30 * 24 * 60 * 60, // 30 days
    maxAge: 4 * 60 * 60, // 4 hours
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      authorize: async (credentials: any, _req) => {
        const response = await userLogin({
          source: credentials?.source,
          password: credentials.password,
        });
       
        if (response?.data && !response?.error) {
          const tokenData: any = jwt_decode(
            response?.data?.login?.token as string
          );
          return {
            id: tokenData?._id,
            firstName: tokenData?.firstName,
            lastName: tokenData?.lastName,
            name: tokenData?.fullName,
            role: tokenData?.role?.[0],
            countryCode: tokenData?.countryCode,
            phone: tokenData?.phone,
            email: tokenData?.email,
            isEmailVerified: tokenData?.isEmailVerified,
          };
        } else {
          throw new Error(response?.error?.message);
        }
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (user) {
        token = updateToken(token, user);
      }
      if (trigger === "update") {
        if (session) {
          token = updateToken(token, session?.user);
        }
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session = updateSession(session, token);
      }
      return session;
    },
  },
  pages: {
    signIn: APP_ROUTES.LOGIN,
  },
};

export default NextAuth(authOptions);
