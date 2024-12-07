import { useState, useEffect } from "react";
import styled from 'styled-components';
import Button from '../Button';
import axios from 'axios';

function Result({setStatus, time, missTypingNumber}) {
  const [lastResult, setLastResult] = useState({});

  const correctTypingNumber = 10;
  const average = ((10 + missTypingNumber) / time);
  const accuracy = ((10 / (10 + missTypingNumber)) * 100);

  useEffect(() => {
    async function getResult() {
      await axios
        .get('http://api.tetsu19n1101087-game.local/results')
        .then((res) => {
          setLastResult(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
      
      await axios.post('http://api.tetsu19n1101087-game.local/results', {
        time,
        correctTypingNumber,
        average,
        missTypingNumber,
        accuracy,
      }).then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }
    getResult();
  },[time, missTypingNumber, accuracy, average]);

  return (
    <div>
      <Title>結果</Title>
      <Table>
        <tbody>
          <tr>
            <TableHeader>経過時間</TableHeader>
            <TableData>{time.toFixed(2)}</TableData>
            <TableData>({typeof lastResult.time === 'number' ? lastResult.time.toFixed(2) : '-'})</TableData>
          </tr>
          <tr>
            <TableHeader>正しく打ったキーの数</TableHeader>
            <TableData>{correctTypingNumber}</TableData>
            <TableData>({lastResult.correctTypingNumber || '-'})</TableData>
          </tr>
          <tr>
            <TableHeader>平均キータイプ数</TableHeader>
            <TableData>
              {average.toFixed(1)} 回/秒
            </TableData>
            <TableData>
              ({typeof lastResult.average === 'number' ? lastResult.average.toFixed(1) : '-'} 回/秒)
            </TableData>
          </tr>
          <tr>
            <TableHeader>ミスタイプ数</TableHeader>
            <TableData>{missTypingNumber}</TableData>
            <TableData>({typeof lastResult.missTypingNumber === 'number' ? lastResult.missTypingNumber : '-'})</TableData>
          </tr>
          <tr>
            <TableHeader>正確率</TableHeader>
            <TableData>
              {accuracy.toFixed(2)} %
            </TableData>
            <TableData>
              ({typeof lastResult.accuracy === 'number' ? lastResult.accuracy.toFixed(2) : '-'} %)
            </TableData>
          </tr>
        </tbody>
      </Table>
      <Button onClick={() => setStatus('top')}>タイトルに戻る</Button>
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

export default Result;
