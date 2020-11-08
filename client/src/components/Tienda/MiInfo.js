import React, {Fragment, useEffect, useState,  useContext} from 'react';
import {useHistory} from "react-router-dom";
import TiendaNavBar from './TiendaNavBar';
import {Link} from 'react-router-dom';
import { UserContext } from '../../UserContext'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './MiInfo.css';
import {storage} from '../../firebase'
import MiUbicacion from './MiUbicacion';


function MiInfo(){
    // const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const [markerPosition, setMarkerPosition] = useState({
    
    })
    

    const handleChange = async e => {
      if (e.target.files[0]){
        handleUpload(e.target.files[0])
      }
    };

    const TipoTienda = () => {
      switch (items.id_tipo_tienda) {
        case 1:
          return 'Cooperativa';
          break;
        case 2:
          return 'Puesto';
          break;
        case 3:
          return 'Cafeteria';
          break;
        default:
          return 'esta mal';

      }
    }

    

  const GuardarUbi = async()=>{
      try{
          const response = await fetch(`http://localhost:5000/api/v1/tiendas/ubicacion/${items['id']}`,
          {
              method: "PUT",
              headers: {"Content-Type":"application/json"},
              body: JSON.stringify(markerPosition)

          });
          const result = await response.json();
          if(result.status){
              console.log(result)       
              setItems({...items, 'ubicacion.lat': markerPosition.lat, 'ubicacion.lng': markerPosition.lng})    
          }
    }catch(err){
        console.error(err)

    }
  }

  const setLocation = (e)=>{
      const latLng = e.latLng;
      let latitud = latLng.lat()
      let longitud = latLng.lng()
      let coordinates = {
          lat: latitud,
          lng: longitud
      }
      console.log(coordinates)
      setMarkerPosition(coordinates)
      // props.handleLocation(coordinates)
  }

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
            });
          }
        );
    };

  let history = useHistory()
  const [data, setData] = useState({
    nombre: '',
    horario: '',
    tarjeta: '',
    id_tipo_tienda: '',
    url_imagen: ''

  });

  const [items, setItems] = useState([])
  const {user, setUser} = useContext(UserContext);
  useEffect(()=>{
      let isMounted = true;
      if(isMounted){
        fetchitems()
        .then(json=>{
          setItems(json);
          setMarkerPosition({ lat: json['ubicacion.lat'], lng: json['ubicacion.lng']})
          setData(json)
        })    
      } 
      return ()=>{isMounted=false}
      
  }, []);

  const fetchitems = async ()=>{

      const data = await fetch(`http://localhost:5000/api/v1/tiendainfo/${user.id}`);
      const json = await data.json();
     return json[0];
  };

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
        }else if (data.id_tipo_tienda=="puesto" || data.id_tipo_tienda=="Puesto") {
              data.id_tipo_tienda = 2
        }else if (data.id_tipo_tienda=="cafeteria" || data.id_tipo_tienda=="Cafeteria") {
              data.id_tipo_tienda = 3
        }
      }else if (data.id_tipo_tienda == "") {
        data.id_tipo_tienda = items.id_tipo_tienda
      }

      if (data.url_imagen=="") {
        if (url == "") {
          data.url_imagen = items.url_imagen
        }else {
          data.url_imagen = url
        }

      }
      const body = data;
      console.log(data);
      try{
            const response = await fetch(`http://localhost:5000/api/v1/tiendas/${user.id}`,
            {
                method: "PUT",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(body)

            });
            window.location = '/panel/MiInfo'
            history.push("/panel/MiInfo")


      }catch(err){
          console.error(err)

      }
  }




    return(
        <Fragment>

          <div class="container">
                  <div class="row">
                      <div class="col-md-6">
                          <div class="card">
                            <div class="card-body">
                              
                              <div class="card-title mb-4">
                                  <div class="justify-content-start">
                                  <h2 class="d-block" >Mi Información</h2>
                                          <hr/>
                                      <h2 class="d-block">{items.nombre}</h2>
                                      <div class="image-container">
                                          <img className="rounded" src={items.url_imagen ||"https://via.placeholder.com/300x300"} id="imgProfile"   width="100%" height="100%"/>
                                      </div>
                                      
                                      <div class="ml-auto">
                                          <input type="button" class="btn btn-primary d-none" id="btnDiscard" value="Discard Changes" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              </div>
                              </div>

                              <div class="col-6">      
                                    <ul class="nav nav-tabs mb-4" id="myTab" role="tablist">
                                      <li class = "nav-item mx-4 px-2">
                                        <a class="nav-link active bg-light mx-4 text-dark" id="MyInfo-tab" data-toggle="tab" href="#MyInfo" role="tab" aria-controls="MyInfo" aria-selected="true">Perfil</a>
                                      </li>
                                      <li class = "nav-item mx-4 px-2">
                                        <a class="nav-link mx-4 bg-light text-dark" id="MapaInfo-tab" data-toggle="tab" href="#MapaInfo" role="tab" aria-controls="MapaInfo" aria-selected="false">Mapa</a>
                                      </li>

                                    </ul>

                                    <div class="tab-content mx-2" id="myTabContent">
                                        <div class="tab-pane fade show active" id="MyInfo" role="tabpanel" aria-labelledby="MyInfo-tab">
                                          <div className="container text-center">
                                          <table className="table table-striped text-left">
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
                                                            <td>{TipoTienda()}</td>
                                                      </tr>
                                                  </tr>

                                            </tbody>
                                          </table>
                                          
                                          <button type="button" className="btn btn-primary mx-auto" data-toggle="modal" href="#Editar">Editar Mi Informacion</button>
                                          </div>
                                        </div>

                                        <div class="tab-pane fade text-center" id="MapaInfo" role="tabpanel" aria-labelledby="MapaInfo-tab">
                                          <MiUbicacion info={items} Guardar={GuardarUbi} setLocation={setLocation} markerPosition={markerPosition}/>
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
                            <form>
                            <div className="form-group my-2">
                              <label for="nombre">Nombre de Tienda</label>
                                <input
                                id="nombre"
                                type="text"
                                name="nombre"
                                className="form-control"
                                value={data.nombre}
                                onChange={updateField}
                                ></input>
                              </div>

                              <div className="form-group my-2">
                              <label for="horario">Horario</label>
                                <input
                                    id="horario"
                                    type="text"
                                    name="horario"
                                    className="form-control"
                                    value={data.horario}
                                    onChange={updateField}
                                    ></input>
                              </div>
                              
                              <div className="form-group my-2">
                              <label for="tarjeta">Acepta tarjeta?</label>
                              {/* <p><small>Si/No</small></p> */}
                                <input
                                    id="tarjeta"
                                    type="text"
                                    name="tarjeta"
                                    className="form-control"
                                    value={data.tarjeta}
                                    onChange={updateField}
                                    ></input>
                              </div>
                              
                              <div className="form-group my-2">
                              <label for="id_tipo_tienda">Tipo de tienda</label>
                              {/* <p><small>Cooperativa/Puesto/Cafeteria</small></p> */}
                                <input
                                    id="id_tipo_tienda"
                                    type="text"
                                    name="id_tipo_tienda"
                                    className="form-control"
                                    value={data.id_tipo_tienda}
                                    onChange={updateField}
                                    ></input>
                              </div>
                              <div className="form-group my-2">
                                <label htmlFor="profilePicture">Subir Imagen</label>
                                <div>
                                  <input type="file" id="profilePicture" name="file" onChange={handleChange} />
                                  <br/>
                                  <progress value={progress} max="100"/>
                                  <br/>
                                  {/* <button onClick={handleUpload}>UPLOAD</button> */}
                                </div>
                              </div>
                              </form>
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
