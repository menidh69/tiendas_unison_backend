import React , {useContext, Fragment, useState} from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import { UserContext } from '../../UserContext'
import {Spinner, Table} from 'react-bootstrap';
import CardSection from './CardSection';
import {Link} from 'react-router-dom'

export default function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();
  const {user, setUser} = useContext(UserContext)
  const [processing, setProcessing] = useState(null)
  const [success, setSuccess] = useState()
  const [error, setError] = useState()
  const [orden, setOrden] = useState(null)

  function setProductosNull(){
    props.setProductos(null)
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  

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
    const data = await fetch(`https://tiendas-unison-web.herokuapp.com/api/v1/paySecret/${props.ID}/${user.id}`)
    const intent = await data.json()
    let results = []
    console.log(intent.client_secrets)

    for(const secret of intent.client_secrets) {
      console.log("before result")
      const result = await stripe.confirmCardPayment(secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.nombre,
          },
        }
    })
    console.log("after result")
    results.push(result)
  }
  console.log(results)
      // intent.client_secrets.map(async secret=>{
      // const result = await stripe.confirmCardPayment(secret, {
      //   payment_method: {
      //     card: elements.getElement(CardElement),
      //     billing_details: {
      //       name: user.nombre,
      //     },
      //   }
      // })
    
     
     
    
  

    for(let i=0; i<results.length; i++){
      if (results[i].error) {
        // Show error to your customer (e.g., insufficient funds)
        setProcessing(false);
        setError(results[i].error.message)
        console.log(results[i].error.message);
        break;
      } else {
      if (results[i].paymentIntent.status === 'succeeded') {
        console.log("success")
        console.log(results[i])
        if((i+1)==results.length){
          setOrden(props.productos)
          setProductosNull();
          setProcessing(false)
          setSuccess(true)
         
        }
        

        
    }
  }}
    

    
      // The payment has been processed!
      
      
        // const orden = await fetch('https://tiendas-unison-web.herokuapp.com/api/v1/nuevaOrden', {
        //   method: "POST",
        //   headers: {"Content-Type":"application/json"},
        //   body: JSON.stringify(body)
        // })
        // const resp = await orden.json();
        // console.log(resp)

        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      
    
  };


  return (
    <Fragment>
      {success?
      <div className="text-center py-5">
      <h2 className="text-dark">¡Tu compra ha sido realizada!</h2>
      <p>Puedes ir a recoger tu orden a la tienda correspondiente.</p>
      <Table striped bordered hover size="sm" responsive borderless className="my-4">
  <thead>
    <tr>
      <th>Producto</th>
      <th>Cantidad</th>
      <th>Nombre de Tienda</th>
    </tr>
  </thead>
  <tbody>
    {orden.map(producto=>(
      <tr key={producto.producto.id}>
      <td scope="row">{producto.producto.nombre}</td>
      <td>{producto.cantidad}</td>
      <td>{producto.producto.tienda.nombre}</td>
      </tr>
    ))}
    
  </tbody>
</Table>
      <Link to="/pedidos">
      <button className="btn btn-lg btn-primary">Ver mi Orden</button>
      </Link>
      </div>
      :
      <div className="text-center">
    <form onSubmit={handleSubmit}>
      
      <CardSection disabled={processing}/>
      {error ? <p className="text-danger">{error}</p> : null}
      {processing ? <div> <p>Realizando compra...</p><Spinner animation="border" variant="primary" /> </div>:
      <button className="btn btn-lg btn-primary" disabled={!stripe || processing}>Confirmar orden</button>
      }
    </form>
    </div>
}
    </Fragment>
  );
}