import { useContext } from 'react'
import TodoListItem from './TodoListItem'
import { TodoContext } from '../shared/todoContext'

function TodoList() {

    const {todos} = useContext(TodoContext);
    // console.log(todos);
  return (
    <>
    {todos.map((todo)=>(<TodoListItem key={todo.id} todo={todo}/>))}
    
    </>
  )
}

export default TodoList