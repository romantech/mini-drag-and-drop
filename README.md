# 드래그앤드롭 구현

![2021-11-05 15 30 43](https://user-images.githubusercontent.com/8604840/140512920-d027dbf8-e434-4bdc-a9ef-28b4ad0f5805.gif)
- demo 체험 : https://mini-drag-and-drop.vercel.app

## 사용 스택
- React(CRA) + Hooks
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

## 배경지식
[HTML 드래그앤드롭 Web API](https://developer.mozilla.org/ko/docs/Web/API/HTML_Drag_and_Drop_API)를 이용해 리스트 엘리먼트의 순서를 바꿀 수 있다. 엘리먼트의 `draggable` 속성을 `true`로 주면 해당 요소는 드래그 가능한 객체가 된다. 이미지, 링크, 선택한 텍스트는 기본적으로 드래그가 가능하도록 설정되어있다. 드래그 가능 상태가 되면 `onDragStart` 같은 드래그 관련 이벤트를 사용할 수 있다. `onDragStart`는 드래그가 시작되면 트리거되는 이벤트다. 

```jsx
// 리스트 요소
<div draggable="true" onDragStart={startDragging}>
  Drag Me 🍰
</div>
```

드롭할 영역(리스트 엘리먼트의 컨테이너)에 `onDrop`과 `onDragOver` 이벤트에 대한 핸들러를 할당해서 드래그앤드롭 효과를 구현할 수 있다. `onDragOver`는 드래그 도중, 마우스 커서 아래에 있는 요소가 유효한 드롭 대상일 때 트리거 되며, `onDrop`은 말그대로 마우스 클릭을 해제하여 드롭했을 때 트리거되는 이벤트다. 

```jsx
<section onDrop={updateDragAndDropState} onDragOver={receiveDraggedElements}>
  Drop here 🤲🏻
</section>
```

드래그한 (요소)데이터와 상호 작용하기 위해 setData()와 getData() 같은 이벤트 메서드도 사용할 수 있다. 현재 드래그 하고 있는 요소 정보(id 등)를 setData()를 통해 저장하고, 드롭했을 때 getData()를 통해 요소 정보를 불러온 후 재정렬 하는 방식으로 활용할 수 있다. React Hooks를 사용하지 않을 때 유용할 듯 하다. 

```jsx
event.dataTransfer.setData(key, value) // 여러 key를 이용해 다수의 데이터를 저장할 수 있다
event.dataTransfer.getData(key)
```


## 구현 과정 노션 노트
1. [상태 정의](https://www.notion.so/colorfilter/TIL-React-Hooks-aeb08a0e110943bb8a2267e32f34da04#57e95fc116354ac682ab42e95693070a)
2. [드래그 가능한 요소로 변경](https://www.notion.so/colorfilter/TIL-React-Hooks-aeb08a0e110943bb8a2267e32f34da04#bef5c4f9cbc142c2aacbb6dcc872dc99)
3. [드래그 이벤트 핸들러](https://www.notion.so/colorfilter/TIL-React-Hooks-aeb08a0e110943bb8a2267e32f34da04#020ebb0f1d6a414c9482dbbfa5c9730a)
4. [Placeholder 스타일](https://www.notion.so/colorfilter/TIL-React-Hooks-aeb08a0e110943bb8a2267e32f34da04#474008a8d4d947d5a75b05006ba80880)
