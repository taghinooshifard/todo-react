import TodoListItem from './TodoListItem'
import {useSelector} from 'react-redux'

function TodoList() {

    const todos = useSelector((state)=>state.todo.todos)
    // console.log(todos);
  return (
    <>
    {(todos!=null && todos.length>0) ? todos.map((todo)=>(<TodoListItem key={todo.id} todo={todo}/>)):  ""}
    
    </>
  )
}

export default TodoList