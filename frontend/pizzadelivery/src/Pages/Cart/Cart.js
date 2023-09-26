import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deletePizza } from "../../reducers/AddToCart";
import emptyCart from "../../images/emptyCart.png";
import { userOrder } from "../../api/InternalApi";
import { useNavigate } from "react-router-dom";
import { Order } from "../../reducers/OrderReducer";
function Cart() {
  const[pizzaDetails, setPizzaDetails] = useState([])
  const [error, setError] = useState(false);
  const [orderPlace, setOrderPlaced] = useState(false);
  const getPizza = useSelector((state) => state.addToCart.pizzaData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  window.localStorage.setItem("PizzaDetails",JSON.stringify(getPizza));

  const getDeleteData = (event) => {
    const id = event.target.id;
    dispatch(deletePizza(id));
  };

  const countTotal = () => {
    let grandTotal=0;
    for (let i = 0; i < getPizza.length; i++) {
      grandTotal += getPizza[i].count;
    }

    return grandTotal;
  };

  const AddOrderToDatabase = async (event)=>{
    const setpizza = window.localStorage.getItem("PizzaDetails")
    const pizzaObject = JSON.parse(setpizza)
    setPizzaDetails(pizzaObject);
    let response;
    response = await userOrder(pizzaDetails);
    console.log(response);
    if (response) {
      if (response.response && response.response.status === 401) {
        setError(true);
      } else if (response.status === 200) {
        dispatch(Order(response.data.order));
        setError(false);
        setOrderPlaced(true);
        setTimeout(()=>{
          navigate("/user/order")
        },2000)
      }
    }

  }

  return (
    <div>
      <div
        className={`ml-[420px] mt-5 text-3xl ${
          getPizza.length > 0 ? "" : "hidden"
        }`}
      >
        Order Summary
      </div>
      {getPizza.length > 0 ? (
        getPizza.map((getPizza) => (
          <div className="flex justify-center space-x-32 mt-16 w-80 ml-72 shadow-xl">
            <div className="first-Column">
              <div className="w-[200px]">
                <span className="ml-64 font-bold text-2xl">
                  x{getPizza.count}
                </span>
                <img src={`${getPizza.image}`} alt="dancingFajita" />
              </div>
              <div className="PizzaDetails">
                <div>Name: {getPizza.Name}</div>
                <div>Base: {getPizza.base}</div>
                <div>Sauce: {getPizza.sauce}</div>
                <div>Veggies: {getPizza.veggies}</div>
              </div>
              <button
                id={getPizza.id}
                onClick={getDeleteData}
                className="bg-red-600 text-white rounded-lg w-20 mt-5 mb-8 hover:bg-red-400"
              >
                Delete
              </button>
              <div></div>
            </div>
            <div className={`ml-[580px] mt-32 font-bold`}>
              Amount:
              <span className="text-orange-400 text-xl font-bold">
                {getPizza.count * 300}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div>
          <div className="font-bold text-3xl ml-80 mt-14">
            <span className="ml-16">Cart Empty 🙁</span>
            <div className="mt-5 font-bold text-base text-gray-400">
              You proabably haven't ordered a pizza Yet
              <br />
              <span className="ml-8">To Order pizza go to offers page</span>
              <img
                className="-ml-16 mt-5 w-80 "
                src={`${emptyCart}`}
                alt="emptyCart"
              />
            </div>
          </div>
        </div>
      )}
     <div className={`ml-[580px] mt-10 w-48 rounded-md font-bold ${
          getPizza.length > 0 ? "" : "hidden"
        }`}> <span className="text-black">Grand Total :</span><span className="text-orange-500 "> {countTotal()*300}$</span></div>
      <button
        className={`ml-[580px] hover:text-white hover:font-bold shadow-black mb-10 mt-12 bg-orange-500 rounded-lg w-28 h-7 text-white} ${
          getPizza.length > 0 ? "" : "hidden"
        }`}
         onClick={AddOrderToDatabase}
      >
        Order Now
      </button>
      {error?(
        <div className="text-red-500 -mt-5 font-bold ml-[480px] mb-5 text-2xl"> click again on Order Now ❌</div>
      ):(
       null
      )}
      {orderPlace?(
        <div className="text-green-500 -mt-5 font-bold ml-[550px] mb-5 text-2xl">Order placed ✔️</div>
      ):(
        null
      )}
    </div>
  );
}

export default Cart;
