import React from 'react'

function KeepTodoCounter({done,total}) {
  return (
    <div className="w-3/5 bg-black  rounded-3xl border border-gray-500 flex justify-around items-center p-10">
    <div className="flex flex-col space-y-3 justify-center items-start">
        <p className="text-3xl text-gray-200 font-bold">Todo Done</p>
        <p className="text-gray-200 text-2xl">keep it up</p>
    </div>
    <div className="bg-orange-600 rounded-full p-10">
        <p className="text-3xl font-bold">{done}/{total}</p>
    </div>
</div>
  )
}

export default KeepTodoCounter;
