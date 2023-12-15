import { useState } from "react";
import styled from "styled-components";
import Top from "./Top";
import Play from "./Play";
import Result from "./Result";

function App() {
  const [status, setStatus] = useState("top");
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [missTypingNumber, setMissTypingNumber] = useState(0);

  function handleMiss() {
    setMissTypingNumber(missTypingNumber + 1);
  }

  let contents;

  switch (status) {
    case "top":
      contents = <Top setStatus={setStatus} />;
      break;
    case "play":
      contents = (
        <Play
          setStatus={setStatus}
          handleMiss={handleMiss}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
        />
      );
      break;
    case "result":
      contents = (
        <Result
          setStatus={setStatus}
          time={((endTime - startTime) / 1000).toFixed(2)}
          missTypingNumber={missTypingNumber}
        />
      );
      break;
    default:
      return;
  }

  return (
    <Wrapper>
      <Header>
        <Title>NS-TYPING</Title>
      </Header>
      <Game>{contents}</Game>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  background-image: repeating-linear-gradient(
    white,
    white 5px,
    #dadada 5px,
    #dadada 10px
  );
`;

const Header = styled.div`
  width: 100%;
  height: 80px;
  text-align: center;
  background-color: rgb(0, 122, 204);
  line-height: 80px;
`;

const Title = styled.span`
  font-size: 50px;
  color: white;
  text-shadow: 1px 2px black;
  font-family: impact, sans-serif;
  transform: scale(2, 1);
  display: inline-block;
`;

const Game = styled.div`
  width: 700px;
  height: 500px;
  margin: 50px auto 0px;
  padding: 30px;
  box-sizing: border-box;
  background-color: rgb(30, 30, 30);
  border: 8px solid rgb(22, 130, 93);
  box-shadow: 5px 5px 3px black;
  text-align: center;
  color: white;
  font-weight: bold;
`;

export default App;
