'use client';

import { useActionState } from 'react';
import styled from 'styled-components';
import { loginUser } from '@/lib/action';
import Button from '@/components/Button';

export default function LoginPage() {
  const [errorMessage, formAction, isPending] = useActionState(
    loginUser,
    undefined
  );

  return (
    <Container>
      <Title>ログイン / 新規登録</Title>
      <p>ユーザー名を入力してください</p>

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

      <Form action={formAction}>
        <Input
          type='text'
          name='username'
          placeholder='ユーザー名'
          minLength={3}
          maxLength={20}
          required
        />
        <Button type='submit' aria-disabled={isPending}>
          続ける
        </Button>
      </Form>
      <Note>※ユーザー名が新規の場合は自動的に登録されます</Note>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Title = styled.h1`
  font-size: 30px;
  margin-bottom: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 300px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #444;
  background-color: #222;
  color: white;
  border-radius: 4px;
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 14px;
  margin-top: -10px;
`;

const Note = styled.p`
  font-size: 12px;
  color: #aaa;
  margin-top: 10px;
`;
