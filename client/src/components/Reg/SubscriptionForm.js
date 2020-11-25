import React , {useContext, Fragment, useState} from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import { UserContext } from '../../UserContext'
import {Spinner, Table} from 'react-bootstrap';
import CardSection from './CardSection';

export default function SubscriptionForm(props) {
  const stripe = useStripe();
  const elements = useElements();
  const {user, setUser} = useContext(UserContext)
  const [processing, setProcessing] = useState(null)
  const [success, setSuccess] = useState()
  const [error, setError] = useState()
  const [orden, setOrden] = useState(null)


  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    
    const info = await fetch("http://localhost:5000/api/v1/stripe/customer/:id");
    const customerId = await info.json();

    
    
      const result = await stripe.createPaymentMethod({
        payment_method: {
            type:'card',
            card: elements.getElement(CardElement),
            billing_details: {
                name: user.nombre,
            },
        }
    })
    
      if (result.error) {
        // Show error to your customer (e.g., insufficient funds)
        setProcessing(false);
        setError(results[i].error.message)
        console.log(results[i].error.message);
      } else 
       {
           createSubscription({
            customerId: customerId,
            paymentMethodId: result.paymentMethod.id,
            priceId: "price_1HrC6IK9hN8J4SbUnGpManU8"
           })
        console.log("success")
        console.log(results[i])   
    }
  }  
  ;

  function createSubscription({customerId, paymentMethodId, priceId}){
      const datos = await fetch("http://localhost:5000/api/v1/stripe/create-subscription",
      {
          method: "POST",
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            customerId: customerId,
            paymentMethodId: paymentMethodId,
            priceId: "price_1HrC6IK9hN8J4SbUnGpManU8",
          })
      })
      const result = await datos.json()
      if(result.error){
          setError(result.error)
          return
      }else{
          return {
            paymentMethodId: paymentMethodId,
            priceId: "price_1HrC6IK9hN8J4SbUnGpManU8",
            subscription: result,
          };
      }
  }




  return (
    <Fragment>
        <div className="text-center">
            <form onSubmit={handleSubmit}>
                <CardSection disabled={processing}/>
                {error ? <p className="text-danger">{error}</p> : null}
                <button className="btn btn-lg btn-primary" disabled={!stripe || processing}>Confirmar orden</button>
            </form>
        </div>
    </Fragment>
  );
}
export default SubscriptionForm;