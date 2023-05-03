/* eslint-disable @typescript-eslint/no-inferrable-types */
import React, { useState, memo, useMemo, useEffect } from "react";
export default function MemoizeFunc(): JSX.Element {
  const [num, SetNum] = useState(0);
  const [dark, SetDark] = useState(false);
  const doubleNum: number | undefined = useMemo(() => SlowFunc(num), [num]);
  const themeSt = useMemo(() => {
    return {
      backgroundColor: dark ? "black" : "white",
      color: dark ? "white" : "black",
    };
  }, [dark]);
  useEffect(() => console.log("Theme changed"), [themeSt]);

  return (
    <>
      <input
        type="number"
        value={num}
        onChange={(e) => SetNum(parseInt(e.target.value))}
      />
      <br />
      <button onClick={(e) => SetDark((dr) => !dr)}>Change Mode</button>
      <div style={themeSt}>{doubleNum}</div>
    </>
  );
}

function SlowFunc(num: number = 1): number | undefined {
  console.log("Executing Slow Function");
  for (let i = 1; i <= 1000000; i++) {
    /* empty */
  }
  return num * 2;
}
