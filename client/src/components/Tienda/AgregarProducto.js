import React, {Fragment, useState, useContext, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './AgregarProducto.css';
import { UserContext } from '../../UserContext'
import { Component } from 'react';
import { render } from '@testing-library/react';


class AgregarProducto extends Component {

    constructor (props) {
        super(props);
        this.state={
            name: "agregar producto"
        }
    }


    render(){
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
                            <h6 className="izq">| Agregar Producto</h6>
                        </div>
                    </div>
                    <div class="mainContainer alinear">
                        <Formulario />
                        <div className="imagenContainer align-top">
                            <div className="imagenP"></div>
                        </div>
                        
                    </div>
                </div>
            </Fragment>
        );

    }
    

    
}


function Formulario () {


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
    const [items, setItems] = useState([]);

    useEffect(() =>{
        fetchitems();
    }, []);

    const fetchitems = async (id) => {
        const data = await fetch(`http://localhost:5000/api/v1/miTienda/${user.id}`);
        const  it= await data.json();
        setItems(it[0]);
        console.log(items);
    }


      const updateField = e => {
        setData({
          ...data,
          [e.target.name]: e.target.value
        });
      }
      console.log(data);

    const onSubmitForm = async e => {

        
        e.preventDefault();
        if (data.nombre!=="" && data.precio !=="" && data.categoria!="") {
            const body = data;
            const response = await fetch('http://localhost:5000/api/v1/nuevoProducto', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
            history.push("/panel/Menu/EditarMenu");
        }
    }

    data.id_tienda = items.id;

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

export default AgregarProducto;