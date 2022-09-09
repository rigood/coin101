import { ThemeProvider } from "styled-components";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

import Router from "./Router";
import { useRecoilValue } from "recoil";
import { HelmetProvider } from "react-helmet-async";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { isDarkAtom } from "./atoms";
import { darkTheme, lightTheme } from "./theme";

const GlobalStyle = createGlobalStyle`
${reset};
*{
  box-sizing: border-box;
}
body{
  background-color:${(props) => props.theme.bgColor};
  color:${(props) => props.theme.textColor};
  font-family: 'Montserrat', sans-serif;
}
button{
  border: none;
}
a{
  color: inherit;
  text-decoration: none;
}
`;

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <HelmetProvider>
          <Router />
        </HelmetProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </>
  );
}

export default App;
