import { useContext, useRef, useState } from 'react';
import { TiPencil, TiTrash,TiTickOutline } from 'react-icons/ti'
import { TodoContext } from '../shared/todoContext';
import { ToastContainer, toast } from 'react-toastify';

function TodoListItem({todo}) {
  const {todos,todoDispatcher} = useContext(TodoContext)
  const [editmode,setEditmode] = useState(false)
  const [text,setText] = useState('')
  const myref = useRef()
  const toggleStatus = async ()=>{
    try {
      let res = await fetch(`https://65f55662f54db27bc022ec4a.mockapi.io/todos/${todo.id}`,
      {
        method:'PUT',
        headers:{"Content-Type": "application/json"},
        body:JSON.stringify({
          id:todo.id,
          title:todo.title,
          status:!todo.status
        })
      });
      if(res.ok){
        let newtodos = todos.map((todoitem)=>{
            if(todoitem.id == todo.id)
                todoitem.status = !todoitem.status;
            return todoitem;
        })
        todoDispatcher({
            type:'toggle-status',
            todos:newtodos
          });
          toast(`status successfully changed `,{type:'success',theme:'dark'});
      }
      
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  } 
  const deletetodoHandler = async ()=>{
    try {
      let res = await fetch(`https://65f55662f54db27bc022ec4a.mockapi.io/todos/${todo.id}`,
      {
        method:'DELETE',
        headers:{"Content-Type": "application/json"},
        body:JSON.stringify({
          id:todo.id
        })
      });
      if(res.ok){
        let newtodos = todos.filter((todoitem)=>{
            if(todoitem.id != todo.id)
                return todoitem;
            
        })
        todoDispatcher({
            type:'deletetodo',
            todos:newtodos
          });
          toast(`Task successfully delete  ${text}`,{type:'error',theme:'colored'});
      }
      
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  const editTodo = async ()=>{
    try {
      let res = await fetch(`https://65f55662f54db27bc022ec4a.mockapi.io/todos/${todo.id}`,
      {
        method:'PUT',
        headers:{"Content-Type": "application/json"},
        body:JSON.stringify({
          id:todo.id,
          title:text,
          status:todo.status
        })
      });
      if(res.ok){
        let newtodos = todos.map((todoitem)=>{
            if(todoitem.id == todo.id)
                todoitem.title = text;
            return todoitem;
        })
        todoDispatcher({
            type:'edittodo',
            todos:newtodos
          });
        
        toast(`Title successfully change to  ${text}`,{type:'success',theme:'dark'});
        setText('')
      }
      
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
    <div className="w-3/5 bg-stone-600  rounded-3xl border border-gray-500 flex justify-between items-center p-4">
                <div className="flex gap-2">
                    <div key={todo.id}
                      onClick={toggleStatus}
                     className={`border  ${todo.status ? `bg-green-600`:`border-orange-600`}  rounded-full p-5 cursor-pointer`}></div>
                    {!editmode && (<p className={`text-3xl text-white ${todo.status && `line-through`}`}>{todo.title}</p>)}
                    <input ref={myref} onChange={(event)=>setText(event.target.value)} type='text' className={`bg-stone-800 font-bold text-2xl text-gray-400 px-3 py-2 rounded-3xl col-span-5 ${!editmode && 'hidden'}`} placeholder="write your next task"/>
                </div>
                <div className="flex text-3xl text-stone-400 font-thin">
                
                {editmode ? 
                (<TiTickOutline onClick={()=>{
                  setEditmode(false);
                  
                  if(text!=''){
                    editTodo();
                  }

                }} className="hover:text-white cursor-pointer"/>):
                 (<TiPencil onClick={()=>{
                  setEditmode(true)
                  setText(todo.title)
                  myref.current.value = todo.title
                  
                 }} className="hover:text-white cursor-pointer"/>)}
                {!editmode && (<TiTrash onClick={deletetodoHandler} className="hover:text-white cursor-pointer"/>)}
                 
                </div>
            </div>
    </>
  )
}

export default TodoListItem