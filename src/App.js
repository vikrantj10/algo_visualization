import { useEffect, useRef, useState } from "react";
import {
  Randomize,
  bubblesort,
  initactiontypes,
  initarray,
  insertionsort,
  mergesort,
  quicksort,
  selectionsort,
  shellsort,
} from "./utils/helpers";

function App() {
  const [array, setarray] = useState([]);
  const [prevarrayhistory, setprevarrayhistory] = useState([]);
  const [features, setfeatures] = useState([]);
  const [nextarrayhistory, setnextarrayhistory] = useState([]);
  const [ischanging, setischanging] = useState(false);
  const [statetext, setstatetext] = useState("Pause");
  const [algoname, setalgoname] = useState("Select The Algo To Play");
  const [isdone, setdone] = useState(false);
  const pause = useRef(false);
  const [index, setindex] = useState(0);

  useEffect(() => {
    setarray(initarray);
    setfeatures(initactiontypes);
    setprevarrayhistory([initarray]);
    setnextarrayhistory([initarray]);
  }, []);

  function togglestateplaypause() {
    pause.current = !pause.current;
    if (pause.current) setstatetext("Play");
    else {
      onclickbubblesorthandler();
      setstatetext("Pause");
    }
  }

  function onclickstepbackwardhandler() {
    if (index > 0) {
      const newIndex = index - 1;
      setindex(newIndex);
      setarray(prevarrayhistory[newIndex]);
    }
  }

  function onclickstepforwardhandler() {
    if (index < nextarrayhistory.length - 1) {
      const newIndex = index + 1;
      setindex(newIndex);
      setarray(nextarrayhistory[newIndex]);
    }
  }

  function onclickrandomizearrayhandler() {
    const output = Randomize(array);
    setarray([...output]);
    setindex(0);
    setdone(true);
  }

  async function onclickbubblesorthandler() {
    bubblesort(array, setdone, setischanging, setindex, setprevarrayhistory, setnextarrayhistory, setarray, index, pause);
  }

  function onclickinsertionsorthandler() {
    insertionsort(array, setdone, setischanging, setindex, setprevarrayhistory, setnextarrayhistory, setarray, index, pause);
  }

  function onclickselectionsorthandler() {
    selectionsort(array, setdone, setischanging, setindex, setprevarrayhistory, setnextarrayhistory, setarray, index, pause);
  }

  function onclickquicksorthandler() {
    quicksort(array, setdone, setischanging, setindex, setprevarrayhistory, setnextarrayhistory, setarray, index, pause);
  }

  function onclickmergesorthandler() {
    mergesort(array, setdone, setischanging, setindex, setprevarrayhistory, setnextarrayhistory, setarray, index, pause);
  }

  function onclickshellsorthandler() {
    shellsort(array, setdone, setischanging, setindex, setprevarrayhistory, setnextarrayhistory, setarray, index, pause);
  }

  function resethandler(){
    setdone(false);
    setarray(initarray);
    setprevarrayhistory([initarray]);
    setnextarrayhistory([initarray]);
  }

  function handlefeatures(name) {
    switch (name) {
      case "bubble":
        setalgoname("Selected: Bubble Sort");
        onclickbubblesorthandler();
        break;

      case "insertion":
        setalgoname("Selected: Insertion Sort");
        onclickinsertionsorthandler();
        break;

      case "merge":
        setalgoname("Selected: Merge Sort");
        onclickmergesorthandler();
        break;

      case "quick":
        setalgoname("Selected: Quick Sort");
        onclickquicksorthandler();
        break;

      case "shell":
        setalgoname("Selected: Shell Sort");
        onclickshellsorthandler();
        break;

      case "randomize":
        setalgoname("Selected: Randomize Array");
        onclickrandomizearrayhandler();
        break;

      case "selection":
        setalgoname("Selected: Selection Sort");
        onclickselectionsorthandler();
        break;

      default:
        setalgoname("Select Algo");
        break;
    }
  }

  return (
    <div className="app">

      <header>
        <h1>Comparison Sorting Algorithms</h1>
      </header>

      <div className="actiontype">
        {features.map((key) => (
          <button onClick={() => handlefeatures(key.name)}>{key.text}</button>
        ))}
      </div>

      <div className="elementscontainer">
        {array.map((val) => (
          <div className="individualelementcontainer">
            <p style={{ background: "mediumpurple", width: "1rem", height: `${val / 5}rem` }}></p>
            <p style={{ color: "mediumpurple" }}>{val}</p>
          </div>
        ))}
      </div>

      <div className="playingoptions">
        <button disabled={!pause.current ? true : index === 0 ? true : false} onClick={onclickstepbackwardhandler}>
          Step Backward
        </button>
        {ischanging && <button onClick={togglestateplaypause}>{statetext}</button>}
        {!ischanging && <p>{algoname}</p>}
        <button disabled={!pause.current ? true : false} onClick={onclickstepforwardhandler}>
          Step Forward
        </button>
        {isdone && <button onClick={resethandler}>Reset</button>}
      </div>

      <footer>
        <h1>Algorithms Visualizations</h1>
      </footer>

    </div>
  );
}

export default App;
