import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const characterList = '0123456789!"#$%&\'()-=^~¥|@`[]{};+:*,<>./\\?'.split(
    ''
  );
  let typingList = [];
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characterList.length);
    const randomElement = characterList.splice(randomIndex, 1)[0];
    typingList.push(randomElement);
  }

  return NextResponse.json({ typingList }, { status: 200 });
}
