import React, {Fragment, useEffect, useState,  useContext} from 'react';
import {useHistory} from "react-router-dom";
import TiendaNavBar from './TiendaNavBar';
import {Link} from 'react-router-dom';
import { UserContext } from '../../UserContext'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './MiInfo.css';
import {storage} from '../../firebase'
import MiUbicacion from './MiUbicacion';

function MiInfoTable(props){
    // const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);

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
    nombre: props.info.nombre,
    horario: props.info.horario,
    tarjeta: props.info.tarjeta,
    id_tipo_tienda: props.info.id_tipo_tienda,
    url_imagen: props.info.url_imagen
  });

//   const [items, setItems] = useState([])
  const {user, setUser} = useContext(UserContext);
//   useEffect(()=>{
      
//   }, []);

//   const fetchitems = async ()=>{

//       const data = await fetch(`https://tiendas-unison-web.herokuapp.com/api/v1/tiendainfo/${user.id}`);
//       const json = await data.json();
//     console.log(json[0])
//       setItems(json[0]);
//   };

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
            const response = await fetch(`https://tiendas-unison-web.herokuapp.com/api/v1/tiendas/${user.id}`,
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
                              <p><small>Cooperativa/Puesto/Cafeteria</small></p>
                              <div>
                                <input
                                    id="id_tipo_tienda"
                                    type="text"
                                    name="id_tipo_tienda"
                                    value={data.id_tipo_tienda}
                                    onChange={updateField}
                                    ></input>
                              </div>
                              <div>
                                <label>Subir Imagen</label>
                                <div>
                                  <input type="file" id="profilePicture" name="file" onChange={handleChange} />
                                  <br/>
                                  <progress value={progress} max="100"/>
                                  <br/>
                                  {/* <button onClick={handleUpload}>UPLOAD</button> */}
                                </div>
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

export default MiInfoTable;