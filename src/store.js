import { configureStore } from '@reduxjs/toolkit'
import postsReducer from "./features/posts/PostsSlice"

 const Store =  configureStore({
  reducer: {
    posts:postsReducer
  },
})
export default Store