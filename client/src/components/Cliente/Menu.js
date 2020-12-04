import React, {Fragment, useContext, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {Modal, Button, Row, Col} from 'react-bootstrap';
import { UserContext } from '../../UserContext';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCartArrowDown} from '@fortawesome/free-solid-svg-icons';
import StarIcon from './StarIcon'

const Menu = ()=>{
    const {user , setUser} = useContext(UserContext);

    useEffect(()=>{
        let isMounted = true
        if(isMounted){
        fetchitems()
        .then(json=>{
            setItems(json)
        })
        fetchValidacionGeneral()
        .then(json=>{
            setTienda(json);
            if(json.validada===false){
                fetchValidar()
                .then(response=>{
                    setValidada(response)
                })
            }
        })
        }
    }, []);

    const {id} = useParams();
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState([]);
    const [modaldata, setmodalData] = useState({});
    const [tienda, setTienda] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState([]);
    const [sortType, setSortType] = useState('items');
    const [categoria, setCategoria] = useState();
    const [validada, setValidada] = useState()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (item) => {
        setmodalData(item)
        setShow(true);
    }


    useEffect(() => {
      const sortArray = type => {
        const types = {
          nombre: 'nombre',
          precio: 'precio',
          
        };
        const sortProperty = types[type];
        const sorted = [...items].sort((a, b) => b[sortProperty] - a[sortProperty]);
        setData(sorted);
      };
  
      sortArray(sortType);
    }, [sortType]); 

  

  

    const fetchValidar = async ()=>{
        const response = await fetch (`https://tiendas-unison-web.herokuapp.com/api/v1/validar_tienda/${user.id}/tiendas/${id}`)
        const json = await response.json();
        console.log("tienda validacion personal:"+json.status);
        if(json.status=='false'){
          handleShow2();
          return json.status
        }
        else{
        return json.status
        }
      }

    const fetchValidacionGeneral = async()=>{
        const datatienda = await fetch(`https://tiendas-unison-web.herokuapp.com/api/v1/tiendas/${id}`);
        const itemtienda = await datatienda.json();
        return itemtienda.tienda[0]

    }
    const fetchitems = async ()=>{
        const data = await fetch(`https://tiendas-unison-web.herokuapp.com/api/v1/productosTienda/${id}`);
        const items = await data.json();
        console.log(items)
        return items
        console.log(items);
        setItems(items);
        const datatienda = await fetch(`https://tiendas-unison-web.herokuapp.com/api/v1/tiendas/${id}`);
        const itemtienda = await datatienda.json();
        setTienda(itemtienda.tienda[0]);
        console.log(itemtienda.tienda[0]);
        if(itemtienda.tienda[0].validada===false){
            fetchValidar();
        }
    };
    const validar = async(id_usuario,id_tienda)=>{
        const response = await fetch (`https://tiendas-unison-web.herokuapp.com/api/v1/validar_tienda/${user.id}/${id}`,{
          method: "POST"
        });
        const json = await response.json()
        console.log(json)
        setValidada("true")
        handleClose2();
      }
    const [show2, setShow2] = useState(false);




  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);


    const styleImgTienda={
        maxWidth: '100%',
        height: '100px',
        objectFit: 'cover'
    }
    const styleImg={
        maxWidth: '100%',
        height: '175px',
        objectFit: 'cover'
    }

    const editSearchTerm = (e) => {
        setSearchTerm(e.target.value);
    }

   

    const dynamicSearch = () => {
        return items.filter(item => item.nombre.toLowerCase().includes(searchTerm.toString().toLowerCase()))
    }

    const dynamicFilter = ()=>{
        return items.filter(item=>item.categoria.includes(categoria))
    }

    return(
        <Fragment>
            <div className="container my-4 text-center">
                
                
            <Row className="my-2">
                <Col></Col>
                <Col>
                {tienda.url_imagen?
                <Link to={`/tiendas/${id}`}>
                <img src={tienda.url_imagen} className="rounded-circle" style={styleImgTienda}></img>
                </Link>
                :
                <img src={"https://via.placeholder.com/300x300"} className="rounded-circle" style={styleImgTienda}></img>
                }
                    <h1 className="text-dark my-0">{tienda.nombre}</h1>
                    <h4 className="text-dark my-0">Menú</h4>
                </Col>
                <Col>
                    
                </Col>
            </Row>
            <label for="search">Buscar: </label>
                    <input type="text" id="search" className="mx-2 rounded-pill border border-dark px-2" placeholder="Ej. Brownie de mota" value={searchTerm} onChange={editSearchTerm}></input>
                    <div className="mx-5">
                    <label for="ordenar">Ordenar por:</label>
                    <select className="mx-2" id="ordenar" onChange={(e) => setSortType(e.target.value)}> 
                        <option value="abc">Nombre</option>
                        <option value="mayor">Precio</option>
                    </select>
                    <label for="ordenar">Filtrar por:</label>
                    <select className="mx-2" id="ordenar" onChange={(e) => setCategoria(e.target.value)}> 
                        <option value="Postre">Sin filtro</option>
                        <option value="Postre">Postre</option>
                        <option value="Comida">Comida</option>
                        <option value="Botana">Botana</option>
                    </select>
                    </div>
                
            <div className="row">
            
                <Producto name={dynamicSearch()} validada={validada} validar={validar} categoria={categoria}/>
                {/* {items.map(item =>(

                <div key={item.id} className="col-md-3 my-2">        

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
                        <AgregarCarrito item={item}/>

                    </div>
                </div>
                ))} */}

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
            
            </div>
            </div>
        </Fragment>
    )
}

function Producto(props) {

    const [modaldata, setmodalData] = useState({});
    const [show, setShow] = useState(false);
    const [items, setItems] = useState([]);

    console.log(props.name)

    const style = {
        width: '12rem'
    }
    const styleImg={
        maxWidth: '100%',
        height: '175px',
        objectFit: 'cover'
    }

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


    const handleShow = (item) => {
        setmodalData(item)
        setShow(true);
    }

    const handleClose = () => setShow(false);

    const btnStyle={
        backgroundColor: "#FF9500"
    }

    return(
        <Fragment>
            {props.name.map(item =>(
                <Fragment>
                    {props.categoria ?
                    <Fragment>
                    {props.categoria==item.categoria?
                    <div className="col-md-3 my-2">        
                        <div className="card rounded shadow text-center h-100" style={style}>
                            <img src={item.url_imagen||"https://via.placeholder.com/300x300"} style={styleImg} className="card-img-top"/>
                            <div className="card-body h-75">
                                <div className="container">
                                <h6 className="card-title">{item.nombre}</h6>
                                </div>
                                <div>{calculaRating(item.reviews).map(star=>(<StarIcon fill={true}/>))}</div>
                                <div className="card-text">
                                    ${item.precio}
                                </div>
                            </div>
                            <button className="btn btn-block btn-info w-75 my-2 mx-auto" style={btnStyle}  onClick={()=>handleShow(item)}>Mas info</button> 
                            <AgregarCarrito validada={props.validada} validar={props.validar} item={item}/> 

                        </div>   
                    </div>
                    :
                    null}
                    </Fragment>
                    : <div className="col-md-3 my-2">        
                    <div className="card rounded shadow text-center h-100" style={style}>
                        <img src={item.url_imagen||"https://via.placeholder.com/300x300"} style={styleImg} className="card-img-top"/>
                        <div className="card-body h-75">
                            <div className="container">
                            <h6 className="card-title">{item.nombre}</h6>
                            </div>
                            <div>{calculaRating(item.reviews).map(star=>(<StarIcon fill={true}/>))}</div>
                            <div className="card-text my-2">
                                ${item.precio}
                            </div>
                        </div>
                        <button style={btnStyle}  className="btn btn-block btn-info w-75 my-2 mx-auto" onClick={()=>handleShow(item)}>Mas info</button> 
                        <AgregarCarrito validada={props.validada} validar={props.validar} item={item}/> 

                            </div>   
                        </div>
                }
                    </Fragment>
                ))}
                {(show)?
            <Modal show={show} onHide={handleClose} className="text-center">
                <Modal.Header closeButton>
            <Modal.Title>{modaldata.nombre}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                    <img src={modaldata.url_imagen||"https://via.placeholder.com/300x300"} style={styleImg}></img>
                    </div>
                    <div>{calculaRating(modaldata.reviews).map(star=>(<StarIcon fill={true}/>))}</div>
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
        </Fragment>
    );
}

function AgregarCarrito(props) {
    const btnStyle={
        backgroundColor: "#FF9500"
    }

    return(
        <Fragment>
            <a href={"#agregar" + props.item.id} role="button" style={btnStyle} className="btn btn-block btn-info w-75 my-2 mx-auto" data-toggle="modal">
                Agregar <FontAwesomeIcon icon={faCartArrowDown}/>
            </a>
            <Agregar validada={props.validada} validar={props.validar} item={props.item} cantidad="1" ></Agregar>

        </Fragment>

    );
}

function Agregar(props){

    const {user , setUser} = useContext(UserContext);
    const [data, setData] = useState({
        cantidad: props.cantidad
      });

    const updateField = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }
    const agregarCarrito = async(id_producto, cantidad) => {
        const itemCarrito = {
            id_producto: id_producto,
            cantidad: cantidad
        }
        const data = await fetch (`https://tiendas-unison-web.herokuapp.com/api/v1/agregarCarrito/${user.id}`, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(itemCarrito)
        });
        const response = await data.json()
        console.log(response)
    }


    return(
        <Fragment>
            {props.validada!=='false' ?
        <div id={"agregar" + props.item.id} class="modal fade">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Cantidad a agregar</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>
                    <div className="modal-body">
                        <p>¿Cuantos {props.item.nombre} deseas agregar?</p>
                        <input type="number" name="cantidad" value={data.cantidad} min="1" max="10" onChange={updateField} />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal"  onClick={()=>agregarCarrito(props.item.id, data.cantidad)}>Agregar</button>
                    </div>
                </div>
            </div>
        </div>
        : 
        <div id={"agregar" + props.item.id} class="modal fade">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Advertencia</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>
                    <div className="modal-body">
                        <h4>¡La tienda no esta validada!</h4>
                        <p>Estas intentando agregar productos de una tienda que no has validado, si
                            conoces esta tienda validala para poder agregar sus productos a tu carrito
                        </p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal"  onClick={()=>props.validar()}>Validar</button>
                    </div>
                </div>
            </div>
        </div>
        }
        </Fragment>
    );
}

export default Menu;

