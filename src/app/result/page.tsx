'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import axios from 'axios';

type Result = {
  time?: number;
  correctTypingNumber?: number;
  average?: number;
  missTypingNumber?: number;
  accuracy?: number;
};

export default function Page() {
  const router = useRouter();

  const [results, setResults] = useState<Result[]>([{}, {}]);

  useEffect(() => {
    async function getResult() {
      await axios
        .get('/api/results')
        .then((res) => {
          setResults(res.data.results);
        })
        .catch((error) => {
          setResults([]);
          console.log(error);
        });
    }
    getResult();
  }, []);

  return (
    <div>
      <Title>結果</Title>
      <Table>
        <tbody>
          <tr>
            <TableHeader>経過時間</TableHeader>
            <TableData>{results[0] ? results[0].time : '-'}</TableData>
            <TableData>({results[1] ? results[1].time : '-'})</TableData>
          </tr>
          <tr>
            <TableHeader>正しく打ったキーの数</TableHeader>
            <TableData>
              {results[0] ? results[0].correctTypingNumber : '-'}
            </TableData>
            <TableData>
              ({results[1] ? results[1].correctTypingNumber : '-'})
            </TableData>
          </tr>
          <tr>
            <TableHeader>平均キータイプ数</TableHeader>
            <TableData>{results[0] ? results[0].average : '-'} 回/秒</TableData>
            <TableData>
              ({results[1] ? results[1].average : '-'} 回/秒)
            </TableData>
          </tr>
          <tr>
            <TableHeader>ミスタイプ数</TableHeader>
            <TableData>
              {results[0] ? results[0].missTypingNumber : '-'}
            </TableData>
            <TableData>
              ({results[1] ? results[1].missTypingNumber : '-'})
            </TableData>
          </tr>
          <tr>
            <TableHeader>正確率</TableHeader>
            <TableData>{results[0] ? results[0].accuracy : '-'} %</TableData>
            <TableData>({results[1] ? results[1].accuracy : '-'} %)</TableData>
          </tr>
        </tbody>
      </Table>
      <Button onClick={() => router.push('/')}>タイトルに戻る</Button>
    </div>
  );
}

const Title = styled.h1`
  font-size: 50px;
`;

const Table = styled.table`
  font-size: 20px;
  margin: 50px auto;
`;

const TableHeader = styled.th`
  text-align: start;
`;

const TableData = styled.td`
  text-align: end;
  color: #0fd994;
  width: 120px;
`;
