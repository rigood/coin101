import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";

const MoveBackBtn = () => {
  const navigate = useNavigate();
  const moveBack = () => navigate(-1);

  return (
    <Wrapper>
      <Button
        icon={faChevronLeft}
        onClick={moveBack}
        width={24}
        fontSize={20}
        transparent
      />
    </Wrapper>
  );
};

export default MoveBackBtn;

const Wrapper = styled.div``;
