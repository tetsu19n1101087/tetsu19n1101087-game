'use client';

import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import axios from 'axios';
import { createResult } from '@/lib/action';

export default function Page() {
  const router = useRouter();

  const [questionNumber, setQuestionNumber] = useState(0);
  const [typingList, setTypingList] = useState(['loading...']);

  const startTime = useRef(Date.now());
  const missTypingNumber = useRef(0);

  const formRef = useRef(null);
  const inputTimeRef = useRef(null);
  const inputMissRef = useRef(null);

  function handleKeyDown(e) {
    if (e.key === typingList[questionNumber]) {
      setQuestionNumber(questionNumber + 1);
    } else if (['Shift', 'Alt', 'Meta', 'Eisu', 'KanjiMode'].includes(e.key)) {
      return;
    } else {
      missTypingNumber.current += 1;
    }
  }

  useEffect(() => {
    async function getRandomList() {
      await axios
        .get('/api/generate')
        .then((res) => {
          setTypingList(res.data.typingList);
        })
        .catch((error) => {
          console.error(error);
          setTypingList(['error']);
        });
    }
    getRandomList();
  }, []);

  useEffect(() => {
    if (questionNumber === typingList.length) {
      // const paramsObj = {
      //   time: ((Date.now() - startTime.current) / 1000).toString(),
      //   miss: missTypingNumber.current.toString(),
      // };
      // const params = new URLSearchParams(paramsObj);
      // router.push(`/result?${params.toString()}`);

      inputTimeRef.current.value = ((Date.now() - startTime.current) / 1000);
      inputMissRef.current.value = missTypingNumber.current;
      formRef.current.requestSubmit();
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <div>
      <h3>表示された数字または記号のキーを押してください</h3>
      <Character data-testid='character'>
        {typingList[questionNumber]}
      </Character>
      <Flex>
        <span>問題数: 10</span>
        <span>正解数: {questionNumber}</span>
        <Button onClick={() => router.push('/')}>タイトルに戻る</Button>
      </Flex>
      <form ref={formRef} action={createResult}>
        <input ref={inputTimeRef} type="hidden" name="time" />
        <input ref={inputMissRef} type="hidden" name="miss" />
      </form>
    </div>
  );
}

const Character = styled.p`
  font-size: 90px;
  margin: 120px;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
