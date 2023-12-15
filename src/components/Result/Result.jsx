import styled from "styled-components";
import Button from "../Button";

function Result(props) {
  return (
    <div>
      <Title>結果</Title>
      <Table>
        <tbody>
          <tr>
            <TableHeader>経過時間</TableHeader>
            <TableData>{props.time}</TableData>
          </tr>
          <tr>
            <TableHeader>正しく打ったキーの数</TableHeader>
            <TableData>10</TableData>
          </tr>
          <tr>
            <TableHeader>平均キータイプ数</TableHeader>
            <TableData>
              {((10 + props.missTypingNumber) / props.time).toFixed(1)} 回/秒
            </TableData>
          </tr>
          <tr>
            <TableHeader>ミスタイプ数</TableHeader>
            <TableData>{props.missTypingNumber}</TableData>
          </tr>
          <tr>
            <TableHeader>正確率</TableHeader>
            <TableData>
              {((10 / (10 + props.missTypingNumber)) * 100).toFixed(2)} %
            </TableData>
          </tr>
        </tbody>
      </Table>
      <Button onClick={() => props.setStatus("top")}>タイトルに戻る</Button>
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
  width: 150px;
`;

export default Result;
