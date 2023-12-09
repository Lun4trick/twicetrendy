import { connectMongoDB } from '@app/lib/mongodb';
import User from '@models/user';
import { v4 } from 'uuid';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { sendEmail } from '@helpers/mailer';
import { emailType } from '@utils/emailType';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    const uuid = v4();
    await connectMongoDB();
    const newUser = await User.create({
      email, 
      password: hashedPassword,
    });

    await sendEmail(email, emailType.VERIFY, newUser._id);

    return NextResponse.json(
      {message: 'User registered'}, 
      {status: 201},
      )
  } catch (error) {
    return NextResponse.json(
      {message: 'error while registering user'},
      { status: 500},
    )
  }
}