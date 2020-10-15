import React, {Fragment, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import TiendaNavBar from './TiendaNavBar';
import './MiInfo.css';

function MiInfo(){

  const [data, setData] = useState({
    nombre: '',
    horario: '',
    url_imagen: '',
    tarjeta: ''
  });

  useEffect(()=>{
      fetchitems();
  }, []);

  const [items, setItems] = useState([])

  const fetchitems = async ()=>{
      const data = await fetch(`http://localhost:5000/api/v1/tiendas`); //cambiar a /tiendainfo
      const items = await data.json();
      console.log(items)
      setItems(items)
  };

  const Editar = e => { //que se habiliten los campos
    var td = ['nombre', 'horario', 'tarjeta', 'url_imagen'];
    for (var i = 0; i < td.length; i++) {
      var x = document.getElementById(td[i]);
      if (x.contentEditable == "true") {
      x.contentEditable = "false";
      } else {
        x.contentEditable = "true";
      }
    }
  }

  const updateField = e => { //HACER QUE SE GUARDEN EN LA BD AHORA DE AQUI METER FUNCION
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
    var td = ['nombre', 'horario', 'tarjeta', 'url_imagen']; //los regresa a no editar
    console.log(td);
    for (var i = 0; i < td.length; i++) {
      var x = document.getElementById(td[i]);
      if (x.contentEditable == "true") {
      x.contentEditable = "false";
      } else {
        x.contentEditable = "true";
      }
    }
  }

    return(
        <Fragment>
          <TiendaNavBar/>
          <div class="container">
                  <div class="row">
                      <div class="col-12">
                          <div class="card">

                            <div class="card-body">

                              <div class="card-title mb-4">
                                  <div class="d-flex justify-content-start">
                                      <div class="image-container">
                                          <img src="http://placehold.it/300x300" id="imgProfile"  class="img-thumbnail" />
                                          <div class="middle">
                                              <input type="button" class="btn btn-secondary" id="btnChangePicture" value="Change" />
                                              <input type="file" id="profilePicture" name="file"/>
                                          </div>
                                      </div>
                                      <div class="userData ml-3">
                                          <h2 class="d-block" >Mi Información</h2>
                                          <hr/>
                                          <h2 class="d-block">Tienda Domo</h2>
                                      </div>
                                      <div class="ml-auto">
                                          <input type="button" class="btn btn-primary d-none" id="btnDiscard" value="Discard Changes" />
                                    </div>
                                  </div>

                              </div>

                              <div class="row">

                                <button type="button" class="btn btn-primary" onClick={Editar}>Editar</button>
                                <hr/>
                                <button type="button" class="btn btn-primary" onClick={updateField}>Guardar</button>

                                <div class="col-12">
                                    <ul class="nav nav-tabs mb-4" id="myTab" role="tablist">
                                      <li class="nav-item">
                                        <a class="nav-link active" id="MyInfo-tab" data-toggle="tab" href="#MyInfo" role="tab" aria-controls="MyInfo" aria-selected="true">Perfil</a>
                                      </li>
                                      <li class="nav-item">
                                        <a class="nav-link" id="MapaInfo-tab" data-toggle="tab" href="#MapaInfo" role="tab" aria-controls="MapaInfo" aria-selected="false">Mapa</a>
                                      </li>
                                    </ul>

                                    <div class="tab-content ml-1" id="myTabContent">
                                        <div class="tab-pane fade show active" id="MyInfo" role="tabpanel" aria-labelledby="MyInfo-tab">
                                          <table className="table table-striped">

                                              <tbody>
                                                {items.map(item => (
                                                    <tr key={item.id}>
                                                      <tr><th>ID</th><td>{item.id}</td></tr>
                                                      <tr><th>Nombre tienda</th>
                                                            <td
                                                              id="nombre"
                                                              name="nombre"
                                                              onChange={updateField}>{item.nombre}</td></tr>
                                                      <tr><th>Horario</th>
                                                            <td
                                                              contenteditable="false"
                                                              id="horario"
                                                              name='horario'
                                                              onChange={updateField}>{item.horario}</td></tr>
                                                      <tr><th>Acepta tarjeta</th>
                                                            <td
                                                              id='tarjeta'
                                                              name='tarjeta'
                                                              onChange={updateField}>{item.tarjeta ? 'si':'no'}</td></tr>
                                                      <tr><th>Url Imagen</th>
                                                            <td
                                                              id='url_imagen'
                                                              name='url_imagen'
                                                              onChange={updateField}>{item.url_imagen}</td></tr>
                                                  </tr>
                                              ))}
                                            </tbody>
                                          </table>
                                        </div>

                                        <div class="tab-pane fade" id="MapaInfo" role="tabpanel" aria-labelledby="MapaInfo-tab">
                                          Mapa para otro Sprint
                                        </div>
                                    </div>
                                </div>
                            </div>
                          </div>
                      </div>
                  </div>
              </div>
            </div>




        </Fragment>
    )
}

export default MiInfo;
