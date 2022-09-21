import React, {useReducer, useState} from 'react'
import Todo from './Todo'

export const ACTIONS = {
  ADD_TODO: 'add-todo',
  DELETE_TODO: 'delete-todo',
  TOGGLE_COMPLETE: 'toggle-complete'
}

const reducer = (todos, action) => {
//reducer takes state - current state - where the application is currently at and an action which is 
// and it takes action - which is what is passed to dispatch function , so when dipatch is called it will be the action variable
//reducer updates the state
  switch(action.type) {
    case ACTIONS.ADD_TODO:
      //to add a todo:
      const todo = action.payload.name
      console.log('this is the log',todo)
      return [...todos, newTodo(todo)]
    case ACTIONS.TOGGLE_COMPLETE: 
      return todos.map(todo => { 
        if(todo.id === action.payload.id) {
          return {...todo, complete: !todo.complete}
        }
        return todo
      })
    case ACTIONS.DELETE_TODO: 
      return todos.filter(todo => todo.id !== action.payload.id)
    default: 
      return todos
  }

}

const newTodo = (name) => {
  //return a todo object: (needs an id, a name and whether the todo is complete or not)
  return {id: Date.now(), name: name, complete: false}
}


export default function App() {

  const [todos, dispatch] = useReducer(reducer, [])
  //dispatch updates state by calling the reducer function
  const [name, setName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } })
//payload is an object that contains all the variable values we need to perform the action in ACTIONS
//which is in this case the name that is equal to the name in the useState const above
  setName('')
  }

  console.log(todos)

	return (
		<>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={e => setName (e.target.value)}></input>
      </form>
      {todos.map(todo => {
        return <Todo key={todo.id} todo={todo} dispatch={dispatch}></Todo>
      })}
		</>
	)
}

//Below just for a simple count app: 
// const ACTION = {
//   DECREMENT: 'decrement',
//   INCREMENT: 'increment'
// }

// const reducer = (state, action) => {
// //reducer takes state - current state - where the application is currently at and an action which is 
// // and it takes action - which is what is passed to dispatch function , so when dipatch is called it will be the action variable
// //reducer updates the state
//   switch (action.type) {
//     case ACTION.INCREMENT: 
//       return { count: state.count + 1 }
//     case ACTION.DECREMENT: 
//       return {count: state.count - 1}
//     default:
//       return state
//   }
// }


// export default function App() {
//   const [state, dispatch] = useReducer(reducer, {count: 0})
//   //dispatch updates state by calling the reducer function

// 	function increment() {
// 		dispatch({ type: ACTION.INCREMENT })
// 	}

// 	function decrement() {
//     dispatch({ type: ACTION.DECREMENT })
//   }	

// 	return (
// 		<>
// 		<button onClick={decrement}>-</button>
// 		<span>{state.count}</span>
// 		<button onClick={increment}>+</button>
// 		</>
// 	)
// }