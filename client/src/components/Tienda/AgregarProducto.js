import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import './AgregarProducto.css';

const AgregarProducto = ()=> {

    return(

        <Fragment>
            <div className="mainContainer h">
                <div className="top-container">
                    <div className="top-container-item izq">
                        <a className="atras izq" href="/">
                            <h6 className="izq">← Atras</h6>
                        </a>
                        <h6 className="izq">| Agregar Producto</h6>
                    </div>
                </div>
                <div class="mainContainer alinear">
                    <Formulario/>
                    <div className="imagenContainer">
                        <div className="imagenP"></div>
                    </div>
                    <div>
                        <button className="btn btn-success">Guardar</button>
                        <button className="btn btn-danger ml">Cancelar</button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

function Formulario () {
    return(
    <form className="formulario">
        <div className="form-group row">
            <label for="nombre" className="col-sm-2 col-form-label">Nombre:</label>
            <div className="col-sm-10">
                <input type="text" className="form-control" id="nombre"></input>
            </div>
        </div>
        <div className="form-group row">
            <label for="precio" className="col-sm-2 col-form-label">Precio:</label>
            <div className="col-sm-10">
                <input type="text" className="form-control" id="precio"></input>
            </div>
        </div>
        <div className="form-group row">
            <label for="categoria" className="col-sm-2 col-form-label">Categoría:</label>
            <div className="col-sm-10">
                <input type="text" className="form-control" id="categoria"></input>
            </div>
        </div>
        <div className="form-group row">
            <label for="imagen" className="col-sm-2 col-form-label">Imagen:</label>
            <div className="col-sm-10">
                <input type="file" className="form-control-file" id="imagen"></input>
            </div>
        </div>
        <div className="form-group row">
            <label for="descripcion" className="col-sm-2 col-form-label">Descripción:</label>
            <div className="col-sm-10">
                <textarea className="form-control" id="descripcion" rows="5"></textarea>
            </div>
        </div>
        
    </form>
    );
}

export default AgregarProducto;