import React, { useEffect, useState } from "react";
import { fetchOrder } from "../../api/adminOrder";
import { OrderStatus } from "../../api/adminOrder";

function Admin() {
  const [order, setOrder] = useState([]);

  const getOrder = async () => {
    let response;
    response = await fetchOrder();
    setOrder(response.data.order);
  };
  useEffect(() => {
    getOrder();
  }, []);

  const handleStatusChange= async (e)=>{
    let data = {status: e.target.value,_id:e.target.id};
    let response;
    try{
      response = await OrderStatus(data);
      console.log("InsideHanldeStatuCHnage");
      console.log(response);
    }
    catch(e){
      console.log("Error updating order status",e);
    }

  }

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
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className=" text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-black">
          <tr>
            <th scope="col" className="py-3">
              Order Detail
            </th>
            <th scope="col" className="py-3">
              CustomerID
            </th>
            <th scope="col" className="py-3">
              Status
            </th>
            <th scope="col" className=" py-3">
              Time
            </th>
          </tr>
        </thead>
        <tbody id="orderTableBody">
          {order.length > 0
            ? order.map((order) => (
              <>
                <tr>
                 <td> Name : {order.pizzaDetails.Name}
                  <br />
                  <span>Quantity: {order.pizzaDetails.count} </span>
                  <img className="w-20" src={`${order.pizzaDetails.image}`} alt="pizzaImage" /></td>
                  <td>{order.CustomerId.name}</td>
                  <td>
                  <select name="status" onChange={handleStatusChange} id={order._id} >
                    <option value="order_placed">Order Placed</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="prepared">Prepared</option>
                    <option value="delivered">Delivered</option>
                  </select></td>
                  <td>{formatTime(order.createdAt)}</td>
                </tr>
                </>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
