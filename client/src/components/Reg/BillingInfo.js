
import React, {Fragment, useState, useContext, useEffect} from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe("pk_test_51HoJ01K9hN8J4SbUqEiL2Amsb8RleP8IsJYQndlu4PcDJ1vVRC7dCX2wOKvO1WSGQ0NCvxejBlDxiFVjb6mippAO00wL2DOUxs");

const options = {
    locale: "es-MX"
  }
  const ModalPagar = (props)=>{
    return (
      <Elements options={options} stripe={stripePromise}>
      <Fragment>
            <SubscriptionForm/>
        </Fragment>
        </Elements>
    );
  }