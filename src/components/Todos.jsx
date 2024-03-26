import  { useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { addtodo, initList } from '../store/slice/todoslice';
import TodoList from './TodoList';
import NewTodoInput from './NewTodoInput';
import KeepTodoCounter from './KeepTodoCounter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Todos() {
    // const[todos,todoDispatcher] = useReducer(todoReducer,[]);
    const todos = useSelector((state)=>{
      // console.log(state);
      return state.todo.todos
    })
    const dispatch = useDispatch()
    useEffect(()=>{
        initTodos();
    },[])
    const initTodos = async()=>{
        try {
          const url = new URL('https://65f55662f54db27bc022ec4a.mockapi.io/todos');
          url.searchParams.append('sortBy', 'id');
          url.searchParams.append('order', 'desc'); 
          let res = await fetch(url,{
              method:'GET',
              headers:{"Content-Type": "application/json"}
          });
          if(res.ok){
            let loadedtodos = await res.json();
            // console.log('loadedtodos',loadedtodos);
            dispatch(initList(loadedtodos))
            toast("Data loaded from https://mockapi.io",{type:'success',theme:'dark'});
          }
        } catch (error) {
          console.log(error);
        }  
      }
    const addtodoHandler = async(todoTitle)=>{
        
        try {
          const url = new URL('https://65f55662f54db27bc022ec4a.mockapi.io/todos');
          url.searchParams.append('sortBy', 'id');
          url.searchParams.append('order', 'desc'); 
            let res = await fetch(url,
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
            // console.log(newtodo);
            dispatch(addtodo(newtodo));

            toast(`Task ${todoTitle} successfully added   `,{type:'success',theme:'colored'});
          }
        } catch (error) {
            console.log(error);
        }
    }
    const keeptodocounterhandler = ()=>{
        
        let done = todos.filter((todo)=> todo?.status == true).length
        let total = todos.length
        return {done,total}

    }
  return (
    <div className="flex justify-center items-center  bg-stone-600 mb-0">

        <div className="w-3/5 bg-black  rounded-lg flex flex-col justify-center items-center space-y-10 p-10">

            <KeepTodoCounter {...keeptodocounterhandler()}/>
            <NewTodoInput addtodo={addtodoHandler} />
            <TodoList/>
            <ToastContainer />

        </div>
    </div>
  )
}

export default Todos