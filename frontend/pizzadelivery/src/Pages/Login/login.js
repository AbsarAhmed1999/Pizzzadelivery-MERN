import React, { useEffect, useState } from 'react'
import styles from './login.module.css'
import { Link } from 'react-router-dom';
import { loginUser } from '../../api/InternalApi';
import { useDispatch,useSelector } from 'react-redux';
import { isLoggedIn } from '../../reducers/authreducers';
import { useNavigate } from 'react-router-dom';
function Login() {
  const isAuthenticated = useSelector((state)=>state.login.isAuth);
  const Savedrole = useSelector((state)=>state.login.role);
  const[error,setError] = useState(false);
  const [username,setUsername]= useState('');
  const [password,setPassword]= useState('');
  const [role,setRole] = useState('');
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const emailChange = (e)=>{
    setUsername(e.target.value);
    console.log(username)
  }

  const passwordChange = (e)=>{
    setPassword(e.target.value);
    
  }

  const handleRole = (e)=>{
    const selectedRole = e.target.value;
    setRole(selectedRole);
    
  }
  const userData = {
    username: username,
    password: password,
    role: role,
  }
  const LoginUser = async (e)=>{
    e.preventDefault();
    console.log(userData)
    let response = await loginUser(userData);
    if (response) {
      if (response.response && response.response.status === 401) {
        console.log("Invalid Email or Password");
        setError(true);
      } else if (response.status === 200) {
        
        dispatch(isLoggedIn({id:response.data.user.id, auth:response.data.auth, role:response.data.user.role}));
        setError(false);
      }
    }
  }

  const afterLogin = ()=>{
    navigate('/user/offers')
  }

  const adminLogin = ()=>{
    navigate('/admin/order')
  }

  return (
    <>
      {isAuthenticated?(
        Savedrole === 'customer'?(
          <div>{afterLogin()}</div>
        ):(
          <div>{adminLogin()}</div>
        )
      ):(
        <div>
      <div className={`${styles.login} h-72 mt-20 shadow-lg border-gray-200 border-2 border-x-4 outline-gray-950 outline-8`}>
        <div className='h-20  pt-8 ml-10'>
          <label className='mr-10' htmlFor='username'>Username</label>
          <input onChange={emailChange} value={username}type='text' name='username' className='outline-8 outline-black drop-shadow-lg border-2 border-gray-300' />
          
        </div>
        <div className='justify-center ml-11 h-20 pt-5'>
        <label className='mr-10' htmlFor='password'>Password</label>
          <input onChange={passwordChange} value={password} type='password' name='password' className='outline-8 outline-black drop-shadow-lg border-2 border-gray-300 ' />
        </div>
        <div>
        <span className='ml-11 '>Login as </span>
          <select value={role} id='role' onChange={handleRole} className='ml-20 mt-3 bg-orange-500 rounded-lg text-white'>
            <option value="" disabled selected className='text-white'>Select type</option>
            <option value="admin">Admin</option>
            <option value="customer">customer</option>
          </select>
        </div>
        <button onClick={LoginUser} className='mb-5 bg-orange-400 text-white border-2 border-gray-300 rounded-md w-24 h-8 ml-10 mt-8 hover:bg-white hover:text-orange-500 hover:font-bold '>Login</button>
        <Link to='/user/register'><label className='ml-10 text-orange-500 font-bold cursor-pointer hover:text-orange-400 hover:font-extrabold'>Dont have an account ? </label></Link>
        {error? <span className='text-red-500 font-bold ml-24'>Invalid Email or Password</span>:null}
      </div>
    </div>
      )}
    </>
  )
}

export default Login;