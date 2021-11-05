# 드래그앤드롭 구현

![2021-11-05 15 30 43](https://user-images.githubusercontent.com/8604840/140512920-d027dbf8-e434-4bdc-a9ef-28b4ad0f5805.gif)

## 사용 스택
- React + Hooks
- Styled-Components

## TL;DR
1. 드래그할 수 있는 요소로 변경 — `draggable={true}`
2. 드래그 시작 — **onDragStart** 이벤트 트리거
    1. 드래그하고 있는 요소의 인덱스 정보 저장 — `state.draggedFrom`
    2. 드래그 상태 true로 변경 — `state.isDragging`
    3. 이벤트 트리거 시점의 엘리먼트 리스트 저장 — `state.originalOrder`
3. 마우스 커서가 드롭 가능한 영역에 있을 때 — **onDragOver** 이벤트 트리거
    1. drop 이벤트를 사용할 수 있도록 dragOver 기본 이벤트 방지 — `e.preventDefault()`
    2. 마우스 포인터 위치에 있는 요소의 인덱스 저장 — `state.draggedTo`
    3. 엘리먼트 순서 변경 — `state.updatedOrder`
        
        *드래그중인 아이템을 마우스 포인트가 위치한 요소의 위치(draggedTo 인덱스)로 이동. 기존 마우스 포인터 위치에 있던 요소는 바로 뒤로 밀림.* 
        
4. 드롭 가능한 영역에서 드롭했을 때 — **onDrop** 이벤트 트리거
    1. 순서를 변경한 엘리먼트 리스트 렌더
    2. 드래그앤드롭 관련 상태 초기화
## 구현 과정 노트
https://www.notion.so/colorfilter/TIL-React-Hooks-aeb08a0e110943bb8a2267e32f34da04
