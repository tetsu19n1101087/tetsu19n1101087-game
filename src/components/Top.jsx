import styled from 'styled-components';
import Button from './Button';

function Top(props) {
  return (
    <div>
      <Title>NS-TYPING</Title>
      <p>数字・記号専用のタイピング練習ゲーム</p>
      <Button onClick={() => props.setStatus('play')}>プレイする</Button>
    </div>
  );
}

const Title = styled.h1`
  font-size: 40px;
  font-family: impact, sans-serif;
`;

export default Top;