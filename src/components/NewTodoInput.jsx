import { useRef, useState } from "react"


function NewTodoInput({addtodo}) {
    const[text,setText] = useState('')
    const myTextref = useRef(null)
  return (
    <div className="w-3/5 grid grid-cols-6 gap-4">
                <input ref={myTextref} type='text' onChange={(event)=>{setText(event.target.value)}} className="bg-stone-800 font-bold text-2xl text-gray-400 px-3 py-2 rounded-3xl col-span-5" placeholder="write your next task"/>
                <div onClick={()=>{
                    if(text!=''){
                        addtodo(text)
                        myTextref.current.value = ''
                    }
                    
                }} className="bg-orange-600 rounded-full text-center hover:bg-orange-300">
                    <p className="text-black font-bold text-3xl p-3 cursor-pointer">
                        +
                    </p>    
                </div>
    </div>
  )
}

export default NewTodoInput