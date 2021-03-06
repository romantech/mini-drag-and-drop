/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { FaArrowsAltV as FaIcon } from 'react-icons/fa';

const items = [
  { number: '1', title: 'π¦π· Argentina' },
  { number: '2', title: 'π€© Yeah' },
  { number: '3', title: 'π¨π»βπ» Tech Man' },
  { number: '4', title: 'π Apple & Code' },
  { number: '5', title: 'ππΌ Latina' },
];

const initialDnDState = {
  draggedFrom: null, // λλκ·Έλ₯Ό μμν μμμ(λ§μ°μ€λ₯Ό ν΄λ¦­νμ¬ μμ§μΈ μμ) μΈλ±μ€
  draggedTo: null, // λλ‘­ λμ μμμ μΈλ±μ€
  isDragging: false, // λλκ·Έ μ¬λΆ Boolean
  originalOrder: [], // λλ‘­νκΈ°μ (μμκ° λ°λκΈ° μ ) κΈ°μ‘΄ list
  updatedOrder: [], // λλ‘­ν ν μμκ° λ°λ list
};

function Lists() {
  const [list, setList] = useState(items); // λ λλ  μμ
  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState); // D&D κ΄λ ¨ μν

  // * λλκ·Έλ₯Ό μμν  λ(λ§μ°μ€λ₯Ό ν΄λ¦­ν ν μμ§μΌ λ)
  const onDragStart = e => {
    const initialPosition = Number(e.target.dataset.position);
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition, // λλκ·Έλ₯Ό μμν μμμ μΈλ±μ€
      isDragging: true,
      originalOrder: list, // νμ¬ list μν μ μ₯
    });
  };

  // * μ ν¨ν λλ‘­ λμμΌ λ(onDragOver λ° onDrop μ΄λ²€νΈκ° κ±Έλ €μλ DOM) νΈλ¦¬κ±°λλ μ΄λ²€νΈ
  // μ΄λ event.targetμ λ§μ°μ€ μ»€μ μλμ μλ μμλ₯Ό κ°λ¦¬ν¨λ€(λλ‘­ κ°λ₯ν μμ)
  const onDragOver = e => {
    // onDragOver μ΄λ²€νΈλ λλ‘­μ μ·¨μμν€λ κΈ°λ³Έ μ΄λ²€νΈλ₯Ό κ°μ§λ€
    // λλ‘­ μ΄λ²€νΈλ₯Ό μ¬μ©νκΈ° μν΄ preventDefault()λ‘ κΈ°λ³Έ μ΄λ²€νΈλ₯Ό λ°©μ§νλ€
    // μ°Έκ³ : https://developer.mozilla.org/ko/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#droptargets
    e.preventDefault();
    const draggedTo = Number(e.target.dataset.position); // νμ¬ hover λκ³  μλ(λ§μ°μ€κ° μμΉν) itemμ μΈλ±μ€
    const { originalOrder, draggedFrom } = dragAndDrop; // κΈ°μ‘΄ λ¦¬μ€νΈ λ° λλκ·Έμ€μΈ μμμ μΈλ±μ€ μ‘°ν
    const remainingItems = originalOrder.filter(
      (_, index) => index !== draggedFrom, // νμ¬ λλκ·Έ νκ³  μλ μμλ₯Ό μ μΈν items λͺ©λ‘
    );

    // λ¦¬μ€νΈ μμ λ³κ²½.
    // νμ¬ λλκ·Έμ€μΈ μμ΄νμ draggedTo(νμ¬ λ§μ°μ€κ° μμΉν) μΈλ±μ€ μμΉλ‘ μΆκ°
    const updatedOrder = [
      ...remainingItems.slice(0, draggedTo),
      originalOrder[draggedFrom], // νμ¬ λλκ·Έμ€μΈ μμ΄ν
      ...remainingItems.slice(draggedTo),
    ];

    // μμ λ³κ²½ν λ¦¬μ€νΈ λ° hover μμμ μΈλ±μ€(draggedTo) μλ°μ΄νΈ.
    // μνμ μ μ₯ν hover μμ μΈλ±μ€(draggedTo)μ κ°μ§ μμλλ§ μλ°μ΄νΈ
    if (draggedTo !== dragAndDrop.draggedTo) {
      setDragAndDrop({
        ...dragAndDrop,
        updatedOrder, // λλ‘­ μ΄λ²€νΈκ° νΈλ¦¬κ±°λλ©΄ ν΄λΉ λ¦¬μ€νΈκ° λ λλ¨
        draggedTo,
      });
    }
  };

  // * λλ‘­ κ°λ₯ν μμ­μμ λ§μ°μ€ ν΄λ¦­μ ν΄μ νμ¬ λλ‘­νμ λ νΈλ¦¬κ±°λλ μ΄λ²€νΈ
  const onDrop = () => {
    // onDropOverμμ μμν΄λ(λ§μ°μ€ μ»€μμ λ°λΌ μμλ₯Ό λ³κ²½ν) μμ λ¦¬μ€νΈ μλ°μ΄νΈ
    setList(dragAndDrop.updatedOrder);

    // dragAndDrop μν μ΄κΈ°ν
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: null,
      draggedTo: null,
      isDragging: false,
    });
  };

  // * λλκ·Ένκ³  μλ μμκ° λλ‘­ν  μ μλ μμ­μ λ²μ΄λ¬μ λ νΈλ¦¬κ±°λλ μ΄λ²€νΈ
  const onDragLeave = () => {
    setDragAndDrop({
      ...dragAndDrop,
      draggedTo: null,
    });
  };

  return (
    <S.Container>
      <ul>
        {list.map((item, index) => (
          <li
            className={
              dragAndDrop?.draggedTo === Number(index) ? 'dropArea' : ''
            }
            data-position={index}
            key={item.number}
            draggable
            onDragStart={onDragStart}
            onDragLeave={onDragLeave}
            onDragOver={onDragOver}
            onDrop={onDrop}
          >
            {/*
              draggable μμ±μ Trueλ‘ μ§μ νμ¬ ν΄λΉ μμκ° λλκ·Έ κ°λ₯ν κ°μ²΄κ° λλλ‘ λ³κ²½
              μ΄λ―Έμ§, λ§ν¬, μ νν νμ€νΈλ κΈ°λ³Έμ μΌλ‘ λλκ·Έ κ°λ₯νλλ‘ μ€μ λμ΄ μμ.
              λλκ·Έ κ°λ₯ μνμμ onDragStart λ±μ λλκ·Έ κ΄λ ¨ μ΄λ²€νΈλ₯Ό μ¬μ©ν  μ μμ
            */}
            <span>{item.number}</span>
            <p>{item.title}</p>
            <FaIcon />
          </li>
        ))}
      </ul>
    </S.Container>
  );
}

const S = {};
S.Container = styled.section`
  margin: 0 auto;
  width: 18em;
  background: whitesmoke;
  padding: 0.5em 1em;
  border-radius: 0.5em;
  box-shadow: 4px 4px 50px rgba(104, 123, 247, 0);
  transition: box-shadow 100ms linear;
  :hover {
    box-shadow: 4px 4px 50px rgb(104, 123, 247, 0.8);
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
        color: white !important;
        background: white !important;
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
        transition: margin-left 50ms ease-in-out; // λλκ·Έ λ° λλ‘­ν  λ μμ§μ΄λ ν¨κ³Ό
      }

      svg {
        margin-left: auto;
        margin-right: 1em;
      }
    }
  }
`;

export default Lists;
