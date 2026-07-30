import { NextAuthOptions, getServerSession } from "next-auth";
import GithubProvider from "next-auth/providers/github";

const ALLOWED_ADMIN_USERNAME = (process.env.ADMIN_GITHUB_USERNAME || "mithun-mp").toLowerCase();

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "MOCK_CLIENT_ID",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "MOCK_CLIENT_SECRET",
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          username: profile.login,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      if (!profile) return false;
      const ghUsername = (profile as { login?: string }).login?.toLowerCase();
      // Enforce strict GitHub username allowlist
      return ghUsername === ALLOWED_ADMIN_USERNAME;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { username?: string }).username = token.username as string;
      }
      return session;
    },
    async jwt({ token, profile }) {
      if (profile) {
        token.username = (profile as { login?: string }).login;
      }
      return token;
    },
  },
  pages: {
    signIn: "/api/auth/signin",
    error: "/studio?error=AccessDenied",
  },
  secret: process.env.NEXTAUTH_SECRET || "mithun-portfolio-super-secret-key-2026",
};

export async function getAdminSession() {
  return await getServerSession(authOptions);
}

export async function checkIsAdmin(): Promise<boolean> {
  const session = await getAdminSession();
  if (!session || !session.user) return false;
  const username = (session.user as { username?: string }).username?.toLowerCase();
  return username === ALLOWED_ADMIN_USERNAME;
}
