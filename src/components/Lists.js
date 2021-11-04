/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { FaArrowsAltV as FaIcon } from 'react-icons/fa';

const items = [
  { number: '1', title: '🇦🇷 Argentina' },
  { number: '2', title: '🤩 Yeah' },
  { number: '3', title: '👨🏻‍💻 Tech Man' },
  { number: '4', title: '🍎 Apple & Code' },
  { number: '5', title: '💃🏼 Latina' },
];

const initialDnDState = {
  draggedFrom: null,
  draggedTo: null,
  isDragging: false,
  originalOrder: [],
  updatedOrder: [],
};

const Lists = () => {
  const [list, setList] = useState(items);
  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);

  // 드래그를 시작할 때(마우스를 클릭한 후 움직일 때)
  const onDragStart = e => {
    const initialPosition = Number(e.target.dataset.position);
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition, // set the draggedFrom position
      isDragging: true,
      originalOrder: list, // store the current state of "list"
    });
  };

  // 유효한 드롭 대상일 때(아이템이 드롭될 수 있는 곳일 때) 트리거되는 이벤트
  // 이때 event.target은 마우스 커서 아래에 있는 요소를 가리킨다(드롭 가능한 요소)
  const onDragOver = e => {
    // onDragOver 이벤트는 드롭을 취소시키는 기본 이벤트를 가진다
    // 드롭 이벤트를 사용하기 위해 preventDefault()로 기본 이벤트를 방지한다
    // 참고: https://developer.mozilla.org/ko/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#droptargets
    e.preventDefault();
    let newList = dragAndDrop.originalOrder;
    const { draggedFrom } = dragAndDrop;
    // index of the drop area being hovered
    const draggedTo = Number(e.target.dataset.position);

    // get the element that's at the position of "draggedFrom"
    const itemDragged = newList[draggedFrom];

    // filter out the item being dragged
    const remainingItems = newList.filter((_, index) => index !== draggedFrom);

    // update the list
    newList = [
      ...remainingItems.slice(0, draggedTo),
      itemDragged,
      ...remainingItems.slice(draggedTo),
    ];

    // since this event fires many times
    // we check if the targets are actually
    // different:
    if (draggedTo !== dragAndDrop.draggedTo) {
      setDragAndDrop({
        ...dragAndDrop,

        // save the updated list state
        // we will render this onDrop
        updatedOrder: newList,
        draggedTo,
      });
    }
  };

  const onDrop = () => {
    // we use the updater function
    // for the "list" hook
    setList(dragAndDrop.updatedOrder);

    // and reset the state of
    // the DnD
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: null,
      draggedTo: null,
      isDragging: false,
    });
  };

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
              dragAndDrop && dragAndDrop.draggedTo === Number(index)
                ? 'dropArea'
                : ''
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
              draggable 속성을 True로 지정하여 해당 요소가 드래그 가능한 객체가 되도록 변경
              이미지, 링크, 선택한 텍스트는 기본적으로 드래그 가능하도록 설정되어 있음.
              드래그 가능 상태에서 onDragStart 등의 드래그 관련 이벤트를 사용할 수 있음
            */}
            <span>{item.number}</span>
            <p>{item.title}</p>
            <FaIcon />
          </li>
        ))}
      </ul>
    </S.Container>
  );
};

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
        transition: margin-left 50ms ease-in-out; // 드래그 및 드롭할 때 움직이는 효과
      }

      svg {
        margin-left: auto;
        margin-right: 1em;
      }
    }
  }
`;

export default Lists;
