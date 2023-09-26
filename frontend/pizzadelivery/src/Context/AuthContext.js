import React, { createContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const AuthContext = createContext();
function AuthContextProvider() {
    const[loggedIn, setLoggedIn] = useState(undefined);
   
    async function GetLoggedIn(){
      const isLoggedIn = useSelector((state)=>state.login.isAuth);
      console.log(isLoggedIn);
      setLoggedIn(isLoggedIn); 
      console.log(loggedIn);
    }

    useEffect(()=>{
      GetLoggedIn();
    },[])

  return (
    <div>AuthContext</div>
  )
}

export default AuthContextProvider