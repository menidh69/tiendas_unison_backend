import React, { Fragment } from 'react';
import {CardElement} from '@stripe/react-stripe-js';
import '../Cliente/CardSectionStyles.css'

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

function CardSub() {
  return (
    <Fragment>
      <h4 className="w-75 my-4 mx-auto">Porfavor, ingresa tu información bancaria para terminar con el proceso</h4>
    <label htmlFor="card">
      Información Bancaria
    </label>
    <CardElement id="card" className="my-4" options={CARD_ELEMENT_OPTIONS} />
    </Fragment>
  );
};

export default CardSub;