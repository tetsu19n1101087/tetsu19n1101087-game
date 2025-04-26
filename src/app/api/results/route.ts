import { NextRequest, NextResponse } from 'next/server';
import { Result, connectDatabase } from '@/lib/mongo';
import { getSession } from '@/lib/session';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDatabase();

    const results = await Result.find({ userId: session.userId })
      .sort({ createdAt: -1 })
      .limit(2);

    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    console.error('error: ', error);

    return NextResponse.json(
      { error: 'Failed to fetch results' },
      { status: 400 }
    );
  }
}
