import React, {Fragment, useEffect, useState,  useContext} from 'react';
import {useHistory} from "react-router-dom";
import { UserContext } from '../../UserContext'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import '../LandingPage.css';
import ClienteNavBar from './ClienteNavBar';


function PerfilCliente(){
  

let history = useHistory()
const [data, setData] = useState({
  nombre: '',
  contra: '',
  tel: ''
});

const [items, setItems] = useState([])
const {user, setUser} = useContext(UserContext);
useEffect(()=>{
    fetchitems();
}, []);

const fetchitems = async ()=>{

    const data = await fetch(`http://localhost:5000/api/v1/usuarioinfo/${user.id}`);
    const items = await data.json();

    setItems(items[0]);
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
    if (data.contra=="") {
      data.contra = items.contra
    }
    if (data.tel=="") {
      data.tel = items.tel
    }

    const body = data;
    console.log(data);
    try{
          const response = await fetch(`http://localhost:5000/api/v1/usuarios/${user.id}`,
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

const eliminar = async (id)=>{
  try{
      const response = await fetch(`http://localhost:5000/api/v1/usuariosdelete/${id}`,
      {
          method: "DELETE",
      });
      //setItems(items.filter(item => item.id !== id));
      localStorage.removeItem('token.tuw')
      alert('Gracias, adios')
      setUser(null);
      history.push("/")
  }catch(err){
      console.error(err)
  }
}



  return(
    <Fragment>
        
    <div className="infoloco container">
            <div class="row">
                <div class="col-12">
                    <div class="card">

                      <div class="card-body">

                        <div class="card-title mb-4">
                            <div class="d-flex justify-content-start">
                                
                                <div class="userData ml-3">
                                 <button type="button" className="botoloco btn btn-primary" data-toggle="modal" href="#Editar">Editar</button>
                                    <h2 className="amigos d-block" >Mi Información</h2>
                                    
                                    <hr/>

                                      <h2 className="amigoss d-block">{items.nombre}</h2>


                                </div>
                                <div class="ml-auto">
                                    <input type="button" class="btn btn-primary d-none" id="btnDiscard" value="Discard Changes" />
                              </div>
                            </div>

                        </div>

                        <div class="row">
                          <hr/>
                          

                          <div class="col-12">
                              <ul class="nav nav-tabs mb-4" id="myTab" role="tablist">
                                <li class = "nav-item">
                                  <a class="nav-link active" id="MyInfo-tab" data-toggle="tab" href="#MyInfo" role="tab" aria-controls="MyInfo" aria-selected="true">Perfil</a>
                                </li>
                                

                              </ul>

                              <div class="tab-content ml-1" id="myTabContent">
                                  <div class="tab-pane fade show active" id="MyInfo" role="tabpanel" aria-labelledby="MyInfo-tab">
                                    <table className="table table-striped">

                                        <tbody>

                                          <tr>
                                                <tr><th>Nombre</th>
                                                      <td>{items.nombre}</td>
                                                </tr>
                                                <tr><th>Contraseña</th>
                                                      <td>{items.contra}</td>
                                                </tr>
                                                <tr><th>Telefono</th>
                                                      <td>{items.tel}</td>
                                                </tr>
                                            </tr>

                                      </tbody>
                                    </table>
                                  </div>       
                              </div>
                              <button className="botonn" data-toggle="modal" href="#Modal">Eliminar cuenta</button>
                              <div id="Modal" class="modal">
                         <div class="modal-dialog">
                         <div class="modal-content">
                         <div class="modal-header">
                          
                            <h4 class="modal-title">¿Estás seguro?</h4>
                        </div>
                        <div class="modal-body">
                            <p>¿Seguro que quieres eliminar tu perfil ?</p>
                            <p class="text-danger"><small>Si lo borras, nunca podrás recuperarlo.</small></p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                            <button type="button" class="btn btn-danger" onClick={()=>eliminar(user.id)} data-dismiss="modal" >Eliminar</button>
                          </div>
                      </div>
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
                      
                      <h4 class="modal-title">Editar Mi Información</h4>
                  </div>
                  <div class="modal-body">

                        <label for="nombre">Nombre</label>
                        <div>
                          <input
                          id="nombre"
                          type="text"
                          name="nombre"
                          value={data.nombre}
                          onChange={updateField}
                          ></input>
                        </div>
                        <label for="contra">Contraseña</label>
                        <div>
                          <input
                              id="contra"
                              type="text"
                              name="contra"
                              value={data.contra}
                              onChange={updateField}
                              ></input>
                        </div>
                        <label for="tel">Telefono</label>
                        <div>
                          <input
                          id="tel"
                          type="text"
                          name="tel"
                          value={data.tel}
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
)}  


export default PerfilCliente;
