import React from 'react'
import './pizza.css';
import image1 from '../images/food-3309418_1920.jpg';
import image2 from '../images/georgia-z-JG5lgvc57qE-unsplash.jpg';
import pizzaCar from '../images/pizzaCar.png'
import { Link } from 'react-router-dom';
function Pizza() {
  return (
    <section>
    <div className='container'>
     <div className='slider-container'>
     <div className='slider-images contrast-[1] saturate-150 opacity-80'>
        <img src={`${image1}`} alt='none'/>
      </div>
      <div className='slider-images contrast-[1] saturate-150 opacity-80'>
        <img src={`${image2}`} alt='none'/>
      </div>
      <div className='slider-images contrast-[1] saturate-150 opacity-80'>
        <img src={`${image1}`} alt='none'/>
      </div>
      <div className='slider-images contrast-[1] saturate-150 opacity-80'>
        <img src={`${image2}`} alt='none'/>
      </div>
      
     </div>
      
    <div className='text-center pt-10 text-5xl'>Are you Hungry don't wait<br/> order food <div className='ml-80 mt-6'><img className='w-40' src={`${pizzaCar}`} alt='DeliveryIcon'/></div></div>
    <div className='text-center mt-10 font-bold text-2xl'>
    <Link to='/user/offers'>
    <button className='bg-orange-500 rounded-xl w-36 h-9 text-white mb-10'> Order Now </button></Link>
    </div>
    </div>
    </section>
  )
}

export default Pizza