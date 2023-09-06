import NextAuth, {NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {label: "Username", type: "text", placeholder: "email"},
        password: {label: "Password", type: "password"}
      },

      async authorize(credentials, req) {
        const {email, password, brandId, hash} = credentials as any;

        if (email && password) {
          try {
            const query = await fetch(`${process.env.API_BASE_URL}/users/login`, {
              method: 'POST',
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({email, password})
            });

            const response = await query.json();

            if (query.ok) {
              console.log('response.data = ', response.data);
              if (response?.data?.user && response?.data?.accessToken) return {
                ...response.data.user,
                accessToken: response.data.accessToken,
              }
            }
          } catch (e) {
            console.log(e);
          }
        } else if (brandId && hash) {
          try {
            const query = await fetch(`${process.env.API_BASE_URL}/brands/login`, {
              method: 'POST',
              headers: {
                "Content-Type": "application/json",
                "userid": hash
              },
              body: JSON.stringify({id: brandId})
            });

            const response = await query.json();

            if (response?.data?.user && response?.data?.accessToken) return {
              ...response.data.user,
              accessToken: response.data.accessToken,
            }

          } catch (e) {
            console.log(e);
          }
        }

        return null
      }
    })
  ],

  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },

    async session({session, token}) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session
    }
  },

  session: {
    strategy: 'jwt'
  },

  pages: {
    signIn: "/login"
  }
}
export default NextAuth(authOptions)
