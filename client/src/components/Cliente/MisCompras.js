import React, {Fragment, useEffect, useState, useContext} from 'react';
import { UserContext } from '../../UserContext';
import {Modal, Button, Form,Table, Container, Col, Row, ListGroup, Card, Image} from 'react-bootstrap';
import ReviewTienda from './ReviewTienda';
import StarIcon from './StarIcon'


const MisCompras = ()=>{
const [compras, setCompras] = useState()
const {user, setUser} = useContext(UserContext);
const [selectedCompra, setSelectedCompra] = useState();


useEffect(()=>{
    let isMounted = true;
    if(isMounted){
        fetchVentas()
        .then(json=>{
            console.log(json)
            setCompras(json);
        })
    }
    return ()=>isMounted=false
}, [])



const calculaRating = (reviews)=>{
    let total = 0;
    reviews.map(review=>{
        total += review.calificacion
    })
    total = total / reviews.length
    let array = [];
    for(let i=0; i<total; i++){
        array.push(i);
    }
    return array
}

const fetchVentas = async()=>{
    const datos = await fetch(`http://localhost:5000/api/v1/compras/cliente/${user.id}`)
    const json = await datos.json()
    return json.compras
}
const bgStyle={
    backgroundColor: "#29698f"
}

const scroll={
    overflowY: "scroll",
    height: "80vh"
}
const styleImg={
    maxWidth: '100%',
    height: '175px',
    objectFit: 'cover'
}

return (
    <Fragment>
    <div className="text-center my-4">
    <h2>Mis Compras</h2>
    
    <hr/>
    {compras ? 
    <div>
        <Container style={bgStyle} className="py-2 rounded">
            <Row>
                <Col className="bg-light mx-2 rounded my-2" style={scroll}>
                    <h4 className="my-4">Compras recientes</h4>
                <Table>
                    <thead>
                        <tr>
                        <th>Fecha</th>
                        <th>Total</th>
                        <th>Estado</th>
                        <th>Ver Compra</th>
                        </tr>
                    </thead>
                    <tbody>
                    {compras.slice(0).reverse().map(orden=>(
                        <Fragment>
                        {orden.ventum  ?
                        
                        <tr>
                        <td>{orden.fecha}</td>
                        <td>${orden.ventum.amount/100}</td>
                        <td>{orden.entregado ? "Entregado":"Sin entregar"}</td>
                        <td><Button className="my-auto" size="sm" variant="outline-primary" onClick={()=>setSelectedCompra(orden)}>Ver compra</Button></td>
                        </tr>
                        
                        : null}
                        </Fragment>
                    ))}
                    </tbody>
                </Table>
                </Col>
                <Col className="bg-light mx-2 rounded">
                    {selectedCompra?
                    <Fragment>
                        <Card>
                            <Card.Header>{selectedCompra.fecha}</Card.Header>
                            <Card.Body className="text-left">
                               
                                    <Row>
                                        <Col>
                                            <Card.Title>ID de Orden</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">{selectedCompra.id}</Card.Subtitle>
                                            <Card.Title>Total</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">${selectedCompra.ventum.amount/100}</Card.Subtitle>
                                            <Card.Title>Tienda</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">{selectedCompra.orden_items[0].producto.tienda.nombre}</Card.Subtitle>
                                            <Card.Title>Calificación</Card.Title>
                                            <Card.Subtitle>{calculaRating(selectedCompra.tienda.review_tiendas).map(star=>(<StarIcon fill={true}/>))}</Card.Subtitle>
                                            <Card.Title className="my-4">                                 
                                                <ReviewTienda id_tienda={selectedCompra.orden_items[0].producto.id_tienda} nombre={selectedCompra.orden_items[0].producto.tienda.nombre}/>
                                            </Card.Title>
                                        </Col>
                                        <Col>
                                        <Container className="my-4">
                                        <Image src={selectedCompra.orden_items[0].producto.tienda.url_imagen} style={styleImg} rounded />
                                        </Container>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                        <Card.Text>
                                        <Table striped hover>
                                            <thead>
                                                <tr>
                                                <th>Nombre</th>
                                                <th>Precio</th>
                                                <th>Cantidad</th>
                                                <th>Calificacion</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {selectedCompra.orden_items.map(item=>(
                                                    <tr>
                                                        <td>{item.producto.nombre}</td>
                                                        <td>{item.producto.precio}</td>
                                                        <td>{item.cantidad}</td>
                                                        <td><Button size="sm" variant="warning" onClick={()=>alert("Para el siguiente sprint")}>Calificar</Button></td>
                                                    </tr>
                                                ))}
                                                
                                            </tbody>
                                        </Table>
                                    </Card.Text>
                                        </Col>
                                    </Row>
                                
                                
                            </Card.Body>
                        </Card>
                    </Fragment>
                    :
                    <h4 className="my-4">Selecciona una compra para ver su informacion completa</h4>}
                </Col>
            </Row>
        </Container>
    </div>
    : 
    null}
    </div>
    </Fragment>
)
}

export default MisCompras;