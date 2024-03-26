import {createSlice} from '@reduxjs/toolkit'

const todoSlice = createSlice({

    name:'todo',
    initialState:{
        todos:[]
    },
    reducers:{
        initList:(state,action)=>{
            // console.log(action);
            state.todos =[... action.payload]
        },
        togglestatus:(state,action)=>{
            state.todos =  [...action.payload]
            // console.log("togglestatus",[...action.payload]);
        },
        addtodo:(state,action)=>{
            state.todos = [...state.todos,action.payload]
        },
        deletetodo:(state,action)=>{
            state.todos = [...action.payload]
        },
        edittodo:(state,action)=>{
            state.todos = [...action.payload]
        }
            
    }
});

export const {initList,togglestatus,addtodo,deletetodo,edittodo} = todoSlice.actions;

export default todoSlice.reducer;