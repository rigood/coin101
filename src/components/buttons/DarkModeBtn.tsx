import { useRecoilState } from "recoil";
import styled from "styled-components";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { isDarkAtom } from "../../atoms";
import Button from "./Button";

const DarkModeBtn = () => {
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);
  const toggleMode = () => setIsDark((prev) => !prev);

  return (
    <Wrapper>
      <Button icon={isDark ? faSun : faMoon} onClick={toggleMode} />
    </Wrapper>
  );
};

export default DarkModeBtn;

const Wrapper = styled.div`
  position: fixed;
  top: 30px;
  right: 30px;
`;
