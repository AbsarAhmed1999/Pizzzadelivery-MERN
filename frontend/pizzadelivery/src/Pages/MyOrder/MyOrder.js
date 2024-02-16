import React from "react";
import { useSelector } from "react-redux";
import {
    Link,
  } from "react-router-dom";
function MyOrder() {
    const getOrders = useSelector((state)=>state.Order.response);
    console.log(getOrders)
    // console.log(getOrders.length); // Array
    const formatTime = (dateString) => {
        const options = {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true, // Use 12-hour format (AM/PM)
        };
    
        const formattedTime = new Date(dateString).toLocaleTimeString(undefined, options);
        return formattedTime;
      };

   

  return (
  
<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class=" text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-black">
            <tr>
                <th scope="col" class="py-3">
                    CustomerId
                </th>
                <th scope="col" class="py-3">
                    Pizza Name
                </th>
                <th scope="col" class="py-3">
                    Base
                </th>
                <th scope="col" class=" py-3">
                    Sauce
                </th>
                <th scope="col" class="py-3">
                    Veggies
                </th>
                <th scope="col" class="py-3">
                    QUANTITY
                </th>
                <th scope="col" class=" py-3">
                    Time
                </th>
                <th scope="col" class=" py-3">
                    Image
                </th>
                
            </tr>
        </thead>
        <tbody>
           {getOrders.length>0?(
            getOrders.map((pizza,index)=>(
                
                <>
                <tr>
                <td className="text-blue-500"><Link to={`/user/order/${pizza.CustomerId}`}>{pizza.CustomerId}</Link></td>
                
                <td>{pizza.pizzaDetails.Name}</td>
                <td>{pizza.pizzaDetails.base}</td>
                <td>{pizza.pizzaDetails.sauce}</td>
                <td>{pizza.pizzaDetails.veggies}</td>
                <td>{pizza.pizzaDetails.count}</td>
                <td>{formatTime(pizza.createdAt)}</td>
                <td><img className="w-20" src={`${pizza.pizzaDetails.image}`} alt="pizzaimage"/></td>

                </tr>
                </>
            ))
           ):(
            null
           )}
        </tbody>
    </table>
</div>

  );
}

export default MyOrder;
