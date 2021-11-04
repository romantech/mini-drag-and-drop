import { createGlobalStyle } from 'styled-components/macro';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  ${normalize}

 *, *::before, *::after {
    box-sizing: border-box;
  }

body {
  margin: 0;
  padding: 0;
  font-family: 'Noto Sans KR', 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

`;

export default GlobalStyle;
