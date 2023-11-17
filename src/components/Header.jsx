import styled from 'styled-components';

function Header() {
  return (
    <Wrapper>
      <Title>NS-TYPING</Title>
    </Wrapper>
  );
}

const Wrapper = styled.div`
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

export default Header;