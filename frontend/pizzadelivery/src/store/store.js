import {configureStore} from '@reduxjs/toolkit'
import loginReducer from '../reducers/authreducers';
import addToCartReducer from '../reducers/AddToCart';
import OrderReducer from '../reducers/OrderReducer';
export default configureStore({
    reducer:{
        login: loginReducer,
        addToCart: addToCartReducer,
        Order: OrderReducer
    },
})

