import React, {Fragment, useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { UserContext } from '../../UserContext';
import {Button, Modal, Card, Form, Row, Col} from 'react-bootstrap';
import RatingIcon from './RatingIcon';

const ReviewTienda= (props)=>{
    const [show, setShow] = useState(false);
    const [comment, setComment] = useState(null)

    const {user, setUser} = useContext(UserContext)
    
        const [rating, setRating] = useState(0);
        const [hoverRating, setHoverRating] = useState(0);
        const onMouseEnter = (index) => {
          setHoverRating(index);
        };
        const onMouseLeave = () => {
          setHoverRating(0);
        };
        const onSaveRating = (index) => {
          setRating(index);
        };
 
        const handleClose = ()=>setShow(false);
        const handleShow = ()=>setShow(true);
        const handleComment = e =>{
            setComment(e.target.value);
            console.log(e.target.value)
        }


    const handleSubmit = async ()=>{
        if(rating!==0 && rating!==null){
            const body = {
                calificacion: rating,
                comment: comment,
                id_usuario: user.id,
                id_tienda: props.id_tienda

            }
            const sendReview = await fetch('http://localhost:5000/api/v1/reviews/tienda', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            const json = await sendReview.json();
            if(json.status=="success"){
                handleClose();
                console.log(json)
            }else{
                console.log(json.err)
            }
        }
        
    }

    

return(
<Fragment>
<Card.Title><button className="btn btn-sm btn-primary rounded pill" onClick={handleShow}>Calificar tienda</button></Card.Title>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>Califica Tienda</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="my-4">
            <p className="my-0">Nombre de Tienda</p>
            <h5 className="my-0">{props.nombre}</h5>
            </div>
            <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Calificación</Form.Label>
                    <div className="box flex">
                    <Row>
                        <Col xs={2}/>
                        {[1, 2, 3, 4, 5].map((index) => {
                        return (
                            <Col>
                            <RatingIcon 
                            index={index} 
                            rating={rating} 
                            hoverRating={hoverRating} 
                            onMouseEnter={onMouseEnter} 
                            onMouseLeave={onMouseLeave} 
                            onSaveRating={onSaveRating} />
                            </Col>
                        )
                        })}
                        <Col xs={2}/>
                        </Row>
                    </div>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Comentario</Form.Label>
                    <Form.Control as="textarea" placeholder="Agrega un comentario..." rows={3} onChange={handleComment}/>
                </Form.Group>
            </Form>

        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
            Calificar
        </Button>
        </Modal.Footer>
    </Modal>
</Fragment>
)

}
export default ReviewTienda;