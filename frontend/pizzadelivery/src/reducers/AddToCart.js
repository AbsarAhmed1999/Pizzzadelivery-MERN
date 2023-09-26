import { createSlice } from "@reduxjs/toolkit";

export const ADD_TO_CART = createSlice({
    name:'ADD_TO_CART',
    initialState:{
        pizzaQuantities:{},
        pizzaData:[]
    },
    reducers:{
        increment: (state,action)=>{
            const {pizzaId} = action.payload;
            if(state.pizzaQuantities[pizzaId] !== undefined){
                state.pizzaQuantities[pizzaId]++;
            }
            else{
                state.pizzaQuantities[pizzaId] = 1;
            }
        },
        decrement: (state,action)=>{
            const {pizzaId} = action.payload;
            if(state.pizzaQuantities[pizzaId] !== undefined && state.pizzaQuantities[pizzaId]>0){
                state.pizzaQuantities[pizzaId]--;
            }
        },   
        setpizzaData:(state,action)=>{
            state.pizzaData = [...state.pizzaData,action.payload];
        },
        deletePizza:(state,action)=>{
            const idToDelete = action.payload ;
            state.pizzaData = state.pizzaData.filter((pizza)=>pizza.id !== idToDelete);
            
        }
    }
})

export const {increment,decrement, setpizzaData,deletePizza} = ADD_TO_CART.actions;

export default ADD_TO_CART.reducer;