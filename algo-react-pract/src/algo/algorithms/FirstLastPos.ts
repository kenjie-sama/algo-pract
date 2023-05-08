/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
const arr: number[] = [9, 6, 8, 8, 1, 8, 4, 2, 7, 2, 7];
const target: number = 2;
export const FirstLastPos = (): void => {
  const newArr: number[] = arr.sort();
  let start: number = -1,
    end: number = -1;
  arr.forEach((el) => {
    console.log(`${el} ${typeof el}`);
    if (el == target) start = el;
  });
  console.log(start);
};
