import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import {compare} from 'bcrypt';
import User from '@models/user';
import { NextResponse } from 'next/server';
import { connectMongoDB } from '@app/lib/mongodb';

const handler = NextAuth({
  session: {
    strategy: 'jwt',
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
            console.log(user.email);
            return {
              email: user.email
            } as any;
          } else {
            throw new Error( JSON.stringify({ message: 'Hibás jelszó!', status: 401 }))
          }
        } else { 
          throw new Error( JSON.stringify({ message: 'Nincs ilyen felhasználó!', status: 409 }))
        }
      }
    })
  ]
});

export { handler as POST, handler as GET};