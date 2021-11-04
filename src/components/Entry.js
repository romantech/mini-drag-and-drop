/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components/macro';

const Entry = ({ content }) => {
  return <S.Element>{content}</S.Element>;
};

const S = {};
S.Element = styled.div`
  height: 4rem;
  width: 16rem;
  border: 1px solid #cbd5e0;
  line-height: 4rem;
`;

export default Entry;
