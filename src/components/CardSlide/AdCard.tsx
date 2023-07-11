import styled from "styled-components";
import Coin101Logo from "../../assets/logo.png";

const AdCard = () => {
  return (
    <Wrapper>
      <Img src={Coin101Logo} alt="" />
      <Text>
        101 coins waiting for you <br /> Pick your coin!
      </Text>
    </Wrapper>
  );
};

export default AdCard;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 30px 40px;
  color: ${({ theme }) => theme.cardTextColor};
  cursor: pointer;
`;

const Img = styled.img`
  width: 100px;
  margin: 0 auto 20px;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.themeColor};
  text-align: center;
  line-height: 1.2;
`;
