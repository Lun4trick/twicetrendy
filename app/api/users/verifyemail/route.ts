import { connectMongoDB } from '@app/lib/mongodb';
import User from '@models/user';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { token } = reqBody;
    await connectMongoDB();

   const user = await User.findOne(
      { 
        verifyToken: token, 
        verifyTokenExpiration: {$gt: Date.now()} 
      }
    )

    if (!user) {
      return NextResponse.json(
        {message: 'Token expired'}, 
        {status: 401},
        )
    }

    console.log(user)

    user.verified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiration = undefined;
    await user.save();

    return NextResponse.json(
      {message: 'Email verified'}, 
      {status: 201},
    );
  } catch (error) {
    return NextResponse.json(
      {message: 'error while verifying email'},
      { status: 500},
    )
  }
  }