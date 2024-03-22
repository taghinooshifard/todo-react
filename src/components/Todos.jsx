import  { useEffect, useReducer } from 'react'
import TodoList from './TodoList';
import { TodoContext } from '../shared/todoContext';
import { todoReducer } from '../hooks/todoReducer';
import NewTodoInput from './NewTodoInput';
import KeepTodoCounter from './KeepTodoCounter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Todos() {
    const[todos,todoDispatcher] = useReducer(todoReducer,[]);
    useEffect(()=>{
        initTodos();
    },[])
    const initTodos = async()=>{
        try {
          let res = await fetch("https://65f55662f54db27bc022ec4a.mockapi.io/todos",{
              method:'GET',
              headers:{"Content-Type": "application/json"}
          });
          if(res.ok){
            
            todoDispatcher({
                type:'init-list',
                todos:await res.json()
            });
            toast("Data loaded from https://mockapi.io",{type:'success',theme:'dark'});
          }
        } catch (error) {
          console.log(error);
        }  
      }
    const addtodoHandler = async(todoTitle)=>{
        
        try {
            let res = await fetch(`https://65f55662f54db27bc022ec4a.mockapi.io/todos`,
          {
            method:'POST',
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify({
              title:todoTitle,
              status:false
            })
          });
          if(res.ok){
            let newtodo = await res.json()
            console.log(newtodo);
             todoDispatcher({
                type:'addtodo',
                todos:newtodo
              });
              toast(`Task ${todoTitle} successfully added   `,{type:'success',theme:'colored'});
          }
        } catch (error) {
            console.log(error);
        }
    }
    const keeptodocounterhandler = ()=>{

        let done = todos.filter((todo)=> todo.status == true).length
        let total = todos.length
        return {done,total}

    }
  return (
    <div className="flex justify-center items-center  bg-stone-600 mb-0">

        <div className="w-3/5 bg-black  rounded-lg flex flex-col justify-center items-center space-y-10 p-10">
            <ToastContainer />
            <KeepTodoCounter {...keeptodocounterhandler()}/>
            <NewTodoInput addtodo={addtodoHandler} />
            <TodoContext.Provider value={{
                todos,
                todoDispatcher
            }}>
            <TodoList/>
            </TodoContext.Provider>
        </div>
    </div>
  )
}

export default Todos