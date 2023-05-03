let arr: number[] = [9, 6, 8, 8, 1, 8, 4, 2, 5, 7];

export function Sort(): void {
  Quicksort(arr);
}

export const Quicksort = (
  list: Array<number>,
  start: number = 0,
  end: number = list.length - 1
): void => {
  // console.log(`list(${list}), start = ${start}, end = ${end} `)
  if (start > end) return;
  const pivot: number = Partition(list, start, end);
  Quicksort(list, start, pivot - 1);
  Quicksort(list, pivot + 1, end);
};

const Partition = function <T = number>(
  list: Array<T>,
  start: number,
  end: number
): number {
  let first: T = list[end];
  let second: number = start;

  for (let n: number = start; n < end; n++) {
    // console.log(`first ${first}, n(${n})`);
    if (list[n] < first) {
      [list[n], list[second]] = [list[second], list[n]];
      second++;
    }
  }

  [list[second], list[end]] = [list[end], list[second]];

  return second;
};
