
import React, {Fragment, useState, useContext, useEffect} from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {Modal, Button, Container, Card, Row, Col} from 'react-bootstrap';
import SubscriptionForm from './SubscriptionForm'
import BillingPlan from './BillingPlan'

const stripePromise = loadStripe("pk_test_51HoJ01K9hN8J4SbUqEiL2Amsb8RleP8IsJYQndlu4PcDJ1vVRC7dCX2wOKvO1WSGQ0NCvxejBlDxiFVjb6mippAO00wL2DOUxs");


const options = {
    locale: "es-MX"
  }
  const BillingInfo = (props)=>{

    const [plan, setPlan] = useState();
    const [show, setShow] = useState(false);
    const [step, setStep] = useState(1);
    const handleClose = () => props.setShow(false);
    const handleShow = () => props.setShow(true);
    const [link, setLink] = useState();

    useEffect(()=>{
      let isMounted = true;
      if(isMounted){
        console.log(props.id_stripe)
          fetchSubscripcion()
          .then(json=>{
            if(json.status_code==404){
              console.log(json)
              console.log(json.message);
              handleShow();
            }else{
              console.log(json)
                handleSubscripcion(json);
          }})
      }
      return ()=>isMounted=false;
    }, [])

    const handleSubscripcion = (json)=>{
      props.setSubscripcion(json.subscripcion)
      console.log(json.subscripcion)
    }

    const fetchSubscripcion = async ()=>{
        const dbData = await fetch(`https://tiendas-unison-web.herokuapp.com/api/v1/stripe/subscripcion/${props.id_tienda}`);
        const json = await dbData.json();
        return json;
    }


    const handleComponent = ()=>{
      switch(step){
        case 1:
          return <BillingPlan setStep={setStep} setPlan={setPlan} step={step}/>
          break;
        case 2:
          return <SubscriptionForm plan={plan}/>
          break;
        case 3:
          return (<Fragment>
          <div className="text-center py-5">
          <h2 className="text-dark">¡Tu suscripción se realizó con exito !</h2>
          <p>Tu proceso de activación se realizó exitosamente</p>
          </div>
          </Fragment>)
          break;
        
          default:
              return null
      }
    }

    return (
      <Elements options={options} stripe={stripePromise}>
      <Fragment>
      <Modal size="lg" className="text-center" centered show={props.show} onHide={handleClose}>
          <Modal.Header className="text-center" closeButton>
          <h3 className="text-center">Plan de subscripción</h3>
          </Modal.Header>
          <Modal.Body className="text-center">
            {handleComponent()}
          </Modal.Body>
          <Modal.Footer>
            
          </Modal.Footer>
        </Modal>
        </Fragment>
        </Elements>
    );
  }

  export default BillingInfo;