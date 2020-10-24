import React, {Fragment, useContext, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {Modal, Button} from 'react-bootstrap';

const Menu = ()=>{

    useEffect(()=>{
        fetchitems();
    }, []);

    const {id} = useParams();
    const [items, setItems] = useState([]);
    const [modaldata, setmodalData] = useState({});
    const [tienda, setTienda] = useState({});


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (item) => {
        setmodalData(item)
        setShow(true);
    }

    const fetchitems = async ()=>{
        const data = await fetch(`http://localhost:5000/api/v1/productosTienda/${id}`);
        const items = await data.json();
        console.log(items);
        setItems(items);
        const datatienda = await fetch(`http://localhost:5000/api/v1/tiendas/${id}`);
        const itemtienda = await datatienda.json();
        setTienda(itemtienda.tienda[0]);
        console.log(itemtienda.tienda[0]);
    };

    const style = {
        width: '12rem'
    }
    const styleImg={
        maxWidth: '100%',
        height: '50%'
    }

    return(
        <Fragment>
            <div className="container my-4 text-center">
                <h1 className="text-dark my-4">{tienda.nombre}</h1>
            <div className="row">
            {items.map(item =>(
                <div className="col-md-3">        
                    <div className="card rounded shadow text-center" style={style}>
                        <img src={item.url_imagen} style={styleImg} className="card-img-top"/>
                        <div className="card-body">
                            <h4 className="card-title">{item.nombre}</h4>
                                <p class="card-text">
                                   ${item.precio}
                                </p>
                                <button className="btn btn-block btn-info" onClick={()=>handleShow(item)}>Mas informacion</button>
                                
                        </div>
                    </div>   
                </div>
            ))}
            </div>
            <div>
            {(show)?
            <Modal show={show} onHide={handleClose} className="text-center">
                <Modal.Header closeButton>
            <Modal.Title>{modaldata.nombre}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modaldata.url_imagen}
                    <p>
                    $ {modaldata.precio}
                    <br/>
                     Categoría: {modaldata.categoria}
                    <br/>
                    Descripción: {modaldata.descripcion}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                </Modal.Footer>
            </Modal>
            :
            
            ''
            
            
            }
            </div>
            </div>
        </Fragment>
    )
}

export default Menu;