import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import selectionSort from './algorithms/selectionSort';
import insertionSort from './algorithms/insertionSort';
import mergeSort from './algorithms/mergeSort';
import quickSort from './algorithms/quickSort';
import bubbleSort from './algorithms/bubbleSort';

const INTERVAL = 20;
const ARRAY_BAR_HIGHLIGHT_COLOR = "#000";

function App(props) {
  const [arr, setArr] = useState([0]);
  const [isSorting, setIsSorting] = useState(false);
  const arrayContainerRef = useRef(null);

  function createRandomArray(event) {
    if (isSorting) return;

    let n = Number(event.target.value);
    setArr([...Array(n)].map(_ => Math.ceil(Math.random() * n)));
  }

  function highlightArrayBar(i) {
    const arrayBars = arrayContainerRef.current.children;

    setTimeout(function() {
      arrayBars[i].style.backgroundColor = ARRAY_BAR_HIGHLIGHT_COLOR;
    }, INTERVAL);

    setTimeout(function() {
      arrayBars[i].style.backgroundColor = '';
    }, INTERVAL * 2);
  }

  function animateArraySort(animations) {
    setIsSorting(true);

    let offset = 0;
    for (let i = 0; i < animations.length; i++) {
      setTimeout(function() {
        if (animations[i][2]) { // Assignment
          setArr((prevArr) => {
            const newArr = [...prevArr];
            newArr[animations[i][0]] = animations[i][1];
            return newArr;
          });
        } else {
          if (animations[i][0] !== animations[i][1]) {
            highlightArrayBar(animations[i][0]);
            highlightArrayBar(animations[i][1]);
          } else {
            highlightArrayBar(animations[i][0]);
          }          
        }
      }, offset * INTERVAL);

      if (!animations[i][2]) offset++;
    }

    setTimeout(function() {
      animateArraySorted();
    }, (offset + 1) * INTERVAL)
  }

  function animateArraySorted() {
    const arrayBars = arrayContainerRef.current.children;

    for (let i = 0; i < arrayBars.length; i++) {
      setTimeout(function() {
        arrayBars[i].style.backgroundColor = ARRAY_BAR_HIGHLIGHT_COLOR;
      }, i * INTERVAL);
    }

    for (let i = 0; i < arrayBars.length; i++) {
      setTimeout(function() {
        arrayBars[i].style.backgroundColor = '';
      }, (i + arrayBars.length) * INTERVAL);
    }

    setTimeout(function() { setIsSorting(false); }, 2 * arrayBars.length * INTERVAL);
  }

  function selectionSortWrapper() {
    if (isSorting) return;
    animateArraySort(selectionSort(arr));
  }

  function insertionSortWrapper() {
    if (isSorting) return;
    animateArraySort(insertionSort(arr));
  }

  function mergeSortWrapper() {
    if (isSorting) return;
    animateArraySort(mergeSort(arr));
  }

  function quickSortWrapper() {
    if (isSorting) return;
    animateArraySort(quickSort(arr));
  }

  function bubbleSortWrapper() {
    if (isSorting) return;
    animateArraySort(bubbleSort(arr));
  }

  return (
    <div class="main-container">
      <div class="array-container" ref={arrayContainerRef}>
        {arr.map(h => (
          <div
            class="array-bar"
            style={{
              height: `${h}%`,
              width: `${100 / arr.length}%`
            }}
          ></div>
        ))}
      </div>
      <div class="range-container">
        <input type="range" min="1" max="100" defaultValue="1" step="1" onChange={createRandomArray}/>
      </div>
      <div class="button-outer-container">
        <div class="button-inner-container">
          <button onClick={selectionSortWrapper}>Selection Sort</button>
          <button onClick={insertionSortWrapper}>Insertion Sort</button>
          <button onClick={mergeSortWrapper}>Merge Sort</button>
          <button onClick={quickSortWrapper}>Quick Sort</button>
          <button onClick={bubbleSortWrapper}>Bubble Sort</button>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);