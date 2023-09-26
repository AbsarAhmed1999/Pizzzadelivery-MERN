import { createSlice } from "@reduxjs/toolkit";

export const OrderReducer = createSlice({
    name: 'Order',
    initialState:{
        response:[]
    },
    reducers:{
        Order: (state,action)=>{
            state.response = action.payload;
            
        }
    }
})


export const {Order} = OrderReducer.actions;

export default OrderReducer.reducer;