import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { supabaseAdmin } from "@/lib/supabase";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user, account }) {
      // 1. Identify the Admin ID
      const imperialId = user.id;

      console.log("👑 Attempting to anchor user with Master Key:", imperialId);

      if (!imperialId || !supabaseAdmin) {
        console.error("❌ Oracle Error: Missing ID or Admin Client.");
        return false;
      }

      // 2. CHANGE 'supabase' TO 'supabaseAdmin' HERE
      const { error } = await supabaseAdmin
        .from('profiles')
        .upsert({
          id: imperialId,
          full_name: user.name,
          avatar_url: user.image,
          updated_at: new Date()
        });

      if (error) {
        console.error("❌ Supabase Sync Error:", error.message);
        return false;
      }

      console.log("✅ Admin Profile Anchored.");
      return true;
    },
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
});