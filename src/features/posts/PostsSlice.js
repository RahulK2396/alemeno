import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const postsSlice = createSlice({
    name:'posts',
    initialState,
    reducers:{
        postAdded(state,action){
            return action.payload
            // console.log("action.payload",[ );
        }
    }
})

export const {postAdded} = postsSlice.actions


export const selectAllPosts = (state) => state.posts
export default postsSlice.reducer