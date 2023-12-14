import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import {compare} from 'bcrypt';
import User from '@models/user';
import { connectMongoDB } from '@app/lib/mongodb';

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },

  callbacks:{
    async jwt({token, user}: {token: any, user: any}) {
      if(user) {
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.phone = user.phone;
        token.email = user.email;
        token.verified = user.verified;
      }

      return token;
    },
    
    async session({ session, token}) {
      session.user = {
        firstName: token.firstName as string,
        lastName: token.lastName as string,
        phone: token.phone as number,
        email: token.email as string,
        verified: token.verified as boolean,
      }
      
      return session
    }
  },

  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials) {
        await connectMongoDB();
        const user = await User.findOne({email: credentials?.email});
        if(user) {
          const isPasswordCorrect = await compare(credentials?.password || '', user.password);

          if(isPasswordCorrect) {
            return user as any;
          } else {
            throw new Error( JSON.stringify({ message: 'Hibás jelszó!', status: 401 }))
          }
        } else { 
          throw new Error( JSON.stringify({ message: 'Nincs ilyen felhasználó!', status: 409 }))
        }
      }
    })
  ],
});

export { handler as POST, handler as GET};