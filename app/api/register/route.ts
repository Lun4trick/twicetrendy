import { connectMongoDB } from '@app/lib/mongodb';
import User from '@models/user';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { sendEmail } from '@helpers/mailer';
import { emailType } from '@utils/emailType';

export async function POST(req: Request) {
  try {
    const { 
      firstName, 
      lastName, 
      email, 
      password,
      gdprAszfAccepted,
      marketingEmailAccepted,
     } = await req.json();
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
        firstName,
        lastName,
        email, 
        password: hashedPassword,
        consents: {
          terms: {
            accepted: gdprAszfAccepted,
            updatedAt: Date.now(),
          },
          gdpr: {
            accepted: gdprAszfAccepted,
            updatedAt: Date.now(),
          },
          esentialCookies: {
            accepted: gdprAszfAccepted,
            updatedAt: Date.now(),
          },
          marketingCookies: {
            accepted: marketingEmailAccepted,
            updatedAt: Date.now(),
          },
          marketingEmails: {
            accepted: marketingEmailAccepted,
            updatedAt:  Date.now(),
          },
          analyticsCookies: {
            accepted: marketingEmailAccepted,
            updatedAt: Date.now(),
          },
        },
      });

      const newRegToken = await bcrypt.hash(newUser._id.toString(), 10);

      await User.findByIdAndUpdate(newUser._id, {
        newRegToken: newRegToken,
        newRegTokenExpiration: Date.now() + 300000,
      })
  
      await sendEmail(email, emailType.VERIFY, newUser._id);
      console.log(newUser)
  
      return NextResponse.json(
        {data: `/user/register/success?=${newRegToken}`},
        {status: 200},
      )
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status || 500},
    )
  }
}