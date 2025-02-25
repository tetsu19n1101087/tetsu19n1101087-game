'use client';

import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';

export default function Page() {
  const router = useRouter();

  return (
    <div>
      <Title>NS-TYPING</Title>
      <p>数字・記号専用のタイピング練習ゲーム</p>
      <Button onClick={() => router.push('/game')}>プレイする</Button>
    </div>
  );
}

const Title = styled.h1`
  font-size: 40px;
  font-family: impact, sans-serif;
`;
