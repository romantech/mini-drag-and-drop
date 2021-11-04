import React from 'react';
import styled, { ThemeProvider } from 'styled-components/macro';
import Lists from './components/Lists';
import theme from './styles/theme';

function App() {
  const items = [
    { number: '1', title: '🇦🇷 Argentina' },
    { number: '2', title: '🤩 Yeah' },
    { number: '3', title: '👨🏻‍💻 Tech Man' },
    { number: '4', title: '🍎 Apple & Code' },
    { number: '5', title: '💃🏼 Latina' },
  ];

  return (
    <ThemeProvider theme={theme}>
      <S.Wrapper>
        <Lists items={items} />
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
  font-size: 3.5vw;
  @media (min-width: 900px) {
    font-size: 2vw;
  }
`;

export default App;
