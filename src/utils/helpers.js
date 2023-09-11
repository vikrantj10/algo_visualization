export const initarray = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 1, 2, 3, 4, 6, 7, 8, 9, 11, 12, 1, 2, 5, 43, 6, 7, 3, 23, 6, 54, 85, 22];

export const initactiontypes = [
  { text: "Randomize Array", name: "randomize" },
  { text: "Insertion Sort", name: "insertion" },
  { text: "Selection Sort", name: "selection" },
  { text: "Bubble Sort", name: "bubble" },
  { text: "Quick Sort", name: "quick" },
  { text: "Merge Sort", name: "merge" },
  { text: "Shell Sort", name: "shell" },
];

export function Randomize(array) {
  let newarray = [...array];
  for (let i = newarray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newarray[i], newarray[j]] = [newarray[j], newarray[i]];
  }
  return newarray;
}

export async function bubblesort(array, setdone, setischanging, setindex, setprevarrayhistory, setnextarrayhistory, setarray, index, pause) {
  const n = array.length;
  const newarray = [...array];
  setischanging(true);
  for (let i = index; i < n - 1; i++) {
    if (pause.current) return;
    for (let j = 0; j < n - i - 1; j++) {
      if (newarray[j] > newarray[j + 1]) {
        const temp = newarray[j];
        newarray[j] = newarray[j + 1];
        newarray[j + 1] = temp;
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
    setindex(i + 1);
    setprevarrayhistory((prevarray) => [...prevarray, [...newarray]]);
    setnextarrayhistory((nextarray) => [...nextarray, [...newarray]]);
    setarray([...newarray]);
  }
  setischanging(false);
  setindex(0);
  setdone(true);
}

export async function insertionsort(array, setdone, setischanging, setindex, setprevarrayhistory, setnextarrayhistory, setarray, index, pause) {
  const n = array.length;
  const newarray = [...array];
  setischanging(true);
  for (let i = index; i < n; i++) {
    if (pause.current) return;
    let currentVal = newarray[i];
    let j = i - 1;
    while (j >= 0 && newarray[j] > currentVal) {
      newarray[j + 1] = newarray[j];
      j--;
    }
    newarray[j + 1] = currentVal;
    await new Promise((resolve) => setTimeout(resolve, 500));
    setindex(i);
    setprevarrayhistory((prevarray) => [...prevarray, [...newarray]]);
    setnextarrayhistory((nextarray) => [...nextarray, [...newarray]]);
    setarray([...newarray]);
  }
  setischanging(false);
  setindex(0);
  setdone(true);
}

export async function selectionsort(array, setdone, setischanging, setindex, setprevarrayhistory, setnextarrayhistory, setarray, index, pause) {
  const n = array.length;
  const newarray = [...array];
  setischanging(true);
  for (let i = index; i < n - 1; i++) {
    if (pause.current) return;
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (newarray[j] < newarray[minIndex]) {
        minIndex = j;
      }
    }
    const temp = newarray[i];
    newarray[i] = newarray[minIndex];
    newarray[minIndex] = temp;
    await new Promise((resolve) => setTimeout(resolve, 500));
    setindex(i + 1);
    setprevarrayhistory((prevarray) => [...prevarray, [...newarray]]);
    setnextarrayhistory((nextarray) => [...nextarray, [...newarray]]);
    setarray([...newarray]);
  }
  setischanging(false);
  setdone(true);
  setindex(0);
}

export async function quicksort(array, setdone, setischanging, setindex, setprevarrayhistory, setnextarrayhistory, setarray, index, pause) {
  const n = array.length;
  const newarray = [...array];
  setischanging(true);

  async function partition(low, high) {
    const pivot = newarray[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (pause.current) return;
      if (newarray[j] < pivot) {
        i++;
        const temp = newarray[i];
        newarray[i] = newarray[j];
        newarray[j] = temp;
      }
    }
    const temp = newarray[i + 1];
    newarray[i + 1] = newarray[high];
    newarray[high] = temp;
    return i + 1;
  }

  async function quickSort(low, high) {
    if (low < high) {
      const pi = await partition(low, high);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setindex(index + 1);
      setprevarrayhistory((prevarray) => [...prevarray, [...newarray]]);
      setnextarrayhistory((nextarray) => [...nextarray, [...newarray]]);
      setarray([...newarray]);
      await quickSort(low, pi - 1);
      await quickSort(pi + 1, high);
    }
  }

  await quickSort(0, n - 1);
  setischanging(false);
  setindex(0);
  setdone(true);
}

export async function mergesort(array, setdone, setischanging, setindex, setprevarrayhistory, setnextarrayhistory, setarray, index, pause) {
  const n = array.length;
  const newarray = [...array];
  setischanging(true);

  async function merge(low, mid, high) {
    const leftArray = newarray.slice(low, mid + 1);
    const rightArray = newarray.slice(mid + 1, high + 1);
    let i = 0;
    let j = 0;
    let k = low;

    while (i < leftArray.length && j < rightArray.length) {
      if (pause.current) return;
      if (leftArray[i] <= rightArray[j]) {
        newarray[k] = leftArray[i];
        i++;
      } else {
        newarray[k] = rightArray[j];
        j++;
      }
      k++;
    }

    while (i < leftArray.length) {
      if (pause.current) return;
      newarray[k] = leftArray[i];
      i++;
      k++;
    }

    while (j < rightArray.length) {
      if (pause.current) return;
      newarray[k] = rightArray[j];
      j++;
      k++;
    }
  }

  async function mergeSort(low, high) {
    if (low < high) {
      const mid = Math.floor((low + high) / 2);
      await mergeSort(low, mid);
      await mergeSort(mid + 1, high);
      await merge(low, mid, high);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setindex(index + 1);
      setprevarrayhistory((prevarray) => [...prevarray, [...newarray]]);
      setnextarrayhistory((nextarray) => [...nextarray, [...newarray]]);
      setarray([...newarray]);
    }
  }

  await mergeSort(0, n - 1);
  setischanging(false);
  setindex(0);
  setdone(true);
}

export async function shellsort(array, setdone, setischanging, setindex, setprevarrayhistory, setnextarrayhistory, setarray, index, pause) {
  const n = array.length;
  const newarray = [...array];
  setischanging(true);
  const gaps = [701, 301, 132, 57, 23, 10, 4, 1];
  for (let gap of gaps) {
    if (pause.current) return;
    for (let i = gap; i < n; i++) {
      const currentVal = newarray[i];
      let j = i;
      while (j >= gap && newarray[j - gap] > currentVal) {
        newarray[j] = newarray[j - gap];
        j -= gap;
      }
      newarray[j] = currentVal;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
    setindex(index + 1);
    setprevarrayhistory((prevarray) => [...prevarray, [...newarray]]);
    setnextarrayhistory((nextarray) => [...nextarray, [...newarray]]);
    setarray([...newarray]);
  }
  setischanging(false);
  setindex(0);
  setdone(true);
}
