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
        newRegToken: token,
      }
    )

    if (!user) {
      return NextResponse.json(
        {message: 'Token expired'}, 
        {status: 401},
        )
    }

    console.log(user)

    setTimeout(async () => {
      user.newRegToken = undefined;
      user.newRegTokenExpiration = undefined;
      await user.save();
    }, 30000)
    return NextResponse.json(
      {message: 'Reg completed'}, 
      {status: 201},
    );
  } catch (error) {
    return NextResponse.json(
      {message: 'Something went wrong'},
      { status: 500},
    )
  }
  }