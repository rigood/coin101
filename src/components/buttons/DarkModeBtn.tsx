import { useRecoilState } from "recoil";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { isDarkAtom } from "../../atoms";
import Button from "./Button";

interface DarkModeBtnProps {
  width?: number;
  fontSize?: number;
}

const DarkModeBtn = ({ width = 48, fontSize = 24 }: DarkModeBtnProps) => {
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);
  const toggleMode = () => setIsDark((prev) => !prev);

  return (
    <Button
      icon={isDark ? faSun : faMoon}
      onClick={toggleMode}
      width={width}
      fontSize={fontSize}
    />
  );
};

export default DarkModeBtn;
