
export const ShiftArray = function<T = number>(list: T[], shiftValue: number = 1,  isDebug: boolean = true): T[] {
    if (list.length === 0) return list;
    if (shiftValue <= 0) {
        console.error(`Shift Value must not be less than zero`);
        return list;
    }

    let temp: T;
    
    if (isDebug) console.log("original\t\t: " + list)
    
    for(let x: number = 0; x < shiftValue; x++)
        for(let e: number = 0; e < list.length - 1; e++){
            temp = list[e];
            list[e] = list[e + 1];
            list[e + 1] = temp;
        }

    if (isDebug)
        console.log("shifted \t\t: " + list)
    return list;
}