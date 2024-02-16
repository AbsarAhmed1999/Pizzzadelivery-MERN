import axios from "axios";

// Setting configuration defaults when creating instance
// It is needed , such as Construtor. It tells what if no value is provided ?
//
const api = axios.create({
  baseURL: "http://localhost:8080/user",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllPizzas = async ()=>{
  let response;
  try{
    response = await api.get('/');
  }
  catch(e){
    return e;
  }
  return response;
}

export const registerUserToDatabase = async  (data)=> {
  let response;

  try {
    response = await api.post("/register", data);
  } catch (e) {
    return e;
  }
  return response;
}

export const loginUser = async (data)=>{
  let response;
  try{
    response = await api.post('/login',data);
  }
  catch(e){
    return e;
  }
  return response;
}

export const userOrder = async (data)=>{
  let response;
  try{
    response = await api.post('/order',data);
    
  }catch(e){
    return e;
  }
  return response;
}