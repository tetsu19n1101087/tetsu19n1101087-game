import { NextRequest, NextResponse } from 'next/server';
import { API_DOMAIN } from '@/config';

export async function GET(request: NextRequest) {
  try {
    const res = await fetch(`${API_DOMAIN}/generate`).then((res) => {
      return res.json();
    });

    return NextResponse.json({ typingList: res }, { status: 200 });
  } catch (error) {
    console.error('error: ', error);
    return NextResponse.json({}, { status: 400 });
  }
}
