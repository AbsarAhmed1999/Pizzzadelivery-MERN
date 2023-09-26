import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import styles from './register.module.css'
import { registerUserToDatabase } from '../../api/InternalApi';
function Register() {
  const [userRegistered, setUserRegistered] = useState(false);
  const [error,setError] = useState(false);
    const[formData, setFormData] = useState({
        name:'',
        username:'',
        email:'',
        password:''

    })

    const handleChange = (event)=>{
       const {name,value} = event.target;
       setFormData({...formData,[name]:value});
    }
    let response;
    const registerUser = async (e)=>{
        e.preventDefault();
        response = await registerUserToDatabase(formData);
        if(response.response && response.response.status === 401 ){
          setError(true);
          setUserRegistered(false)
        }
        if(response.status===201){
          setUserRegistered(true)
          setError(false)
        }
      
    }


  return (
    <form>
    <div className={`${styles.register} mt-8 shadow-lg border-gray-200 border-2 border-x-4 outline-gray-950 outline-8`}>
      <div className='h-20  pt-8 ml-11'>
        <label className={`${styles.emailInput}`} htmlFor='name'>Name</label>
        <input onChange={handleChange} value={formData.name} type='text' name='name' className='outline-8 outline-black drop-shadow-lg border-2 border-gray-300 ml-8' />
        
      </div>

      <div className='justify-center ml-12 h-20 '>
      <label className='mr-3' htmlFor='username'>Username</label>
        <input onChange={handleChange} value={formData.username} type='text' name='username' className='outline-8 outline-black drop-shadow-lg border-2 border-gray-300 ' />
      </div>

      <div className='justify-center ml-12 h-20 -mt-7'>
      <label className={`${styles.emailInput}`} htmlFor='email'>Email</label>
        <input onChange={handleChange} value={formData.email} type='text' name='email' className='outline-8 outline-black drop-shadow-lg border-2 border-gray-300 ml-9 ' />
      </div>


      <div className='justify-center ml-9 h-20 -mt-6'>
      <label className={`${styles.emailInput}`} htmlFor='password'>Password</label>
        <input onChange={handleChange} value={formData.password} type='password' name='password' className='outline-8 outline-black drop-shadow-lg border-2 border-gray-300 ml-5 ' />
      </div>
      <button className='bg-orange-400 text-white border-2 border-gray-300 rounded-md w-24 h-8 ml-10 mt-8' onClick={registerUser}>Register</button>
      <Link to='/login'><label className='ml-10 text-orange-500 font-bold cursor-pointer'>Already have account ? </label></Link>
      <span>{userRegistered? <p className='ml-20 mt-5 text-green-500 font-bold'>User Registered Successfully</p>:null}</span>
      <span>{error? <p className='ml-28 mt-5 text-red-500 text-lg font-bold'>User Already Registered</p>:null}</span>
    </div>
    </form>
  )
}

export default Register;