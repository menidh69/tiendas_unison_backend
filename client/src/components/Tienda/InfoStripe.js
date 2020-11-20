import React, {Fragment, useContext, useState, useEffect, fetchitems} from 'react';
import {Link} from 'react-router-dom';
import './MenuTienda.css';
import { UserContext } from '../../UserContext'
import {Modal, Button} from 'react-bootstrap';


const InfoStripe = (props)=>{


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [link, setLink] = useState();

    useEffect(()=>{
      let isMounted = true;
      if(isMounted){
        console.log(props.id_stripe)
          fetchStripeID(props.id_stripe)
          .then(json=>{
            if(json.stripe===true){

            }else{
                console.log(json)
                setLink(json.accountLink.url)
                handleShow()
          }})
      }
      return ()=>isMounted=false;
    }, [])

    const fetchStripeID = async ()=>{
        const dbData = await fetch(`http://localhost:5000/api/v1/stripeInfo/accountLink/${props.id_tienda}`);
        const json = await dbData.json();
        return json;
    }
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Termina tu registro</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
              <p className="text-left">Para empezar con tus ventas en linea debes registrarte en Stripe para recibir
              tus pagos bancarios, llena el formulario y comienza a vender tus productos. De no terminar este registro no podrás
              vender tus productos.
              </p>
              <a href={link}>
                <button className="btn btn-lg btn-primary text-light my-5">
                Conectar con Stripe
                  </button>
                  </a>

          </Modal.Body>
          <Modal.Footer>
            
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default InfoStripe;