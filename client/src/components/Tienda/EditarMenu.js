import React, {Fragment, useState, useEffect, fetchitems, useContext, Component} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './EditarMenu.css';
import { UserContext } from '../../UserContext'
import {storage} from '../../firebase'
import { render } from "react-dom" ;

class EditarMenu extends Component {
    constructor (props) {
        super(props);
        this.state={
            name: "productos"
        }
    }
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
        const data = await fetch(`https://tiendas-unison-web.herokuapp.com/api/v1/miTienda/${user.id}`);
        const  it= await data.json();
        const data2 = await fetch(`https://tiendas-unison-web.herokuapp.com/api/v1/productosTienda/${it[0].id}`);
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
                        <Editar item={item}/>
                        <Eliminar item={item}/>
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

function Editar(props) {
    return(
        <Fragment>
            <a href={"#editar" + props.item.id} role="button" className="btn btn-info mr" data-toggle="modal">
                Editar
            </a>
            <ModalEditar item={props.item}/>
        </Fragment>
    );
}

function Eliminar (props){

    return(
        <Fragment>
            <a href={"#eliminar" + props.item.id} role="button" className="btn btn-danger" data-toggle="modal">
                Eliminar
            </a>
            <Modal item={props.item}></Modal>

        </Fragment>

    );

}

function ModalEditar(props){

    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);

    const handleChange = e => {
      if (e.target.files[0]){
        handleUpload(e.target.files[0]);
      }
    };

    const handleUpload = (file) => {
      const uploadTask = storage.ref(`images/${file.name}`).put(file);
      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        error => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(file.name)
            .getDownloadURL()
            .then(url => {
              setUrl(url)
              console.log(url)
            });
          }
        );
    }

    const [data, setData] = useState({
        nombre: props.item.nombre,
        id_tienda: props.item.id_tienda,
        precio: props.item.precio,
        categoria: props.item.categoria,
        url_imagen: props.item.url_imagen,
        descripcion: props.item.descripcion
    });


    const updateField = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }


    let history = useHistory();

    const seCancela = () =>{
        setData({
            nombre: props.item.nombre,
            id_tienda: props.item.id_tienda,
            precio: props.item.precio,
            categoria: props.item.categoria,
            url_imagen: props.item.url_imagen,
            descripcion: props.item.descripcion
        });
        setProgress(0)
        setUrl("")
        console.log(props.item.url_imagen)
    }

    const editarClick = async(idProducto,idTienda) => {

        // if (data.url_imagen=="") {
        //     if (url == "") {
        //       data.url_imagen = props.item.url_imagen
        //     }

        // } else {
        //     data.url_imagen = url;
        // }

        if (url=="") {
            data.url_imagen= props.item.url_imagen
        } else {
            data.url_imagen = url;

        }
        setProgress(0)
        setUrl("")

        if (data.nombre!=="" && data.precio !=="" && data.categoria!="") {
            const body = data;
            const response = await fetch(`https://tiendas-unison-web.herokuapp.com/api/v1/editarProducto/${props.item.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
        }
    }

    return(
        <div id={"editar" + props.item.id} class="modal fade">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Editar</h4>
                    </div>
                    <div class="modal-body">
                        <form className="">

                            <div className="form-group row">
                                <label for="nombre" className="col-sm-2 col-form-label">Nombre:</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="nombre" name="nombre" value={data.nombre} onChange={updateField}></input>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label for="precio" className="col-sm-2 col-form-label">Precio:</label>
                                <div className="col-sm-10">
                                    <input type="number" className="form-control" id="precio" name="precio" value={data.precio} onChange={updateField} min="0"></input>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label for="categoria" className="col-sm-2 col-form-label">Categoría:</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="categoria" name="categoria" value={data.categoria} onChange={updateField}></input>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label for="imagen" className="col-sm-2 col-form-label">Imagen:</label>
                                <div className="col-sm-10">
                                    <input type="file" id="imagen" name="file" onChange={handleChange}></input>
                                    <br/>
                                        <progress value={progress} max="100"/>
                                    <br/>
                                </div>
                                <div className="col-sm-10 text-center">
                                    <img alt={"Imagen del producto: " + props.item.nombre} src={url||data.url_imagen||"https://via.placeholder.com/300x300"} className="imagenP"></img>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label for="descripcion" className="col-sm-2 col-form-label">Descripción:</label>
                                <div className="col-sm-10">
                                    <textarea className="form-control" id="descripcion" rows="5" name="descripcion" value={data.descripcion} onChange={updateField}></textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal" onClick={seCancela}>Cerrar</button>
                        <button type="button" class="btn btn-info" data-dismiss="modal"  onClick={editarClick}>Editar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Modal(props){


    let history = useHistory();


    const eliminarClick = async(idProducto,idTienda) => {
        const response = await fetch(`https://tiendas-unison-web.herokuapp.com/api/v1/eliminarProducto/${props.item.id}/${props.item.id_tienda}`, {
            method: "DELETE"
        });
    }

    return(
        <div id={"eliminar" + props.item.id} class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">¿Estás seguro?</h4>
                    </div>
                    <div class="modal-body">
                        <p>¿Seguro que quieres borrar {props.item.nombre}?</p>
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
