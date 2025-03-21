import { NextRequest, NextResponse } from 'next/server';
import { Result, connectDatabase } from '@/lib/mongo';

export async function GET(request: NextRequest) {
  try {
    await connectDatabase();

    const results = await Result.find().sort({ createdAt: -1 }).limit(2);

    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    console.error('error: ', error);

    return NextResponse.json({}, { status: 400 });
  }
}

// export async function POST(request: NextRequest) {
//   const req = await request.json();
//   try {
//     await connectDatabase();

//     await Result.create(req);

//     return new NextResponse('result created');
//   } catch (error) {
//     console.error('error: ', error);

//     return NextResponse.json({}, { status: 400 });
//   }
// }
