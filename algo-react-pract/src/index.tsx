import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom/client";
// import { InputText } from './algo/algorithms/Anagrams';
// import { FirstLastPos } from "./algo/algorithms/FirstLastPos";
// import { Sort } from "./algo/algorithms/Sorting";
// import * as st from "./algo/datastructures/Stack";
// import * as qu from "./algo/datastructures/Queue";
// import {Collections} from "./algo/datastructures/Queue"
// import { TestStr as TestStack } from "./algo/Practice/StackPract"
// import { Test } from "./algo/Practice/DynamicProgramming/Fibonacci"
// import {Test as TestTree} from "./algo/datastructures/Tree"
// import { FirstNonRepeatingChar, FirstRepeatedChar, MostRepeated, CountPairsWithDiffMap, TwoSumArr, TwoSumMap, TestHashmap } from './algo/datastructures/Linear/Map';
// import {testUnaryTree} from "./algo/datastructures/IterablePract"
// import { ReduxInput } from "./algoInput";
// import Reduction from "./reduction"
// import MemoizeFunc from './memoization';
// import { Mathf, Flipper, Matrix } from './algo/algorithms/Mathf';
// import { Vector2, Vector3 } from './algo/algorithms/Vector';
import {
  TestBST,
  TestBFS,
} from "./algo/datastructures/Non-Linear/BinarySearchTree";

import TestEditor from "./algo/designPatterns/Memento/Editor";
import CanvasTest from "./algo/designPatterns/StatePattern/Canvas";
const Sample = React.lazy(() => import("./advance"));

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AlgoFunc />
  </React.StrictMode>
);

// FirstNonRepeatingChar("A green APPLE", true );
// console.log(FirstRepeatedChar("Green APPle"))
// testUnaryTree();
// MostRepeated()
// CountPairsWithDiffMap();
// TwoSumArr();
// TwoSumMap();
// TestHashmap();

// TestTree()
// TestStr();
// Test();

// TestBST()
// TestBFS();
// TestEditor();
CanvasTest();
function AlgoFunc() {
  return <Fragment>{/* <Test /> */}</Fragment>;
}

/* QUEUE Test
let q: Collections.Generic.CircularQueue<number> = new Collections.Generic.CircularQueue<number>(3, true)

function Test(): JSX.Element{
  const [result, setValue] = useState(0);
  const OnEQ = function (e: React.MouseEvent){
    e.preventDefault();
    q.EQ(result);
  }
  const OnDQ = function (e: React.MouseEvent){
    e.preventDefault();
    q.DQ();
  }

  const OnCK = function (e: React.MouseEvent){
    e.preventDefault();
    console.log(q.GetQueue());
    console.log(q.GetIndices());
  }
  return(
    <>
      <form>
        <input type="number" value={result} onChange={e => setValue(e.target.valueAsNumber)} min={0} max={20}/>
        <br/> <br/>
        <button onClick={e => OnEQ(e)}>Enqueue</button>
        <br/> <br/>
        <button onClick={OnDQ}>Dequeue</button>
        <br/> <br/>
        <button onClick={OnCK}>Check</button>
      </form>
    </>
  );
}*/

// Matrix, Mathf and Vector Test
/*function Tests(): void{
  const v2_pos1: Vector2 = new Vector2(1, 3);
  const v2_pos2: Vector2 = new Vector2(4, 5);
  const v3_pos1: Vector3 = new Vector3(1, 2, 3);
  const v3_pos2: Vector3 = new Vector3(4, 5, 6);
  const distance1: number = 10;
  const distance2: number = 4;
  const angle: number = 45;
  const flipper: Flipper = new Flipper(1, 5);

  console.log("V3-EuclideanDistance: " + Mathf.EuclideanDistance(v3_pos1, v3_pos2))
  console.log("V2-EuclideanDistance: " + Mathf.EuclideanDistance(v2_pos1, v2_pos2));
  console.log("DistanceDotProduct: " + Mathf.DistanceDotProduct(distance1, distance2, angle));
  console.log("Magnitude: " + v2_pos1.magnitude);
  console.log("Clamp: " + Mathf.Clamp(9, 0, 5));
  console.log("Clamp01: " + Mathf.Clamp01(-10));
  console.log("Cross: " + Mathf.CrossProduct(v3_pos1, v3_pos2));
  console.log("CrossVector3: " + Vector3.CrossProduct(v3_pos1, v3_pos2).ToString());
  console.log("Cross: " + Mathf.CrossProduct(v2_pos1, v2_pos2));
  console.log("ToVector3: " + Vector2.ToVector2([3,2,10,6]).ToString());
  const matrix: Matrix = new Matrix(2, 3, [[1, 2, 3], [4, 5, 6]]);
  const matrix2: Matrix = new Matrix(3, 4, [[7, 8, 9, 10], [11, 12, 13, 14], [15, 16, 17, 18]]);
  const matrix3: Matrix = matrix.Multiply(matrix2);
  const matrix4: Matrix = new Matrix(2, 3, [[10, 10, 10], [10, 10, 10]]);
  const matrix2 : Matrix = new Matrix(3, 2, [
    [3, 3], 
    [2, 2], 
    [7, 7]]);  
  console.log("matrix1")
  console.log(matrix.GetArray())
  console.log("matrix4")
  console.log(matrix4.GetArray())
  console.log("matrix1 + matrix4")
  console.log(matrix.MatrixSub(matrix4).GetArray())
  console.log("matrix2")
  console.log(matrix2.GetArray())
  console.log(matrix3.GetArray())
  console.log(matrix3.Populate([[0,0,0,0], [0,0,0,0]]))
  Populate([[1, 4, 5], [1,3, 6]])
  matrix.Mult([[2, 3, 1, 2], [0, 9, 1, 2], [1, 5, 1, 2]]);
}*/
