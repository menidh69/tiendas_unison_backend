import React, {Fragment, useState, useContext, useEffect} from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import {Modal, Button} from 'react-bootstrap'
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey('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');


const stripePromise = loadStripe("pk_test_51HoJ01K9hN8J4SbUqEiL2Amsb8RleP8IsJYQndlu4PcDJ1vVRC7dCX2wOKvO1WSGQ0NCvxejBlDxiFVjb6mippAO00wL2DOUxs");

const ModalPagar = (props)=>{
  return (
    <Elements stripe={stripePromise}>
    <Fragment>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Realizar la compra</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <CheckoutForm ID={props.id_stripe} total={props.total}/>
        </Modal.Body>
        
      </Modal>
      </Fragment>
      </Elements>
  );
}

export default ModalPagar;