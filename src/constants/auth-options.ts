import { refreshAccessToken, signIn } from '@/domains/auth';
import { AxiosError } from 'axios';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AuthOptions, Credentials, Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: Credentials | undefined): Promise<User | null> {
        try {
          if (!credentials) {
            return null;
          }

          const signInResponse = await signIn(credentials);

          return {
            ...signInResponse.tokens,
            ...signInResponse.user,
          };
        } catch (err) {
          if (err instanceof AxiosError) {
            console.error(err.response?.status, err.response?.data?.message);
          }
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }): Promise<JWT> {
      try {
        if (token?.accessToken) {
          const decodedToken = jwt.decode(token.accessToken) as JwtPayload;

          if (decodedToken?.exp) {
            token.accessTokenExpires = decodedToken.exp * 1000;
          }
        }

        if (user) {
          return {
            ...user,
            ...token,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
          };
        }

        if (token.accessTokenExpires && Date.now() <= token.accessTokenExpires) {
          return token;
        }

        return refreshAccessToken(token);
      } catch (error) {
        console.error('Error decoding JWT:', error);
        throw new Error('Error decoding JWT');
      }
    },
    async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
      if (token) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.id = token.id;
        session.email = token.email;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth',
  },
};
