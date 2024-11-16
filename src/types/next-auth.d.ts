import { CustomUser } from '@/domains/auth';
import 'next-auth';
import { DefaultUser } from 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Credentials {
    email: string;
    password: string;
  }

  interface Session {
    id: string;
    email: string | null | undefined;
    accessToken: string;
    refreshToken: string;
  }

  interface User {
    id: string;
    email: string | null | undefined;
    accessToken: string;
    refreshToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
  }
}
