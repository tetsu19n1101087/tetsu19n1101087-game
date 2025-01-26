import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  try {
    const res = await axios
      .get('http://localhost:3001/generate')
      .then((res) => {
        return res.data;
      });

    return NextResponse.json({ typingList: res }, { status: 200 });
  } catch (error) {
    console.error('error: ', error);
    return NextResponse.json({}, { status: 400 });
  }
}
