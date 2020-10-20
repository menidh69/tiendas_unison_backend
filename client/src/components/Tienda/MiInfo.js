import React, {Fragment, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import TiendaNavBar from './TiendaNavBar';
import {Link} from 'react-router-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './MiInfo.css';

function MiInfo(){
  let history = useHistory()
  const [data, setData] = useState({ //??????????/
    nombre: '',
    horario: '',
    url_imagen: '',
    tarjeta: ''
  });

  useEffect(()=>{
      fetchitems();
  }, []);
  const updateField = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  }

  const [items, setItems] = useState([])

  const fetchitems = async ()=>{
      const data = await fetch('http://localhost:5000/api/v1/tiendas'); //tiendainfo/${id} //spero dice q id: no especificado ?
      const items = await data.json();
      console.log(items)
      setItems(items)
  };


  const nuevaimg = e =>{ //src al input new pero no jala
    document.getElementsById('imgProfile').src('https://www.shitpostbot.com/resize/585/400?img=%2Fimg%2Fsourceimages%2Fdanny-devito-crying-5a39eaaadf642.jpeg');


  }

  const Editar = e => { //que se habiliten los campos con el tag 'td'
      var x = document.getElementsByTagName('td');
      for (var i = 0; i < x.length; i++) {
        x[i].contentEditable = "true";
      }
    }


  const Guardar = async (item)=>{
      var x = document.getElementsByTagName('td'); //los regresa a no edita
      for (var i = 0; i < x.length; i++) {
        x[i].contentEditable = "false";
      }


      let body = {}
      body = { //????  data nunca cambia de valores
        "nombre": data.nombre,
        "horario": data.horario,
        "url_imagen": data.url_imagen,
        "tarjeta": data.tarjeta
      }
      try{
          console.log(body)
          const response = await fetch(`http://localhost:5000/api/v1/actualizarInfo/${item.id}`,
          {
              method: "PUT",
              headers: {"Content-Type":"application/json"},
              body: JSON.stringify(body)
          });

      }catch(err){
          console.error(err)
      }
  }


    return(
        <Fragment>

          <div class="container">
                  <div class="row">
                      <div class="col-12">
                          <div class="card">

                            <div class="card-body">

                              <div class="card-title mb-4">
                                  <div class="d-flex justify-content-start">
                                      <div class="image-container">
                                          <img src="https://www.thedome.org/wp-content/uploads/2019/06/300x300-Placeholder-Image.jpg" id="imgProfile"  class="img-thumbnail" />
                                          <div class="middle">
                                              <input type="button" class="btn btn-secondary" id="btnChangePicture" value="Change" onClick={nuevaimg} />
                                              //<input type="file" id="profilePicture" name="file" />
                                          </div>
                                      </div>
                                      <div class="userData ml-3">
                                          <h2 class="d-block" >Mi Información</h2>
                                          <hr/>
                                          {items.map(item =>(
                                            <h2 class="d-block">{item.nombre}</h2>
                                          ))}

                                      </div>
                                      <div class="ml-auto">
                                          <input type="button" class="btn btn-primary d-none" id="btnDiscard" value="Discard Changes" />
                                    </div>
                                  </div>

                              </div>

                              <div class="row">

                                <button type="button" class="btn btn-primary" onClick={Editar}>Editar</button>
                                <hr/>
                                <button type="button" class="btn btn-primary" onClick={Guardar}>Guardar</button>

                                <div class="col-12">
                                    <ul class="nav nav-tabs mb-4" id="myTab" role="tablist">
                                      <li class = "nav-item">
                                        <a class="nav-link active" id="MyInfo-tab" data-toggle="tab" href="#MyInfo" role="tab" aria-controls="MyInfo" aria-selected="true">Perfil</a>
                                      </li>
                                      <li class = "nav-item">
                                        <a class="nav-link" id="MapaInfo-tab" data-toggle="tab" href="#MapaInfo" role="tab" aria-controls="MapaInfo" aria-selected="false">Mapa</a>
                                      </li>

                                    </ul>

                                    <div class="tab-content ml-1" id="myTabContent">
                                        <div class="tab-pane fade show active" id="MyInfo" role="tabpanel" aria-labelledby="MyInfo-tab">
                                          <table className="table table-striped">

                                              <tbody>
                                                {items.map(item => (
                                                    <tr key={item.id}>


                                                      <tr><th>Nombre tienda</th>
                                                            <td
                                                              id="nombre"
                                                              name="nombre"
                                                              value={data.nombre}
                                                              onChange={updateField}>{item.nombre}</td></tr>
                                                      <tr><th>Horario</th>
                                                            <td
                                                              contenteditable="false"
                                                              id="horario"
                                                              name='horario'
                                                              value={data.horario}
                                                              onChange={updateField}>{item.horario}</td></tr>
                                                      <tr><th>Acepta tarjeta</th>
                                                            <td
                                                              id='tarjeta'
                                                              name='tarjeta'
                                                              value={data.tarjeta}
                                                              onChange={updateField}>{item.tarjeta ? 'si':'no'}</td></tr>
                                                      <tr><th>Url Imagen</th>
                                                            <td
                                                              id='url_imagen'
                                                              name='url_imagen'
                                                              value={data.url_imagen}
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
