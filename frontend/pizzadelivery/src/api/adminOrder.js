import axios from "axios";

// Setting configuration defaults when creating instance
// It is needed , such as Construtor. It tells what if no value is provided ?
//
const api = axios.create({
  baseURL: "http://localhost:8080/admin",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});


export const fetchOrder = ()=>{
    let response;
    try{
        response = api.get('/order');
    }
    catch(e){
        return e;
    }
    return response;
}

export const OrderStatus = async (data)=>{
  let response;
  try{
      response = await api.post('/order/status',data);
  }
  catch(e){
      return e;
  }
  return response;
}