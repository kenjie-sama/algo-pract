import React, { useEffect, useState, useRef, Fragment, MutableRefObject, useReducer, FormEvent, ChangeEvent, FC, FormEventHandler } from "react";
// import { Collections, SampleLQ, SampleDQ, SampleEQ, SamplePK, lq } from "./algo/datastructures/Queue";

// UI OF Anagram Inputs
/*let queueSize: React.RefObject<HTMLInputElement>; 
const inputStyle = { width: "100%", height: "auto", margin: "10px 0" };
const formStyle = { maxWidth: "300px", height: "auto", padding: "0px" };

const minute: number = 1000 * 60;
const date: Date = new Date();
let x: number = 0;
SampleLQ(Math.floor(2));

const OnEnqueue = (e: React.FormEvent):void => {
    e.preventDefault();
    console.log("-----------OnEnqueue-----------");
}
const OnDequeue = (e: React.FormEvent):void => {
    e.preventDefault();
    console.log("-----------OnDequeue-----------");
}

const OnePeek = (e: React.FormEvent):void => {
    e.preventDefault();
    console.log("-----------OnPeek-----------");
}

export function QueueForm () {
    queueSize = useRef<HTMLInputElement>(null); 

    const [value, SetValue] = useState<number>(20);
    const [size, SetSize] = useState<number>(2);
    
   
    let newResult = useRef("Click Create to Create Queue with the given size (min: 2, max: 200).");
    const OnCreate = (e: any, size: number):void => {
        e.preventDefault();
        console.log("-----------OnCreate-----------");
        SampleLQ(Math.floor(size));
    }

    const ChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val: number = parseInt(e.target.value);
        const max: number = parseInt(e.target.max);
        const min: number = parseInt(e.target.min);
        if (val <= max && val >= min) 
            SetSize(val);
    }

    console.log("Form Run: " + x++)

    return ( 
        <Fragment>
            <form style={formStyle} >
                <fieldset>
                    <legend>Anagram Checker</legend>
                    <input ref={queueSize} type="number" min={2} max={200} value={size} style={inputStyle} onChange={e => ChangeHandler(e)} placeholder="Enter Queue Size..."/>
                    <button style={inputStyle} onClick={(e) => OnCreate(e, size)}>Create</button>
                    <br/>
                    <input type="number" style={inputStyle} value={value} placeholder="Enter Number to ..." onChange={e => SetValue(e.target.valueAsNumber)}/>
                    <br/>
                    <button style={inputStyle} onClick={ OnEnqueue }>Enqueue</button>
                    <button style={inputStyle} onClick={ OnDequeue }>Dequeue</button>
                    <button style={inputStyle} onClick={ OnePeek }>Peek</button>
                </fieldset>
                <p style={{ textAlign: "center" }}>{newResult.current}</p>
                
            </form>
            <QueueTable size={size}/>
        </Fragment>
    );
}




function QueueTable(props: {size: number}){
    console.log("Table Run");
    return (
        <table border={3} cellPadding={10} width="300px">
            <thead>
                <tr>
                    <th colSpan={2}>COLLECTION</th>
                </tr>
            </thead>
            <tbody>
                { [...Array(props.size)].map((v, i) => <QueueData index={i} val=""/>) }
            </tbody>
            <tfoot>
                <tr>
                    <td width="50%" align="center">Front: {lq?.GetFront()}</td>
                    <td width="50%" align="center">Rear: {lq?.GetRear()}</td>
                </tr>
                <tr>
                    <td width="50%" align="center" colSpan={2}>Size: {props.size}</td>
                </tr>
            </tfoot>
        </table>
    )
}

function QueueData(props: {index: number, val: string}){
    const rand2 =  Math.floor((Math.random() * 123456789) + 1);
    let keyDate = Math.round(date.getTime() / minute );
    return (
        <tr  id={(props.index).toString()} key={props.index}>
            <td id={(keyDate + (props.index + 1) + rand2).toString()} key={keyDate + (props.index + 1) + rand2} width="50%" align="center">{props.index}</td>
            <td id={(keyDate + rand2).toString()} key={keyDate + rand2} width="50%" align="center">{undefined}</td>
        </tr>
    );
}*/


// enum Actions{ INC = "Increase", DEC = "Decrease" }
// const initial = { count: 0}
// type State = typeof initial
// function red(state: State, action: Actions) {
//     switch(action){
//         case Actions.INC:
//             return { count: state.count + 1}
//         case Actions.DEC:
//             return { count: state.count - 1}
//         default:
//             throw new Error();
//     }
// }

// export const ReduxInput = () => {
//     const [state, dispatch] = useReducer(red, initial)

//     return (
//         <>
//             <button onClick={() => dispatch(Actions.DEC)}>-</button>
//             <span> {state.count} </span>
//             <button onClick={() => dispatch(Actions.INC)}>+</button>
//         </>
//     );
// }
// type TodoType = {
//     time: string, 
//     username: string,
//     complete: boolean
// }
// enum Actions{
//     ADD = "AddTodo",
//     S_NAME = "SetName",
//     S_PASS = "SetPass"
// }
// type StateType = {
//     date: string, 
//     name: string,
//     password: string
// }
// type ActionType = {
//     type: Actions, 
//     payload: string
// }

// const inital: StateType = {
//     date: "",
//     name: "",
//     password: ""
// }
// type StateType = {
//     date: string, 
//     name: string,
//     password: string
// }
// type ActionType = {
//     type: Actions, 
//     payload: string
// }

// const inital: StateType = {
//     date: "",
//     name: "",
//     password: ""
// }

// // function Reducer(state: any[], action: Actions): any[] {
// //     return [...state, NewTodo(user)]
// // }

// function Reducer(currState: StateType, action: ActionType){
//     switch(action.type){
//         case Actions.S_NAME: return {...currState, name: action.payload, };
//         case Actions.S_PASS: return  {...currState, password: action.payload, };
//         default: throw new Error();
//     }
// }
// const NewTodo = (user: string): {} => ({ time: Date.now(), user: user, complete: false })

// export const ReduxInput = () => {
//     const [todos, Dispatch] = useReducer(Reducer, inital)
//     const [userName, SetUserName] = useState<string>("");

//     const ChangeHandler = (e: ChangeEvent<HTMLInputElement>, type: Actions) => {
//         Dispatch({type: type, payload: e.target.value});
//     }

//     const SubmitHandler = (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         console.log(todos);
//         SetUserName("")
//     }

//     return (
//         <form onSubmit={SubmitHandler}>
//             <input type="text" 
//                 onChange={e => ChangeHandler(e, Actions.S_NAME)}
//                 placeholder="Enter Username..." />
//             <br/>
//             <input type="password" 
//                 onChange={e => ChangeHandler(e, Actions.S_PASS)}
//                 placeholder="Enter Password..."/>
//             <br/>
//             <br/>
//             <input type="submit"/>
//         </form>
//     );
// }
enum Actions{
    S_USERN = "username",
    S_PASSW = "password"
}

type LoginAction = {
    type: string,
    payload: string
}

type StateType = {
    id: number,
    name?: string,
    password?: string
}

const initalState: StateType = {
    id: Date.now(),
    name: "",
    password: ""
}

// const newState = (action: ActionType): StateType => {
//     return {
//         id: Date.now(), 
//         name: action.payload, 
//         password: 
// }
    
const Reducer = (state: StateType, login: LoginAction): StateType => {
    let newState: StateType = { id: Date.now() }
    switch(login.type){
        case Actions.S_USERN:
            return {...state, ...newState, name: login.payload}
        case Actions.S_PASSW:
            return {...state, ...newState, password: login.payload}
        default:
            throw new Error();
    }
}

export const ReduxInput = (): JSX.Element => {
    const [userInfo, DispatchInfo] = useReducer(Reducer, initalState);

    const SubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        console.log(userInfo)
    }
    
    const ChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, action: Actions): void => {
        DispatchInfo({type: action, payload: e.target.value});
    }
    return (
        <div style={{width: "40%"}} >
            <form onSubmit={SubmitHandler}>
                <input type="text" onChange={e => ChangeHandler(e, Actions.S_USERN)} style={{width: "100%" }}/>
                <br/>
                <br/>
                <input type="password" onChange={e => ChangeHandler(e, Actions.S_PASSW)}  style={{width: "100%" }}/>
                <br/>
                <br/>
                <input type="submit" style={{width: "100%" }} />
            </form>
            <br/>
            <TableData name="" pass=""/>
        </div>
    );
}

const TableData = (props:{ name?: string , pass?: string }): JSX.Element => {
    return (
        <table border={1} width="100%">
            <thead>
                <tr>
                    <td colSpan={2} align="center">User Info</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="center">Username: {props.name}</td>
                    <td align="center">Password: {props.pass}</td>
                </tr>
            </tbody>
        </table>
    );
}