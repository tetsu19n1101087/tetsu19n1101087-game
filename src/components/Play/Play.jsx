import { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../Button";
import axios from "axios";

function Play({ setStatus, handleMiss, setStartTime, setEndTime }) {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [typingList, setTypingList] = useState([""]);

  function handleKeyDown(e) {
    if (e.key === typingList[questionNumber]) {
      setQuestionNumber(questionNumber + 1);
    } else if (["Shift", "Alt", "Meta", "Eisu", "KanjiMode"].includes(e.key)) {
      return;
    } else {
      handleMiss();
    }
  }

  useEffect(() => {
    //const characterList = "0123456789!\"#$%&'()-=^~¥|@`[]{};+:*,<>./\\?".split("");
    //let randomList = [];
    //for (let i = 0; i < 10; i++) {
    //  const randomIndex = Math.floor(Math.random() * characterList.length);
    //  const randomElement = characterList.splice(randomIndex, 1)[0];
    //  randomList.push(randomElement);
    //}
    //setTypingList(randomList);

    async function getRandomList() {
      await axios.get('http://localhost:3000')
        .then((res) => {
          setTypingList(res.data);
        })
        .catch((error) => {
          console.log(error);
          setTypingList(['取得できませんでした'])
        });
    }
    getRandomList();

    setStartTime(new Date());
  }, [setStartTime]);

  useEffect(() => {
    if (questionNumber === typingList.length) {
      setEndTime(new Date());
      setStatus("result");
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div>
      <h3>表示された数字または記号のキーを押してください</h3>
      <Character data-testid="character">{typingList[questionNumber]}</Character>
      <Flex>
        <span>問題数: 10</span>
        <span>正解数: {questionNumber}</span>
        <Button onClick={() => setStatus("top")}>タイトルに戻る</Button>
      </Flex>
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

export default Play;
