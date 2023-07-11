import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
${reset};

*{
  box-sizing: border-box;
}

body{
  background-color:${(props) => props.theme.bgColor};
  color:${(props) => props.theme.textColor};
  font-family: 'Montserrat', sans-serif;
  transition: all 0.3s ease-in-out;
}

button{
  border: none;
}

a{
  color: inherit;
  text-decoration: none;
}
`;
