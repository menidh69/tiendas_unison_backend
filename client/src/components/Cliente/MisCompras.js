import React, {Fragment, useEffect, useState, useContext} from 'react';
import { UserContext } from '../../UserContext';
import {Modal, Button, Form,Table, Container, Col, Row, ListGroup, Card, Image} from 'react-bootstrap';


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
},[])

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
                <Col className="bg-light mx-2 rounded" style={scroll}>
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
                        <td>${Number.parseFloat(orden.ventum.amount/100).toFixed(2)}</td>
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
                                            <Card.Subtitle className="mb-2 text-muted">${Number.parseFloat(selectedCompra.ventum.amount/100).toFixed(2)}</Card.Subtitle>
                                            <Card.Title>Tienda</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">{selectedCompra.orden_items[0].producto.tienda.nombre}</Card.Subtitle>
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
                                                        <td>${Number.parseFloat(item.producto.precio).toFixed(2)}</td>
                                                        <td>{item.cantidad}</td>
                                                        <td><Calificar item={item} /></td>
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

function Calificar (props) {
    

    const {user, setUser} = useContext(UserContext);


    const [review, setReview] = useState(null)
    
    useEffect(() =>{
        fetchitems();
    });
    
    
    const fetchitems = async () => {
        const data = await fetch(`http://localhost:5000/api/v1/usuarios/calificacion/${props.item.producto.id}/${user.id}`);
        const  it= await data.json();
        setReview(it.result)
    }

    console.log(review)
    if (review == null) {
        return(
            <Fragment>
                <a href={"#calificar" + props.item.producto.id} role="button" className="btn btn-warning" data-toggle="modal">
                    Calificar
                </a>
                <ModalC item={props.item} review={review}></ModalC>
            </Fragment>
        );

    } else {
        return(
            <Fragment>
                <a href={"#editar" + props.item.producto.id} role="button" className="btn btn-warning" data-toggle="modal">
                    Editar
                </a>
                <ModalE item={props.item} review={review}></ModalE>
            </Fragment>
        );
    }
}

function ModalC(props){
    console.log(props.review)
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const {user, setUser} = useContext(UserContext);
    const stars = [1, 2, 3, 4, 5];
    const [comment, setComment] = useState('');

    console.log(props.item.producto.id)

    const [data, setData] = useState({
        id_producto: props.item.producto.id,
        id_usuario: user.id,
        calificacion: stars[rating],
        comentario: ""
    });

    const updateField = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    


    //console.log(data.calificacion)


    const calificarClick = async() => {
        data.calificacion = stars[rating];
        console.log(props.item.producto.id)
        const response = await fetch(`http://localhost:5000/api/v1/usuarios/calificar/${props.item.producto.id}`, {
            method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            body: JSON.stringify(data)
        });
    }

    return(
        <div id={"calificar" + props.item.producto.id} class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Calificar producto</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>¿Que te parecio el producto: {props.item.producto.nombre}? {props.item.producto.id}</p>
                        <p class="text-warning"><small>Ayudanos a calificarlo</small></p>
                        <div class="flex-container">
                            {stars.map((star, i) => (
                            <Star
                                clase="fjcp"
                                key={i}
                                starId={i}
                                rating={hoverRating || rating}
                                onMouseEnter={() => setHoverRating(i)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setRating(i)}
                            />
                            ))}
                        </div>
                        <p><small>Comentario (opcional)</small></p>
                        <textarea class="form-control" id="comentario" name="comentario" value={data.comentario} onChange={updateField} rows="3"></textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-warning" data-dismiss="modal" onClick={calificarClick} >Calificar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ModalE(props){
    console.log(props.review)
    const [rating, setRating] = useState(props.review.calificacion - 1);
    const [hoverRating, setHoverRating] = useState(0);
    const {user, setUser} = useContext(UserContext);
    const stars = [1, 2, 3, 4, 5];
    const [comment, setComment] = useState('');

    console.log(props.item.producto.id)

    const [data, setData] = useState({
        id_producto: props.item.producto.id,
        id_usuario: user.id,
        calificacion: stars[rating],
        comentario: props.review.comentario
    });

    const updateField = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    const editarClick = async() => {
        data.calificacion = stars[rating];
        console.log(props.item.producto.id)
        const response = await fetch(`http://localhost:5000/api/v1/usuarios/calificarEditar/${props.item.producto.id}`, {
            method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
            body: JSON.stringify(data)
        });
    }

    return(
        <div id={"editar" + props.item.producto.id} class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Calificar producto</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>¿Que te parecio el producto: {props.item.producto.nombre}? {props.item.producto.id}</p>
                        <p class="text-warning"><small>Ayudanos a calificarlo</small></p>
                        <div class="flex-container">
                            {stars.map((star, i) => (
                            <Star
                                clase="fjcp"
                                key={i}
                                starId={i}
                                rating={hoverRating || rating}
                                onMouseEnter={() => setHoverRating(i)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setRating(i)}
                            />
                            ))}
                        </div>
                        <p><small>Comentario (opcional)</small></p>
                        <textarea class="form-control" id="comentario" name="comentario" value={data.comentario} onChange={updateField} rows="3"></textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-warning" data-dismiss="modal" onClick={editarClick} >Editar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}



const Star = ({ starId, rating, onMouseEnter, onMouseLeave, onClick, clase }) => {
    let styleClass = "star-rating-blank";
    if (rating >= starId) {
      styleClass = "star-rating-filled";
    }
  
    return (
      <div
        className={"star " + clase}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        <svg
          height="55px"
          width="53px"
          class={styleClass}
          viewBox="0 0 25 23"
          data-rating="1"
        >
          <polygon
            stroke-width="0"
            points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"
          />
        </svg>
      </div>
    );
  };
export default MisCompras;