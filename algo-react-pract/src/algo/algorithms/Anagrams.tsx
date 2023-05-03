import React,{ useState } from "react";


export const Anagrams = function (text1: string, text2: string): string{
    if(!EqualLength(text1, text2)) 
        return `${text1} and ${text2} are "NOT ANAGRAMS"`;
    
    const charFreq = new Map<string, number>();

    SetFrequencies(text1, charFreq, 1);
    SetFrequencies(text2, charFreq, -1);

    if(!IsZero(charFreq))
        return `${text1} and ${text2} are "NOT ANAGRAMS"`;

    return `${text1} and ${text2} are "ANAGRAMS"`;
}

export const AreAnagrams = function (text1: string, text2: string): boolean{
    if(!EqualLength(text1, text2)) return false
    return Sort(text1) !== Sort(text2);
}


const SetFrequencies = (text: string, dict: Map<string, number>, incrementor: number = 1): void => {
    for(const char of text){
        const HasChar = ():boolean => dict.has(char);
        const key: number = dict.get(char) as number;
        dict.set(char, HasChar() ? key + incrementor || 0: 1);
    }
}

const IsZero = (dict: Map<string, number>): boolean => {
    let bool: boolean = true;
    dict.forEach((value, key)=>{
        console.log(`${key} , ${value} == 0: ${value === 0}`)
        if(value !== 0) {
            bool = false;
            return;
        }
    });
    return bool;
 }

const Sort = (text: string):string => text.split("").sort().join("");

const EqualLength = (text1: string, text2: string): boolean => text1.length === text2.length;




// UI OF Anagram Inputs
export function InputText () {
    const inputStyle = { width: "100%", height: "auto", margin: "10px 0" };
    const formStyle = { maxWidth: "300px", height: "auto", padding: "0px" };

    const [result1, SetValue1] = useState("danger");
    const [result2, SetValue2] = useState("garden");
    const [result3, SetValue] = useState("Click Submit to check if the given inputs are Anagrams NOTE: (Case-sensitive)");

    let result = "";
    const OnSubmitHandler = (e: React.FormEvent):void => {
        e.preventDefault();
        result = Anagrams(result1, result2);
        SetValue(result);
        console.log(result);
    }

    return ( 
        <form onSubmit={OnSubmitHandler} style={formStyle}>
            <fieldset>
                <legend>Anagram Checker</legend>
                <input type="text" style={inputStyle} value={result1} placeholder="Enter Word 1..." onChange={(e)=>SetValue1(e.target.value)}/>
                <br/>
                <input type="text" style={inputStyle} value={result2} placeholder="Enter Word 2..." onChange={(e)=>SetValue2(e.target.value)}/>
                <br/>
                <input type="submit" style={inputStyle}/>
            </fieldset>
            <p style={{ textAlign: "center" }}>{result3}</p>
        </form>
    );
}

