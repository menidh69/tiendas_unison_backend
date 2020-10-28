import React, {Fragment, useContext, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {Modal, Button} from 'react-bootstrap';
import { UserContext } from '../../UserContext';

const Menu = ()=>{
    const {user , setUser} = useContext(UserContext);

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
        if(!(itemtienda.tienda[0].validada)){
            handleShow2();
        }
    };
    const validar = async(id_usuario,id_tienda)=>{
        const response = await fetch (`http://localhost:5000/api/v1/validar_tienda/${user.id}/${id}`,{
          method: "POST"
        });
        const json = await response.json()
        console.log(json)
        handleClose2();
      }
      const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

    const style = {
        width: '12rem'
    }
    const styleImg={
        maxWidth: '100%',
        height: '175px',
        objectFit: 'cover'
    }
    const styleImgTienda={
        maxWidth: '25%'
     }

    return(
        <Fragment>
            <div className="container my-4 text-center">
                <Link to={`/tiendas/${id}`}>
                <img src={tienda.url_imagen||"https://via.placeholder.com/300x300"} className="rounded-circle" style={styleImgTienda}></img>
                </Link>
                <h1 className="text-dark my-4">{tienda.nombre}</h1>
                <hr></hr>
                <h1 className="text-dark my-4 display-4">Menú</h1>
            <div className="row">
            {items.map(item =>(
                <div className="col-md-3 my-2">        
                    <div className="card rounded shadow text-center h-100" style={style}>
                        <img src={item.url_imagen||"https://via.placeholder.com/300x300"} style={styleImg} className="card-img-top"/>
                        <div className="card-body h-75">
                            <div className="container h-50">
                            <h6 className="card-title">{item.nombre}</h6>
                            </div>
                          
                            <div className="card-text">
                                   ${item.precio}
                            </div>
                        </div>
                        <button className="btn btn-block btn-info w-75 my-2 mx-auto" onClick={()=>handleShow(item)}>Mas info</button>   

                    </div>   
                </div>
            ))}
            </div>
            <div>
            <Modal show={show2} onHide={handleClose2} animation={true}>
                <Modal.Header closeButton>
                  <Modal.Title>Verificación de Tienda</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <p>¡Con tu información ayudas a las tiendas y a que los usuarios tengan compras más seguras! <br/>
                Al enviar este informe estas afirmando que la tienda si existe.  </p>   
                  </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary"  className="mx-auto" onClick={validar}>
                    Verificar
                  </Button>
                </Modal.Footer>
              </Modal>
            {(show)?
            <Modal show={show} onHide={handleClose} className="text-center">
                <Modal.Header closeButton>
            <Modal.Title>{modaldata.nombre}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                    <img src={modaldata.url_imagen||"https://via.placeholder.com/300x300"} style={styleImg}></img>
                    </div>
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