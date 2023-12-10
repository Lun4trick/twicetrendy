import { connectMongoDB } from '@app/lib/mongodb';
import User from '@models/user';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { sendEmail } from '@helpers/mailer';
import { emailType } from '@utils/emailType';
import { redirect } from 'next/navigation';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    const isUserExist = await User.findOne({email});

    if(isUserExist) {
      return NextResponse.json(
        {message: 'User already exist'}, 
        {status: 409},
        )
    } else {
      const newUser = await User.create({
        email, 
        password: hashedPassword,
      });
  
      await sendEmail(email, emailType.VERIFY, newUser._id);
  
      return NextResponse.json(
        {message: 'User registered'}, 
        {status: 201},
        )
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status || 500},
    )
  }
}