import styled from "styled-components";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";

const MoveToTopBtn = () => {
  const moveToTop = () => {
    document.documentElement.scrollTop = 0;
  };

  return (
    <Wrapper>
      <Button icon={faChevronUp} onClick={moveToTop} />
    </Wrapper>
  );
};

export default MoveToTopBtn;

const Wrapper = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
`;
