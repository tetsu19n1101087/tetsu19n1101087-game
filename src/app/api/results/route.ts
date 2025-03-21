import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { Result, connectDatabase } from '@/lib/mongo';

// export async function GET(request: NextRequest) {
//   try {
//     const res = await fetch(`${API_DOMAIN}/results`, {
//       cache: 'force-cache',
//       next: { tags: ['results'] },
//     }).then((res) => {
//       return res.json();
//     });

//     return NextResponse.json({ results: res }, { status: 200 });
//   } catch (error) {
//     console.error('error: ', error);
//     return NextResponse.json({}, { status: 400 });
//   }
// }

export async function GET(request: NextRequest) {
  try {
    if (mongoose.connection.readyState === 0) {
      await connectDatabase();
    }

    const results = await Result.find().sort({ createdAt: -1 }).limit(2);

    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    console.error('error: ', error);
    return NextResponse.json({}, { status: 400 });
  }
}
