# 미니 드래그앤드롭

![2021-11-05 15 30 43](https://user-images.githubusercontent.com/8604840/140512920-d027dbf8-e434-4bdc-a9ef-28b4ad0f5805.gif)
- Live Demo: https://mini-drag-and-drop.vercel.app

## 사용 스택
- Core: React
- Styling: Styled-Components + Babel Plugin Macros
- Other: React Icons

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
        
        *드래그중인 아이템을 마우스 포인터 위치(draggedTo 인덱스)로 이동. 기존 마우스 포인터 위치에 있던 요소는 바로 뒤로 밀림.* 
        
4. 드롭 가능한 영역에서 드롭했을 때 — **onDrop** 이벤트 트리거
    1. 순서를 변경한 엘리먼트 리스트 렌더
    2. 드래그앤드롭 관련 상태 초기화

## 배경지식
[HTML 드래그앤드롭 Web API](https://developer.mozilla.org/ko/docs/Web/API/HTML_Drag_and_Drop_API)를 이용해 리스트 엘리먼트의 순서를 마우스 드래그앤드롭으로 바꿀 수 있다. 엘리먼트의 `draggable` 속성을 `true`로 주면 해당 요소는 드래그 가능한 객체가 된다. 이미지, 링크, 선택한 텍스트(텍스트 블록)는 기본적으로 드래그가 가능하도록 설정되어있다. 드래그 가능 상태가 되면 `onDragStart` 같은 드래그 관련 이벤트를 사용할 수 있다. `onDragStart`는 드래그가 시작되면 트리거되는 이벤트다. 

```jsx
// 리스트 요소
<div draggable="true" onDragStart={startDragging}>
  Drag Me 🍰
</div>
```

엘리먼트에 `onDrop`과 `onDragOver` 이벤트를 걸면 드롭 가능한 영역(유효한 드롭 대상)이 된다. 이 두 이벤트를 활용해 드래그앤드롭 기능을 구현할 수 있다. `onDragOver`는 마우스 포인트에 있는 요소가 유효한 드롭 대상일 때 트리거 되며, `onDrop`은 드롭 가능한 영역에서 드롭했을 때 트리거되는 이벤트다. 

```jsx
<section onDrop={updateDragAndDropState} onDragOver={receiveDraggedElements}>
  Drop here 🤲🏻
</section>
```

드래그한 (요소)데이터와 상호 작용하기 위해 `setData()`와 `getData()` 같은 이벤트 메서드를 사용할 수도 있다. 현재 드래그 하고 있는 요소 정보(id 등)를 `setData()`를 통해 저장하고, 드롭했을 때 `getData()`를 통해 요소 정보를 불러온 후 재정렬 하는 방식으로 활용할 수 있다. 

```js
event.dataTransfer.setData(key, value) // 여러 key를 이용해 다수의 데이터를 저장할 수 있다
event.dataTransfer.getData(key)
```

## 구현 과정 포스팅 
1. [상태 정의](https://romantech.net/1118#:~:text=dataTransfer.getData(key)%3B-,%EC%83%81%ED%83%9C,-%EB%A6%AC%EC%95%A1%ED%8A%B8%20%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%20%EB%B0%94%EA%B9%A5)
2. [드래그 가능한 요소로 변경](https://romantech.net/1118#:~:text=%7D%3B-,%EB%93%9C%EB%9E%98%EA%B7%B8%20%EA%B0%80%EB%8A%A5%ED%95%9C%20%EC%9A%94%EC%86%8C%EB%A1%9C%20%EB%B3%80%EA%B2%BD,-%E2%9E%8A%EB%A7%81%ED%81%AC%20%E2%9E%8B%EC%9D%B4%EB%AF%B8%EC%A7%80%20%E2%9E%8C%EC%84%A0%ED%83%9D%ED%95%9C)
3. [드래그 이벤트 핸들러](https://romantech.net/1118#:~:text=%EB%93%9C%EB%9E%98%EA%B7%B8%20%EC%9D%B4%EB%B2%A4%ED%8A%B8-,%ED%95%B8%EB%93%A4%EB%9F%AC,-onDragOver%EC%99%80%20onDrop)
4. [Placeholder 스타일](https://romantech.net/1118#:~:text=Placeholder-,%EC%8A%A4%ED%83%80%EC%9D%BC,-DROP%20HERE%20%EB%B6%80%EB%B6%84%EC%9D%B4)


## 레퍼런스
1. [DEV: Creating a Drag and Drop List with React Hooks](https://dev.to/florantara/creating-a-drag-and-drop-list-with-react-hooks-4c0i)
2. [MDN: HTML 드래그 앤 드롭 API](https://developer.mozilla.org/ko/docs/Web/API/HTML_Drag_and_Drop_API)
