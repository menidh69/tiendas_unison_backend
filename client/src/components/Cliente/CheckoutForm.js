import React , {useContext, Fragment, useState} from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import { UserContext } from '../../UserContext'
import {Spinner} from 'react-bootstrap';
import CardSection from './CardSection';

export default function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();
  const {user, setUser} = useContext(UserContext)
  const [processing, setProcessing] = useState(null)
  const [success, setSuccess] = useState()
  const [error, setError] = useState()



  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    
    event.preventDefault();
    setProcessing(true)
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const data = await fetch(`http://localhost:5000/api/v1/paySecret/${props.ID}/${user.id}`)
    const intent = await data.json()
    console.log(intent.total)
    const result = await stripe.confirmCardPayment(intent.client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user.nombre,
        },
      },
      setup_future_usage: 'off_session'
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      setProcessing(false);
      setError(true)
      console.log(result.error.message);

    } else {
      // The payment has been processed!
      
      if (result.paymentIntent.status === 'succeeded') {
        console.log("success")
        setProcessing(false)
        setSuccess(true)
        console.log(result)
        const body = {
          id_user: user.id,
          id_stripe_tienda: props.ID,
          total: props.total,
          id_transaccion: result.paymentIntent.id
        }
        const orden = await fetch('http://localhost:5000/api/v1/nuevaOrden', {
          method: "POST",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify(body)
        })
        const resp = await orden.json();
        console.log(resp)

        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  };

  if(error){
    return(
      <Fragment><h1 className="text-dark">Ocurrió un error</h1></Fragment>
    )
  }

  return (
    <Fragment>
      {success?
      <div className="text-center py-5">
      <h2 className="text-dark">¡Tu compra ha sido realizada!</h2>
      <p>Puedes ir a recoger tu orden a la tienda correspondiente.</p>
      <button className="btn btn-lg btn-primary">Ir a Pedidos</button>
      </div>
      :
      <div className="text-center">
    <form onSubmit={handleSubmit}>
      <CardSection disabled={processing}/>
      {processing ? <div> <Spinner animation="border" variant="primary" /> </div>:
      <button className="btn btn-lg btn-primary" disabled={!stripe || processing}>Confirm order</button>
      }
    </form>
    </div>
}
    </Fragment>
  );
}