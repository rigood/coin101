import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

const CardSlideContainer = styled.div`
  overflow: hidden;
  margin-bottom: 24px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.cardBgColor};
`;

const CardSlideAnimation = keyframes`
0%{
  transform: translateX(0%);
}
23%, 33%{
  transform: translateX(-25%);
};
53%, 66%{
  transform: translateX(-50%);
};
90%, 100%{
  transform: translateX(-75%);
};
`;

const CardContainer = styled.div`
  display: flex;
  width: 400%;
  animation: ${CardSlideAnimation} 12s ease-in-out infinite;
`;

const Card = styled.div`
  width: 100%;
  padding: 50px 40px;
  color: #04091a;
  cursor: pointer;
  svg {
    padding-right: 8px;
    color: red;
  }
  h2 {
    margin-bottom: 28px;
    font-size: 24px;
    font-weight: bold;
  }
  p {
    white-space: pre-line;
  }
`;

function CardSlide() {
  return (
    <CardSlideContainer>
      <CardContainer>
        <Card>
          <a href="https://youtu.be/Gc2en3nHxA4" target="_blank" rel="noopener noreferrer">
            <h2>
              <FontAwesomeIcon icon={faYoutube} />
              What is Bitcoin?
            </h2>
            <p>The most watched {"\n"} Bitcoin introduction video ever</p>
          </a>
        </Card>
        <Card>
          <a href="https://youtu.be/TDGq4aeevgY" target="_blank" rel="noopener noreferrer">
            <h2>
              <FontAwesomeIcon icon={faYoutube} />
              What is Ethereum?
            </h2>
            <p>3 minute explanation of Ethereum {"\n"} by inventor Vitalik Buterin</p>
          </a>
        </Card>
        <Card>
          <a href="https://youtu.be/Yj7ja6BANLM" target="_blank" rel="noopener noreferrer">
            <h2>
              <FontAwesomeIcon icon={faYoutube} />
              What is Dogecoin?
            </h2>
            <p>The history and origin {"\n"} of the dog meme explained</p>
          </a>
        </Card>
        <Card>
          <a href="https://youtu.be/jGjmOjD_F-o" target="_blank" rel="noopener noreferrer">
            <h2>
              <FontAwesomeIcon icon={faYoutube} />
              What is the Shiba Inu?
            </h2>
            <p>SHIB Explained with Animations {"\n"} Meme or Something More?</p>
          </a>
        </Card>
      </CardContainer>
    </CardSlideContainer>
  );
}

export default CardSlide;
