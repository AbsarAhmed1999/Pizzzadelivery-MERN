import React, { useState } from 'react'
import styles from './singleorder.module.css';
import { useParams } from 'react-router-dom';
function SingleOrder({pizza}) {
    const[orderplaced, setOrderPlaced] = useState(false);
    const[orderconfirmation, setOrderConfirmation] = useState(false);
    const[Prepration, setOrderPrepration] = useState(false);
    const[OutForDelivery, setOutForDelivery] = useState(false);
    const[completed, setCompleted] = useState(false);


    console.log("InsideSingleOrder");
    console.log(pizza)
    const {customerId} = useParams(); 

    // let status = document.querySelectorAll('.status_line');
    
    function updateStatus(pizza){
        const status = pizza[0].status;
        if(status==="order_placed"){
            setOrderPlaced(true); 
            setOrderConfirmation(false);
            setOrderPrepration(false);
            setOutForDelivery(false);
            setCompleted(false);
        }
        if(status==="confirmed"){
            setOrderPlaced(false); 
            setOrderConfirmation(true);
            setOrderPrepration(false);
            setOutForDelivery(false);
            setCompleted(false);
        }
        
    }
    
  return (
    <section>
        <div className='container mx-auto bg-gray-100'>
            <div className={`${styles.statusBox} pt-8 w-2/3 mx-auto`}>
                <div className='flex items-center justify-between mb-12'>
                    <h1 className='text-xl font-bold'>Track Delivery Status</h1>
                    <h6 className='bg-white py-1 rounded-full px-4 text-green-600 text-xs'>{customerId}</h6>
                </div>
                <ul>
                    <li className={`status_line text-xl pb-16 ${orderplaced===true?styles.current:styles.stepCompleted}`}><span>Order Placed</span></li>
                    <li className={`status_line text-xl pb-16 ${orderconfirmation===true?styles.current:styles.stepCompleted}`}><span>Order Confirmation</span></li>
                    <li className={`status_line text-xl pb-16 ${Prepration===true?styles.current:styles.stepCompleted}`}><span>Prepration</span></li>
                    <li className={`status_line text-xl pb-16 ${OutForDelivery===true?styles.current:styles.stepCompleted}`}><span>Out for delivery</span></li>
                    <li className={`status_line text-xl pb-5 ${completed===true?styles.current:styles.stepCompleted}`}><span>Completed</span></li>
                </ul>
            </div>
        </div>
    </section>
  )
}

export default SingleOrder