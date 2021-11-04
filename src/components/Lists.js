import React from 'react';
import styled from 'styled-components/macro';
import Entry from './Entry';

const Lists = ({ listNum }) => {
  // upper alphabet string
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const renderList = alphabet.split('').slice(0, listNum);

  return (
    <S.ListWrapper>
      {renderList.map(el => (
        <Entry key={el} content={el} />
      ))}
    </S.ListWrapper>
  );
};

const S = {};
S.ListWrapper = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 15px;
`;

export default Lists;
