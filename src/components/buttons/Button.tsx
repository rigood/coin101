import styled from "styled-components";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ButtonProps {
  icon: IconProp;
  onClick: () => void;
  width?: number;
  fontSize?: number;
  transparent?: boolean;
}

const Button = ({
  icon,
  onClick,
  width = 48,
  fontSize = 24,
  transparent = false,
}: ButtonProps) => {
  return (
    <Wrapper
      onClick={onClick}
      width={width}
      fontSize={fontSize}
      transparent={transparent}
    >
      <FontAwesomeIcon icon={icon} />
    </Wrapper>
  );
};

export default Button;

export const Wrapper = styled.button<{
  width?: number;
  fontSize?: number;
  transparent?: boolean;
}>`
  width: ${(props) => props.width + "px"};
  height: ${(props) => props.width + "px"};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.transparent ? "transparent" : props.theme.btnBgColor};
  border-radius: 50%;
  color: ${(props) => props.theme.textColor};
  font-size: ${(props) => props.fontSize + "px"};
  cursor: pointer;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
