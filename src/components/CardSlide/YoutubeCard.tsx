import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

interface YoutubeCardProps {
  link: string;
  title: string;
  desc: string;
}

const YoutubeCard = ({ link, title, desc }: YoutubeCardProps) => {
  return (
    <Wrapper>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <h2>
          <FontAwesomeIcon icon={faYoutube} />
          {title}
        </h2>
        <p>{desc}</p>
      </a>
    </Wrapper>
  );
};

export default YoutubeCard;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 30px 40px;
  color: ${({ theme }) => theme.cardTextColor};
  cursor: pointer;

  svg {
    padding-right: 8px;
    color: red;
  }

  h2 {
    margin-bottom: 28px;
    font-size: 24px;
    font-weight: 700;
  }

  p {
    white-space: pre-line;
  }
`;
