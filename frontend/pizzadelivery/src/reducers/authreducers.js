import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name:'login',
    initialState:{
        isAuth: false,
        id:undefined,
        role:'',
    },
    reducers:{
        isLoggedIn: (state,action)=>{
            state.isAuth = action.payload.auth;
            state.id = action.payload;
            state.role = action.payload.role
        },
        isLoggedOut:(state)=>{
            state.isAuth = false

        }   
    }
})

export const {isLoggedIn,isLoggedOut} = loginSlice.actions;

export default loginSlice.reducer;