import React, { Fragment, useState, useReducer, useEffect, useContext, createContext, FormEvent, memo } from "react"
import ReactDom from "react-dom/client"
enum Actions{
    ADD_TODO = "addTodo",
    DEL_TODO = "deleteTodo",
    TGL_TODO = "toggleTodo",
}
type ActionType = {
    type: string,
    payload: {
        username: string,
        id: number,
    }
}
type TodoType = {
    id: number,
    username: string,
    complete: boolean
}
let initialState: TodoType[] = [];

function NewTodo(todos: TodoType[], username: string): TodoType[]{
    const newTodo: TodoType = { 
        id: Date.now(),
        username: username,
        complete: false,
    }
    return [...todos, newTodo];
}

// function ToggleTodo(todos: TodoType[], id: number, username: string): TodoType[]{
//     const newTodo: TodoType[] = 
//     return [...todos, newTodo];
// }


function Reducer(todos: TodoType[], action: ActionType): TodoType[] {
    switch(action.type){
        case Actions.ADD_TODO:
            return NewTodo(todos, action.payload.username);
        case Actions.TGL_TODO:
            return todos.map(td => {
                if(td.id === action.payload.id)
                    return { ...td, complete: !td.complete }
                return td;
            })
        case Actions.DEL_TODO:
            return todos.filter(td => td.id !== action.payload.id);
        default:
            return todos;
    }
}

const DispatchContext: any = createContext<any>(undefined);

export default function Reduction(): JSX.Element {
    const [todos, Dispatch] = useReducer(Reducer, initialState)
    const [username, SetUsername] = useState("")

    function SubmitHandler(e: FormEvent){
        e.preventDefault()
        const newState: ActionType = { type: Actions.ADD_TODO, payload: { username: username, id: Date.now() } }
        Dispatch(newState)
        SetUsername("")
        console.log(todos)
    }

    return (
        <DispatchContext.Provider value={Dispatch}>
            <form onSubmit={SubmitHandler}>
                <input 
                    type="text" 
                    value={username} 
                    onChange={e => SetUsername(e.target.value)} 
                    placeholder="Enter Username"/>
            </form>
            {todos.map( todo => <Todo todo={todo}/>)}
        </DispatchContext.Provider>
    );
}

function Todo(props: {todo: TodoType} ): JSX.Element{
    const disp: any = useContext(DispatchContext);
    const Add = () => {
        disp({
            type: Actions.TGL_TODO, 
            payload: { 
                ...props.todo, 
                id: props.todo.id 
            }
        })
    }

    const Delete = () => {
        disp({
            type: Actions.DEL_TODO, 
            payload: { 
                ...props.todo, 
                id: props.todo.id 
            }
        })
    }
    return (
        <div key={props.todo.id }>
            <span style={{ color: props.todo.complete ? "#AAA" : "#000", width: "100%"}}>
                ({props.todo.id})
                {" "+ props.todo.username}
            </span>
            <button 
                style={{margin: "0px 10px" }} 
                onClick={Add}>
            Toggle    
            </button>
            <button 
                style={{margin: "0px 10px"}}
                onClick={Delete}>Delete</button>
        </div>
    );
}
memo(Todo)