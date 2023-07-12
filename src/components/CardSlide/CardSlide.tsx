import styled, { keyframes } from "styled-components";
import YoutubeCard from "./YoutubeCard";
import AdCard from "./AdCard";

function CardSlide() {
  return (
    <CardSlideContainer>
      <CardContainer>
        <YoutubeCard
          link="https://youtu.be/Gc2en3nHxA4"
          title="What is Bitcoin?"
          desc="The most watched Bitcoin introduction video ever"
        />
        <YoutubeCard
          link="https://youtu.be/TDGq4aeevgY"
          title="What is Ethereum?"
          desc="3 minute explanation of Ethereum by inventor Vitalik
          Buterin"
        />
        <AdCard />
        <YoutubeCard
          link="https://youtu.be/Yj7ja6BANLM"
          title="What is Dogecoin?"
          desc="The history and origin of the dog meme explained"
        />
        <YoutubeCard
          link="https://youtu.be/jGjmOjD_F-o"
          title="What is the Shiba Inu?"
          desc="SHIB Explained with Animations Meme or Something More?"
        />
      </CardContainer>
    </CardSlideContainer>
  );
}

export default CardSlide;

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
 15%, 25%{
  transform: translateX(-20%);
};
40%, 50%{
  transform: translateX(-40%);
};
65%, 75%{
  transform: translateX(-60%);
};
90%, 100%{
  transform: translateX(-80%);
}; 
`;

const CardContainer = styled.div`
  display: flex;
  width: 500%;
  animation: ${CardSlideAnimation} 16s ease-in-out infinite;
`;
