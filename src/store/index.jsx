import { configureStore } from '@reduxjs/toolkit'
import todoRducer from './slice/todoslice'

const store = configureStore({
    reducer:{
        todo:todoRducer
    }
})

export default store;