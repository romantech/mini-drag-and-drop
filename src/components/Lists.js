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
  draggedFrom: null, // 드래그를 시작한 요소의(마우스를 클릭하여 움직인 요소) 인덱스
  draggedTo: null, // 드롭 대상 요소의 인덱스
  isDragging: false, // 드래그 여부 Boolean
  originalOrder: [], // 드롭하기전(순서가 바뀌기 전) 기존 list
  updatedOrder: [], // 드롭한 후 순서가 바뀐 list
};

const Lists = () => {
  const [list, setList] = useState(items);
  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);

  // 드래그를 시작할 때(마우스를 클릭한 후 움직일 때)
  const onDragStart = e => {
    const initialPosition = Number(e.target.dataset.position);
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition, // 드래그를 시작한 요소의 인덱스
      isDragging: true,
      originalOrder: list, // 현재 list 상태 저장
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
    const { draggedFrom } = dragAndDrop; // 드래그를 시작한 items 요소의 인덱스
    const draggedTo = Number(e.target.dataset.position); // 현재 hover되고 있는 드롭 item 영역의 인덱스
    const itemDragged = newList[draggedFrom]; // draggedFrom 위치에 있는 인덱스 저장(드래그 하고 있는 요소 저장)
    // 현재 드래그 하고 있는 요소 제외하여 필터된 items 목록
    const remainingItems = newList.filter((_, index) => index !== draggedFrom);

    // 아이템 리스트 업데이트
    newList = [
      ...remainingItems.slice(0, draggedTo),
      itemDragged,
      ...remainingItems.slice(draggedTo),
    ];

    // 현재 이벤트의 타겟이 dragAndDrop 상태에 저장된 타겟이 동일하지 않을때만 리스트 업데이트
    if (draggedTo !== dragAndDrop.draggedTo) {
      setDragAndDrop({
        ...dragAndDrop,
        updatedOrder: newList, // 업데이트 리스트 상태에 저장. 드롭한다면 해당 리스트가 렌더됨
        draggedTo,
      });
    }
  };

  // 마우스 클릭을 해제하여 드롭했을 때 트리거되는 이벤트
  const onDrop = () => {
    // 리스트 업데이트
    setList(dragAndDrop.updatedOrder);

    // dragAndDrop 상태 초기화
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
