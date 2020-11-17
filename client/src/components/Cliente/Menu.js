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
    const [filter, setFilter] = useState([]);
    const [modaldata, setmodalData] = useState({});
    const [tienda, setTienda] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState([]);
    const [sortType, setSortType] = useState('items');


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
        const response = await fetch (`http://localhost:5000/api/v1/validar_tienda/${user.id}/tiendas/${id}`)
        const json = await response.json();
        console.log("tienda validacion personal:"+json.status);
        if(json.status=='false'){
          handleShow2();
        }
        // }else{
        // setValidacion(json.status)
        // }
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
        if(itemtienda.tienda[0].validada===false){
            fetchValidar();
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

    const styleImgTienda={
        maxWidth: '25%'
    }
    const styleImg={
        maxWidth: '100%',
        height: '175px',
        objectFit: 'cover'
    }

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

   

    const editSearchTerm = (e) => {
        setSearchTerm(e.target.value);
    }

    const dynamicSearch = () => {
        return items.filter(item => item.nombre.toLowerCase().includes(searchTerm.toString().toLowerCase()))
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
                <input type="text" value={searchTerm} onChange={editSearchTerm}></input>
            <div className="row">
                <Producto name={dynamicSearch()}/>
            </div>
            <div class="col-sm-3">

            <select onChange={(e) => setSortType(e.target.value)}> 
            <option value="mayor">Precio</option>
            <option value="abc">Nombre</option>
            </select>
        
      
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

    const handleShow = (item) => {
        setmodalData(item)
        setShow(true);
    }

    const handleClose = () => setShow(false);


    return(
        <Fragment>
            {props.name.map(item =>(
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
                            <AgregarCarrito item={item}/> 

                        </div>   
                    </div>
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
    return(
        <Fragment>
            <a href={"#agregar" + props.item.id} role="button" className="btn btn-block btn-info w-75 my-2 mx-auto" data-toggle="modal">
                Agregar al carrito
            </a>
            <Agregar item={props.item} cantidad="1" ></Agregar>
            
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
        const data = await fetch (`http://localhost:5000/api/v1/carrito/${user.id}`);
        const iCarrito = await data.json();
        const data2 = await fetch (`http://localhost:5000/api/v1/agregarCarrito/${id_producto}/${iCarrito[0].id}/${cantidad}`, {
            method: "POST"
        });
    }


    return(
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
    );
}


export default Menu;