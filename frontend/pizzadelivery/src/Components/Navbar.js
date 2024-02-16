import React from 'react'
import pizzaIcon from '../images/pizza.png';
import Cart from '../images/cart3.png'
import { useSelector ,useDispatch} from 'react-redux';
import {
  Link,
} from "react-router-dom";
import { isLoggedOut } from '../reducers/authreducers';
function Navbar() {
  const isAuthenticated = useSelector((state)=> state.login.isAuth);
  const role = useSelector((state)=> state.login.role);
  const dispatch = useDispatch();

  const handleLogout = ()=>{
    dispatch(isLoggedOut());
    
  }
  return (
    <nav className='mx-4 bg-orange-400 h-16'>
    <div className='flex justify-end space-x-80 h-20'>
    <div className='w-16'>
    <img src={`${pizzaIcon}`} alt='pizzaicon'/>
    </div>
    <div >
    <ul className='flex w-30 pt-3'>
            <Link to='/'>
            <li className='mx-3 cursor-pointer text-xl font-mono hover:text-white'>Home</li></Link>
            
            <Link to='/user/offers'>
            <li className='mx-3 cursor-pointer text-xl font-mono hover:text-white'>Offers</li></Link>
            
            
            
            {isAuthenticated?(
              role==='customer'?(<>
                <>
              <Link to='/user/order'>  
            <li className='mx-3 cursor-pointer text-xl font-mono hover:text-white'>MyOrder</li>
            </Link>
            <Link to='/'>  
            <li className='mx-3 cursor-pointer text-xl font-mono hover:text-white' onClick={handleLogout}>Logout</li>
            </Link>
            
            <Link to='/user/cart'><li className='mx-3 cursor-pointer hover:bg-white rounded-md w-14'><img className='w-10' src={`${Cart}`} alt='cartIcon'/></li></Link>
            </>
              </>):(
                <>
                <Link to='/admin/order'>  
            <li className='mx-3 cursor-pointer text-xl font-mono hover:text-white'>Admin Order</li>
            </Link>
                <Link to='/'>  
            <li className='mx-3 cursor-pointer text-xl font-mono hover:text-white' onClick={handleLogout}>Logout</li>
            </Link>
                </>
              )
            ):(
              <>
                
              <Link to='/user/register'>
              
              <li className='mx-3 cursor-pointer text-xl font-mono hover:text-white'>Register</li>
              </Link>
              <Link to='/user/login'>  
              <li className='mx-3 cursor-pointer text-xl font-mono hover:text-white'>Login</li>
              </Link>
              
              </>
            )}


            
          
        </ul>
    </div>
    </div>
       
    </nav>
  )
}

export default Navbar