// 初始狀態為 O，並且在第四個大區塊
var currentState = 'O';
var currentRegion = 4;
// 一開始移除第四個大區塊遮罩
removeMask(currentRegion);
// 重複執行generateRegion(為每個大區塊加上監聽器)
for (let i = 0; i < 9; i++) {
  generateRegion(i);
}

// 移除遮罩，num 為大區塊的數字
function removeMask(num) {
  const mask = document.querySelector(`#region-mask-${num}`);
  mask.classList.add('hidden');
}
function addMask(num) {
  const mask = document.querySelector(`#region-mask-${num}`);
  mask.classList.remove('hidden');
}

//找帶有 id="region-num-" 的元素(num此為數字)，並將其子元素加上監聽器，使其被點擊時觸發handleClick函式
function generateRegion(num) {
  const region_children = document.querySelectorAll(`[id^="region-${num}-"]`);
  //一個for迴圈，然後使num=i的數字的格子涂上紅色，並使其他格子的事件監聽器只能觸發一次(就是讓你一格只能點一次)()
  for (let i = 0; i < region_children.length; i++) {
    const childElement = region_children[i];
    if (num === i) {
      childElement.classList.add('bg-red-500');
      continue;
    }
    childElement.addEventListener(
      'click',
      () => {
        handleClick(childElement, num, i);
      },
      { once: false }
    );
  }
}

// 改變當前的狀態 (O or X)
function changeState() {
  if (currentState === 'O') {
    currentState = 'X';
  } else {
    currentState = 'O';
  }
}

function setBoxState(box) {
  box.innerHTML = `<div class="text-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">${currentState}</div>`;

  changeState();
}
// 防止不能點的被點擊(如果點到的格子的數字不等於當前的數字，就return)(return:結束函式)
function handleClick(box, num, i) {
  console.log(num, i, currentRegion);
  if (num !== currentRegion) {
    return;
  }
  setBoxState(box);
  box.removeEventListener('click', handleClick);
  addMask(currentRegion);
  currentRegion = i;
  removeMask(currentRegion);
}
