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
        console.log(credentials);

        const {email, password} = credentials as any;

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
              name: `${response.data.user.firstName} ${response.data.user.lastName}`,
              accessToken: response.data.accessToken,
            }
          }
        } catch (e) {
          console.log(e);
        }
        return null
      }
    })
  ],

  // callbacks: {
  //   async session({session, token, user}) {
  //
  //     console.log(session, token, user);
  //
  //     session.user = token
  //     return session
  //   }
  // },

  session: {
    strategy: 'jwt'
  },

  pages: {
    signIn: "/login"
  }
}
export default NextAuth(authOptions)
