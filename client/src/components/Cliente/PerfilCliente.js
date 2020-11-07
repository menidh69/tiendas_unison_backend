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
  tel: '',
  nombre_titular:'',
  num_tarjeta:'',
  exp_date:'',
  cvv:'',
  cpp:''
});



const [items, setItems] = useState({})
const {user, setUser} = useContext(UserContext);
useEffect(()=>{
    fetchitems();
}, []);

const fetchitems = async ()=>{

    const data = await fetch(`http://localhost:5000/api/v1/usuarioinfoperfil/${user.id}`);
    const json = await data.json();
    console.log(json[0])
    setItems(json[0]);
    setData(json[0]);

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
          // window.location = '/panel/MiInfo'
          // history.push("/panel/MiInfo")
          fetchitems();

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


const GuardarInfoBank = async (id)=>{
      const body = data;
        try{
              const response = await fetch(`http://localhost:5000/api/v1/infobanco/${user.id}`,
              {
                  method: "PUT",
                  headers: {"Content-Type":"application/json"},
                  body: JSON.stringify(body)
              });
              fetchitems();
        }catch(err){
            console.error(err)
        }
}

  return(
    <Fragment>

    <div className="container">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                      <div class="card-body">
                        <div class="card-title mb-4">
                            <div className="">
                                <div class="text-center ml-3">
                                    <h2 className="" >Mi Información</h2>
                                    <hr/>
                                </div>
                                {/* <div class="ml-auto">
                                    <input type="button" class="btn btn-primary d-none" id="btnDiscard" value="Discard Changes" />
                              </div> */}
                            </div>
                        </div>
                        <div class="row">
                          <hr/>
                          <div class="col-12">
                              <ul class="nav nav-tabs mb-4" id="myTab" role="tablist">
                                <li class = "nav-item">
                                  <a class="nav-link active" id="MyInfo-tab" data-toggle="tab" href="#MyInfo" role="tab" aria-controls="MyInfo" aria-selected="true">Perfil</a>
                                </li>
                                <li class = "nav-item">
                                  <a class="nav-link" id="InfoBank-tab" data-toggle="tab" href="#InfoBank" role="tab" aria-controls="InfoBank" aria-selected="false">Información Bancaria</a>
                                </li>
                              </ul>
                              <div class="tab-content ml-l" id="myTabContent">
                                  <div class="tab-pane fade show active" id="MyInfo" role="tabpanel" aria-labelledby="MyInfo-tab">
                                    <table className="table table-striped ">

                                        <tbody>

                                          <tr>
                                                <tr><th>Nombre</th>
                                                      <td>{items.nombre}</td>
                                                </tr>
                                                <tr><th>Email</th>
                                                      <td>{items.email}</td>
                                                </tr>
                                                <tr><th>Telefono</th>
                                                      <td>{items.tel}</td>
                                                </tr>

                                            </tr>

                                      </tbody>
                                    </table>
                                    <button className="btn btn-lg btn-danger rounded-pill mx-2" data-toggle="modal" href="#Modal">Eliminar cuenta</button>
                                    <button type="button" className="btn btn-lg btn-primary rounded-pill mx-2" data-toggle="modal" href="#Editar">Editar</button>
                                  </div>
                                  <div class="tab-pane fade" id="InfoBank" role="tabpanel" aria-labelledby="InfoBank-tab">
                                    <table className="table table-striped">
                                      <tbody>
                                        <tr>
                                          <tr>
                                            <th>Titular de la tarjeta</th>
                                            <td>{items['info_bancarium.nombre_titular']}</td>
                                          </tr>
                                          <tr>
                                            <th>Número Tarjeta<br/>
                                            <small>eg 5555 5555 5555 5555</small></th>
                                            <td>{items['info_bancarium.num_tarjeta']}</td>
                                          </tr>
                                          <tr>
                                            <th>Fecha de expiración <br/> <small>MM/YY</small></th>
                                            <td>{items['info_bancarium.exp_date']}</td>
                                          </tr>
                                          <tr>
                                            <th>CVV <br/>
                                            <small>Código de 3 digitos de la parte trasera de tu tarjeta</small> </th>
                                            <td>{items['info_bancarium.cvv']}</td>
                                          </tr>
                                          <tr>
                                            <th>Código Postal</th>
                                            <td>{items['info_bancarium.cpp']}</td>
                                          </tr>
                                        </tr>
                                      </tbody>

                                    </table>
                                    <button className="btn btn-lg btn-danger rounded-pill mx-2" data-toggle="modal" href="#Modal">Eliminar cuenta</button>
                                    <button type="button" className="btn btn-lg btn-primary rounded-pill mx-2" data-toggle="modal" href="#EditarInfoBank">Editar</button>
                                  </div>
                              </div>


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
                            <button type="button" className="btn btn-default" data-dismiss="modal">Cerrar</button>
                            <button type="button" className="btn btn-danger" onClick={()=>eliminar(user.id)} data-dismiss="modal" >Eliminar</button>
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
                          <div className="form-group">
                        <label for="nombre">Nombre</label>
                        <div>
                          <input
                          id="nombre"
                          type="text"
                          name="nombre"
                          className="form-control"
                          value={data.nombre}
                          onChange={updateField}
                          ></input>
                        </div>
                        </div>
                        {/* <label for="contra">Contraseña</label>
                        <div>
                          <input
                              id="contra"
                              type="text"
                              name="contra"
                              value={data.contra}
                              onChange={updateField}
                              ></input>
                        </div> */}
                        <div className="form-group">
                        <label for="tel">Telefono</label>
                        <div>
                          <input
                          id="tel"
                          type="text"
                          name="tel"
                          className="form-control"
                          value={data.tel}
                          onChange={updateField}
                          ></input>
                        </div>
                        </div>



                  </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                      <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={()=>Guardar(user.id)}>Guardar</button>
                  </div>
              </div>
          </div>
      </div>

      <div id="EditarInfoBank" class="modal fade">
          <div class="modal-dialog">
              <div class="modal-content">
                  <div class="modal-header">
                      <h4 class="modal-title">Editar Información Bancaria</h4>
                      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>

                  </div>
                  <div class="modal-body">

                        <label for="nombre">Titular de la tarjeta</label>
                        <div>
                          <input
                          class="form-control"
                          id="nombre_titular"
                          type="text"
                          name="nombre_titular"
                          value={data.nombre_titular}
                          onChange={updateField}
                          ></input>
                        </div>
                        <label for="num_tarjeta">Número de tarjeta</label>
                        <p><small>Ingresa un número de tarjeta de 16 digitos </small></p>
                         <div>
                          <input
                              class="form-control"
                              id="num_tarjeta"
                              type="tel"
                              name="num_tarjeta"
                              value={data.num_tarjeta}
                              onChange={updateField}
                              ></input>
                        </div>
                        <label for="exp_date">Fecha Expiracion</label>
                        <div>
                          <input
                              class="form-control"
                              id="exp_date"
                              type="tel"
                              name="exp_date"
                              placeholder="MM / YY"
                              value={data.exp_date}
                              onChange={updateField}
                              ></input>
                        </div>
                        <label for="cvv">Cvv</label>
                        <p><small> Código de 3 digitos de la parte trasera de tu tarjeta</small></p>
                        <div>
                          <input
                              class="form-control"
                              id="cvv"
                              type="tel"
                              name="cvv"
                              value={data.cvv}
                              onChange={updateField}
                              ></input>
                        </div>
                        <label for="cpp">Código Postal</label>
                        <div>
                          <input
                              class="form-control"
                              id="cpp"
                              type="text"
                              name="cpp"
                              value={data.cpp}
                              onChange={updateField}
                              ></input>
                        </div>

                  </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                      <button type="button" class="btn btn-success" data-dismiss="modal"onClick={()=>GuardarInfoBank(user.id)}>Guardar</button>
                  </div>
              </div>
          </div>
      </div>

  </Fragment>
)}


export default PerfilCliente;
