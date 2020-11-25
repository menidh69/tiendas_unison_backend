import React , {useContext, Fragment, useState} from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import { UserContext } from '../../UserContext'
import {Spinner, Table} from 'react-bootstrap';
import CardSub from './CardSub';

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
    setProcessing(true);
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    
    const info = await fetch(`http://localhost:5000/api/v1/stripe/customer/${user.id}`);
    const customerId = await info.json();
    console.log(customerId)
    
    
      const result = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
            billing_details: {
                name: user.nombre,
            },
    })
    
      if (result.error) {
        // Show error to your customer (e.g., insufficient funds)
        setProcessing(false);
        setError(result.error.message)
        console.log(result.error.message);
      } else 
       {
           createSubscription({
            customerId: customerId.customer_id,
            paymentMethodId: result.paymentMethod.id,
            priceId: "price_1HrF5VK9hN8J4SbU6bunPrdI"
           })
        console.log("success")
        console.log(result)   
    }
  }  
  

  async function createSubscription({customerId, paymentMethodId, priceId}){
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
            id_usuario: user.id,
            plan: props.plan
          })
      })
      console.log(props.plan)
      const result = await datos.json()
      if(result.error){
          setProcessing(false)
          setError(result.error)
          return
      }else{
        console.log(result)
        setSuccess(true)
          setProcessing(false)
          return {
            paymentMethodId: paymentMethodId,
            priceId: "price_1HrC6IK9hN8J4SbUnGpManU8",
            subscription: result,
          };
          
      }
  }



  return (
    <Fragment>

      {success ?
      <Fragment>
      <div className="text-center py-5">
      <h2 className="text-dark">¡Tu suscripción se realizó con exito !</h2>
      <p>Tu proceso de activación se realizó exitosamente</p>
      </div>
      </Fragment>
      :
      <Fragment>
        <div className="text-center">
            <form onSubmit={handleSubmit}>
                <CardSub disabled={processing}/>
                {error ? <p className="text-danger">{error}</p> : null}
                {processing ? 
                <div> 
                  <p>Realizando compra...</p><Spinner animation="border" variant="primary" /> 
                </div>
                :
                <button className="btn btn-lg btn-primary" disabled={!stripe || processing}>Confirmar orden</button>
                }            
                </form>
        </div>
        </Fragment>
      }
      </Fragment>

  );
}
