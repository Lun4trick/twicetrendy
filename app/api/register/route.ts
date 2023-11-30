import { connectMongoDB } from '@app/lib/mongodb';
import User from '@models/user';
import { v4 } from 'uuid';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    const uuid = v4();
    await connectMongoDB();
    await User.create({
      id: uuid, 
      email, 
      password: hashedPassword,
      city: '',
      zipCode: '',
      addressLine1: '',
      mobileNumber: '',
    });

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