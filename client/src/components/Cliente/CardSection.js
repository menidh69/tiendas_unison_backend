import React, { Fragment } from 'react';
import {CardElement} from '@stripe/react-stripe-js';
import './CardSectionStyles.css'

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

function CardSection() {
  return (
    <Fragment>
    <label htmlFor="card">
      Card details
    </label>
    <CardElement id="card" className="my-4" options={CARD_ELEMENT_OPTIONS} />
    </Fragment>
  );
};

export default CardSection;