import React from 'react';
import styled, { ThemeProvider } from 'styled-components/macro';
import { Analytics } from '@vercel/analytics/react';
import Lists from './components/Lists';
import theme from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Analytics />
      <S.Wrapper>
        <Lists />
      </S.Wrapper>
    </ThemeProvider>
  );
}

const S = {};
S.Wrapper = styled.section`
  display: grid;
  place-content: center;
  width: 100vw;
  height: 100vh;
  background: #1d1e21;
  font-size: 3.2vw;
  @media (min-width: 900px) {
    font-size: 1.8vw;
    // 1vw는 뷰포트 넓이의 1%, 900px라면 9px (900 * 0.01)
    // 1.8vw는 900 * 0.018 = 16.2px
  }
`;

export default App;
