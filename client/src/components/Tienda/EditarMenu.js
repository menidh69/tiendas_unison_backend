import React, {Fragment, useState, useEffect, fetchitems, useContext, Component} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './EditarMenu.css';
import { UserContext } from '../../UserContext'

class EditarMenu extends Component {
    render(){

        return(
    
            <Fragment>
                <div className="mainContainer">
                    <div className="top-container">
                        <div className="top-container-item izq">
                            <Link to="/panel/Menu">
                            <a className="atras izq" href="">
                                <h6 className="izq">← Atras</h6>
                            </a>
                            </Link>
                            <h6 className="izq">| Menú</h6>
                        </div>
                        
                        <div className="top-container-item der">
                            <Link to='/panel/Menu/EditarMenu/AgregarProducto'>
                                <button  className="btn btn-success der">Agregar producto</button>
                            </Link>
                        </div>
                    </div>
                    <div className="container tabla">
                        <Tabla/>
                    </div>
                </div>
            </Fragment>
        );
    }
}

function Tabla() {
    const {user, setUser} = useContext(UserContext);
    const [items, setItems] = useState([]);

    useEffect(() =>{
        fetchitems();
    });




    const fetchitems = async (id) => {
        const data = await fetch(`http://localhost:5000/api/v1/miTienda/${user.id}`);
        const  it= await data.json();
        const data2 = await fetch(`http://localhost:5000/api/v1/productosTienda/${it[0].id}`);
        const it2 = await data2.json();
        setItems(it2);
    }
    if (items.length > 0) {
        return(
            <div>
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                    <tr>
                    <td>{item.nombre}</td>
                    <td>${Number.parseFloat(item.precio).toFixed(2)}</td>
                    <td>{item.categoria}</td>
                    <td>
                        <Link to={"/panel/Menu/EditarMenu/EditarProducto/" + item.id}>
                            <button className="btn btn-info mr">Editar</button>
                        </Link>
                        <Eliminar idProducto={item.id} idTienda={item.id_tienda}/>
                    </td>
                    </tr>
                    ))}
                </tbody>
            </table>


            </div>
        );
    } else {
        return(
            <div className="text-center">
                <h4 >Aun no ha agregado ningun producto.</h4>
            </div>
        );
    }
}

function Eliminar (props){

    
    

    return(
        <Fragment>
            <a href={"#eliminar" + props.idProducto} role="button" className="btn btn-danger" data-toggle="modal">
                Eliminar
            </a>
            <Modal idProducto={props.idProducto} idTienda={props.idTienda}></Modal>
            
        </Fragment>

    );
}

function Modal(props){

    
    let history = useHistory();


    const eliminarClick = async(idProducto,idTienda) => {
        const response = await fetch(`http://localhost:5000/api/v1/eliminarProducto/${props.idProducto}/${props.idTienda}`, {
            method: "DELETE"
        });
    }

    return(
        <div id={"eliminar" + props.idProducto} class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">¿Estás seguro?</h4>
                    </div>
                    <div class="modal-body">
                        <p>¿Seguro que quieres borrar este elemento?</p>
                        <p class="text-warning"><small>Si lo borras, nunca podrás recuperarlo.</small></p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal"  onClick={eliminarClick}>Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditarMenu;