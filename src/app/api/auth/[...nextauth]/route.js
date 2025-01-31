import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        },
      },
    }),
  ],
  session: {
    strategy: 'jwt',  // Explicitly set JWT strategy
    maxAge: 60 * 60,  // 1 hour
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Add user info to token
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          userId: user.id,
          email: user.email,
          name: user.name
        };
      }
      return token;
    },
    async session({ session, token }) {
      // Add token info to session
      session.user.accessToken = token.accessToken;
      session.user.id = token.userId;
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account.provider === 'google') {
        return true;
      }
      return false;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax', 
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      },
    },
  },
};

// Update to use new Next.js 13+ API route handlers
export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };