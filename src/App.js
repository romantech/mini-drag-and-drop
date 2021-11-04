import React from 'react';
import styled from 'styled-components/macro';
import Lists from './components/Lists';

function App() {
  return (
    <S.Wrapper>
      <Lists listNum={8} />
    </S.Wrapper>
  );
}

const S = {};
S.Wrapper = styled.section`
  width: 100vw;
  height: 100vh;
`;

export default App;
