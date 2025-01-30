import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  try {
    // const res = await axios
    //   .get('http://localhost:3001/results')
    //   .then((res) => {
    //     return res.data;
    //   });

    const res = await fetch('http://localhost:3001/results', {
      cache: 'force-cache',
      next: { tags: ['results'] },
    }).then((res) => {
      return res.json();
    });

    return NextResponse.json({ results: res }, { status: 200 });
  } catch (error) {
    console.error('error: ', error);
    return NextResponse.json({}, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  const req = await request.json();
  try {
    const res = await axios
      .post('http://localhost:3001/results', req)
      .then((res) => {
        return res.data;
      });

    return Response.json({ message: res });
  } catch (error) {
    console.error('error: ', error);
    return NextResponse.json({}, { status: 400 });
  }
}
