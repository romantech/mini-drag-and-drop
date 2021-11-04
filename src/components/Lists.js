/* eslint-disable react/prop-types */
import React, { useState, useCallback } from 'react';
import styled from 'styled-components/macro';
import { FaArrowsAltV } from 'react-icons/fa';
import Entry from './Entry';

const Lists = ({ items }) => {
  const onDragStart = event => {
    // It receives a DragEvent
    // which inherits properties from
    // MouseEvent and Event
    // so we can access the element
    // through event.currentTarget
    // Later, we'll save
    // in a hook variable
    // the item being dragged
  };

  return (
    <S.ListWrapper>
      <ul>
        {items.map(item => (
          <li key={item.number} draggable="true" onDragStart={onDragStart}>
            <span>{item.number}</span>
            <p>{item.title}</p>
            <FaArrowsAltV />
          </li>
        ))}
      </ul>
    </S.ListWrapper>
  );
};

const S = {};
S.ListWrapper = styled.section`
  margin: 0 auto;
  max-width: 20em;
  background: whitesmoke;
  padding: 0.5em 1em;
  border-radius: 0.5em;
  box-shadow: 4px 4px 50px rgba(104, 123, 247, 0);
  transition: box-shadow 100ms linear;
  :hover {
    box-shadow: 4px 4px 50px rgba(104, 123, 247, 0.6);
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      display: flex;
      align-items: center;
      cursor: move;
      line-height: 1;
      margin-bottom: 0.1em;
      border-radius: 5px;

      &.dropArea {
        color: white;
        background: white;
        position: relative;

        &::before {
          content: 'Drop Here';
          color: ${({ theme }) => theme.$blue};
          font-size: 0.5em;
          text-transform: uppercase;
          width: 100%;
          height: 100%;
          border: ${({ theme }) => `2px dashed ${theme.$blue}`};
          border-radius: 3px;
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        span {
          display: none;
        }

        p {
          margin-left: 1em;
        }
      }

      &:hover {
        background: ${({ theme }) =>
          `linear-gradient(to left, ${theme.$blue}, ${theme.$lightblue})`};
        color: white;

        span {
          background-color: ${({ theme }) => theme.$cyan};
        }
      }

      span {
        display: inline-block;
        margin-right: 1em;
        margin-left: 0.5em;
        background-color: ${({ theme }) => theme.$lightblue};
        width: 2em;
        height: 2em;
        border-radius: 50%;
        display: grid;
        place-items: center;
        color: white;
        font-weight: bold;
        transition: background-color 100ms linear;
      }

      p {
        margin-right: 1.5em;
        transition: margin-left 50ms ease-in-out;
      }

      svg {
        margin-left: auto;
        margin-right: 1em;
      }
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0.2;
    }
    100% {
      opacity: 1;
    }
  }
`;

export default Lists;
