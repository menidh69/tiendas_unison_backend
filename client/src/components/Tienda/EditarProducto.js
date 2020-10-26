import React, {Fragment, useState, useContext, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './AgregarProducto.css';
import { UserContext } from '../../UserContext'
import { Component } from 'react';
import { render } from '@testing-library/react';


class EditarProducto extends Component {

    constructor (props) {
        super(props);
        this.state={
            name: "agregar producto"
        }
    }


    render(){
        const { match: {params } } = this.props;
        return(

            <Fragment>
                <div className="mainContainer h">
                    <div className="top-container">
                        <div className="top-container-item izq">
                            <Link to="/panel/Menu/EditarMenu">
                            <a className="atras izq" href="/">
                                <h6 className="izq">← Atras</h6>
                            </a>
                            </Link>
                            <h6 className="izq">| Editar Producto</h6>
                        </div>
                    </div>
                    <div class="mainContainer alinear">
                        <Formulario id={params.id}></Formulario>
                        <div className="imagenContainer align-top">
                            <div className="imagenP"></div>
                        </div>
                        
                    </div>
                </div>
            </Fragment>
        );

    }
}

function Formulario(props) {
    let history = useHistory();

    const [data, setData] = useState({
        nombre: '',
        id_tienda: '',
        precio: '',
        categoria: '',
        imagen: '',
        descripcion: ''
    });

    const {user, setUser} = useContext(UserContext);
    const [producto, setProducto] = useState([]);

    useEffect(() =>{
        fetchitems();
    }, []);

    const fetchitems = async (idTienda, idProducto) => {
        const data = await fetch(`http://localhost:5000/api/v1/miTienda/${user.id}`);
        const  it= await data.json();
        const data2 = await fetch(`http://localhost:5000/api/v1/productosTienda/${it[0].id}/${props.id}`);
        const it2 = await data2.json();
        setProducto(it2[0]);
        data.nombre = it2[0].nombre;
    }



    const updateField = e => {
    setData({
        ...data,
        [e.target.name]: e.target.value
    });
    }

    const onSubmitForm = async e => {

        
        e.preventDefault();
        if (data.nombre!=="" && data.precio !=="" && data.categoria!="") {
            const body = data;
            const response = await fetch(`http://localhost:5000/api/v1/editarProducto/${producto.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
            history.push("/panel/Menu/EditarMenu");
        }
    }

    console.log(data);
    
    data.id_tienda=producto.id_tienda;
    return(
        <form className="formulario" onSubmit={onSubmitForm}>
            
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
                    <input type="file" className="form-control-file" id="imagen" name="imagen" value={data.imagen} onChange={updateField}></input>
                </div>
            </div>
            <div className="form-group row">
                <label for="descripcion" className="col-sm-2 col-form-label">Descripción:</label>
                <div className="col-sm-10">
                    <textarea className="form-control" id="descripcion" rows="5" name="descripcion" value={data.descripcion} onChange={updateField}></textarea>
                </div>
            </div>
            <div className="form-group row">
                <div className="col-sm-10 m-auto">
                    <Link to="/panel/Menu/EditarMenu">
                        <button className="btn btn-danger ml float-right">Cancelar</button>
                    </Link>
                    <button className="btn btn-success float-right" type="submit">Guardar</button>
                </div>
            </div>
            
        </form>
        );
}


export default EditarProducto;