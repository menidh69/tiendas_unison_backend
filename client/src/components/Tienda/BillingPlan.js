import {Modal, Button, Container, Card, Row, Col} from 'react-bootstrap';
import React, {Fragment, useState, useContext, useEffect} from 'react';



const BillingPlan = (props)=>{

    const handleClick = (plan)=>{
        props.setStep(props.step+1);
        props.setPlan(plan)
    }

    
    return(
    
    <Container>
        <Modal.Title>Estas a un solo paso!</Modal.Title>
        <h6 className="my-4">
            Para completar la activación de tu cuenta debes escoger un
            plan de suscripción, de lo contrario tu tienda no será mostrada a los clientes</h6>
              <Row>
                <Col>
                <Card>
                  <Card.Header>Plan Mensual</Card.Header>
                  <Card.Body>
                    <Card.Title><h2>$100 al mes</h2></Card.Title>
                    <ul className="my-2">
                        <li>Vende tus productos en linea</li>
                        <li>Sin limitaciones</li>
                        <li>Tarifa fija</li>
                      </ul>
                    <Card.Text className="text-left">
                      
                      <span className="text-muted">* Obtendrás el plan de 30 dias gratis, 
                      despues de la fecha limite los cargos se harán automaticamente</span>
                    </Card.Text>
                    <Button variant="primary" onClick={()=>handleClick(1)}>Seleccionar</Button>
                  </Card.Body>
                </Card>
                </Col>
                <Col>
                <Card>
                  <Card.Header>Prueba 30 días</Card.Header>
                  <Card.Body>
                    <Card.Title><h2>$0</h2></Card.Title>
                    <ul className="my-2">
                        <li>Vende tus productos en linea</li>
                        <li>Sin limitaciones</li>
                        <li>Tarifa fija</li>
                      </ul>
                    <Card.Text className="text-left">
                    
                      <span className="text-muted">
                        * Obtendrás el plan de 30 dias gratis y al vencer, tu cuenta
                      se desactivará hasta que pagues</span>
                    </Card.Text>
                    <Button variant="primary" onClick={()=>handleClick(2)}>Seleccionar</Button>
                  </Card.Body>
                </Card></Col>
              </Row>
            </Container>
    )
}

export default BillingPlan;