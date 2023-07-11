import styled from "styled-components";
import Clock from "../../assets/clock.gif";

const Loader = () => {
  return (
    <Wrapper>
      <Img src={Clock} alt="로딩중" />
    </Wrapper>
  );
};

export default Loader;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Img = styled.img`
  width: 80px;
`;
