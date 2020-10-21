import React, {Fragment, useEffect, useState,  useContext} from 'react';
import {useHistory} from "react-router-dom";
import TiendaNavBar from './TiendaNavBar';
import {Link} from 'react-router-dom';
import { UserContext } from '../../UserContext'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './MiInfo.css';

function MiInfo(){
  let history = useHistory()
  const [data, setData] = useState({
    nombre: '',
    horario: '',
    tarjeta: '',
    id_tipo_tienda: "",
    url_imagen: ' '

  });

  const [items, setItems] = useState([])
  const {user, setUser} = useContext(UserContext);
  useEffect(()=>{
      fetchitems();
  }, []);

  const fetchitems = async ()=>{

      const data = await fetch(`http://localhost:5000/api/v1/tiendainfo/${user.id}`);
      const items = await data.json();

      setItems(items[0]);
  };


    const nuevaimg = e =>{ //src al input new pero no jala
      document.getElementsById('imgProfile').src(`https://www.shitpostbot.com/resize/585/400?img=%2Fimg%2Fsourceimages%2Fdanny-devito-crying-5a39eaaadf642.jpeg`);
    }

  const updateField = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  }


  const Guardar = async (id)=>{

      if (data.nombre==""){
        data.nombre = items.nombre
      }
      if (data.horario=="") {
        data.horario = items.horario
      }
      if (data.tarjeta!=="") {
        if(data.tarjeta=="no" || data.tarjeta=="No" ){
            data.tarjeta = 0
        }else if (data.tarjeta=="si" || data.tarjeta=="Si") {
              data.tarjeta = 1
        }
      }else if (data.tarjeta =="") {
        data.tarjeta = items.tarjeta
      }

      if (data.id_tipo_tienda!=="") {
        if(data.id_tipo_tienda=="cooperativa" || data.id_tipo_tienda=="Cooperativa"){
            data.id_tipo_tienda = 1
        }else if (data.id_tipo_tienda=="tienda" || data.id_tipo_tienda=="Tienda") {
              data.id_tipo_tienda = 2
        }
      }else if (data.id_tipo_tienda =="") {
        data.tarjeta = items.id_tipo_tienda
      }

      if (data.url_imagen=="") {
        data.url_imagen = items.url_imagen
      }
      const body = data;
      try{
            const response = await fetch(`http://localhost:5000/api/v1/tiendas/${user.id}`,
            {
                method: "PUT",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(body)

            });
            window.location = '/panel/MiInfo'


      }catch(err){
          console.error(err)
          console.log(err);
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

                                            <h2 class="d-block">{items.nombre}</h2>


                                      </div>
                                      <div class="ml-auto">
                                          <input type="button" class="btn btn-primary d-none" id="btnDiscard" value="Discard Changes" />
                                    </div>
                                  </div>

                              </div>

                              <div class="row">
                                <hr/>
                                <button type="button" class="btn btn-primary" data-toggle="modal" href="#Editar">Editar</button>

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

                                                <tr>
                                                      <tr><th>Nombre tienda</th>
                                                            <td>{items.nombre}</td>
                                                      </tr>
                                                      <tr><th>Horario</th>
                                                            <td>{items.horario}</td>
                                                      </tr>
                                                      <tr><th>Acepta tarjeta</th>
                                                            <td>{items.tarjeta ? 'Si':'No'}</td>
                                                      </tr>
                                                      <tr><th>Tipo de tienda</th>
                                                            <td>{items.id_tipo_tienda ? 'Cooperativa':'Tienda'}</td>
                                                      </tr>
                                                      <tr><th>Url Imagen</th>
                                                            <td>{items.url_imagen}</td>
                                                      </tr>
                                                  </tr>

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
            <div id="Editar" class="modal fade">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title">Editar Mi Información</h4>
                        </div>
                        <div class="modal-body">

                              <label for="nombre">Nombre de Tienda</label>
                              <div>
                                <input
                                id="nombre"
                                type="text"
                                name="nombre"
                                value={data.nombre}
                                onChange={updateField}
                                ></input>
                              </div>
                              <label for="horario">Horario</label>
                              <div>
                                <input
                                    id="horario"
                                    type="text"
                                    name="horario"
                                    value={data.horario}
                                    onChange={updateField}
                                    ></input>
                              </div>
                              <label for="tarjeta">Acepta tarjeta?</label>
                              <p><small>Si/No</small></p>
                              <div>
                                <input
                                    id="tarjeta"
                                    type="text"
                                    name="tarjeta"
                                    value={data.tarjeta}
                                    onChange={updateField}
                                    ></input>
                              </div>
                              <label for="id_tipo_tienda">Tipo de tienda</label>
                              <p><small>Cooperativa/Tienda</small></p>
                              <div>
                                <input
                                    id="id_tipo_tienda"
                                    type="text"
                                    name="id_tipo_tienda"
                                    value={data.id_tipo_tienda}
                                    onChange={updateField}
                                    ></input>
                              </div>
                              <label for="url_imagen">Url imagen</label>
                              <div>
                                <input
                                    id="url_imagen"
                                    type="text"
                                    name="url_imagen"
                                    value={data.url}
                                    onChange={updateField}
                                    ></input>
                            </div>


                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={()=>Guardar(user.id)}>Guardar</button>
                        </div>
                    </div>
                </div>
            </div>




        </Fragment>
    )
}

export default MiInfo;
