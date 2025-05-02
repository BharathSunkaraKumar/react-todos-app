import { useReducer, useState } from "react"
import './TodoList.css'

const reducer = (state, action) => {
    if(action.type === 'ADD_TODO') {
        console.log(action.payload=='')
        if(action.payload == '') {
            return {
                ...state
            }
            
        }else{
            return {
                ...state,
                todos:[...state.todos, {text: action.payload, id: new Date().getTime().toString()}]
            }
        }
        
    }
    if(action.type === 'DELETE_TODO') {
        let newTodos = state.todos.filter((eachTodo) => {
            return eachTodo.id !== action.payload
        })
        console.log(newTodos)
        return{
            ...state,
            todos:[...newTodos]
        }
    }

    if(action.type === 'EDIT_TODO') {
        return{
            ...state,
            isEditing : action.payload
        }
    }

    if(action.type === 'UPDATE_TODO') {
        let newTodos = state.todos.map((eachTodo) => {
            if(eachTodo.id == state.isEditing.id) {
                return{
                    text: action.payload,
                    id: state.isEditing.id
                }
            }else{
                return eachTodo
            }
        })
        console.log(newTodos)
        return {
            ...state,
            todos:[...newTodos]
        }
    }

    return state
}

function TodoList() {
    const [input, setInput] = useState('')
    const initialState = {
        todos: [],
        isEditing: {
            status: false,
            id: ''
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState)
    const hangleInput = (e) => {

        let box = document.getElementById('box')
        setInput(
            box.value
        )
        
       
    }
    const handleAdd = () => {
        dispatch({
            type: 'ADD_TODO',
            payload: input
        })
        let box = document.getElementById('box')
        setInput(
            box.value = ''
        )
    }
    const handleDelete = (id) => {
        dispatch({
            type: 'DELETE_TODO',
            payload: id
        })
    }
    const handleEdit = (id) => {
        dispatch({
            type: 'EDIT_TODO',
            payload: {
                status: true,
                id: id
            }
        })
        let editTodo = state.todos.find((todo) => {
            return todo.id == id
        })
        console.log(editTodo)
        setInput(
            document.getElementById('box').value = editTodo.text
        )
    }
    const handleEditing = () => {
        console.log(state.isEditing)
        dispatch({
            type: 'UPDATE_TODO',
            payload: input
        })
        setInput(
            box.value = ''
        )
        dispatch({
            type: 'EDIT_TODO',
            payload: {
                status: false,
                id: "id"
            }
        })
    }
  return (
    <div className="container">
        <h1 className="title">TodoList</h1>
        <div className="input-form">
            <input id="box" type="text"  onChange={(e)=>hangleInput(e)} placeholder="Enter todos"/>
            {state.isEditing?.status ? (<button style={{backgroundColor: 'mediumseagreen', color: 'darkblue', border: '1px dashed'}} onClick={handleEditing}>Edit</button>):
            (<button onClick={handleAdd}>Add</button>)
            }
        </div>
        
        <div className="continaer-item">
        {state.todos.length==0 && <p className="no-list">Enter Todos..</p>}
        {
            state.todos.length > 0 && state.todos.map((todo) => {
                const {text, id} = todo
                return(
                    <div className="items" key={id}>
                        <div>
                            <i>{text}</i>
                        </div>
                        <div className="item-buttons">
                        <button className="delete" onClick={()=>handleDelete(id)}>Delete</button>
                        <button className="edit" onClick={()=>handleEdit(id)}>Edit</button>
                        </div>
                    </div>
                )
            })
        }
        </div>
    </div>
  )
}

export default TodoList