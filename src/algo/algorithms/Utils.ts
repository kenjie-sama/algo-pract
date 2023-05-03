import React from "react"


type RangeType =  { [Symbol.iterator]: () => Object, Next:() => NextType }
type NextType =  { done: boolean, value: number }

export function Range(start: number, end: number, step: number = 1) {
    return {
        [Symbol.iterator]() { return this },
        Next() {
            if(start < end){
                start += step
                return { done: false, value: start }
            }
            return { done: true, value: end }
        }
    }
} 