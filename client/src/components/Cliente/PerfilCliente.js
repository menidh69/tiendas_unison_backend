import React, {Fragment, useEffect, useState,  useContext} from 'react';
import {useHistory} from "react-router-dom";
import { UserContext } from '../../UserContext'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import '../LandingPage.css';
import ClienteNavBar from './ClienteNavBar';
import { Modal, Button, Card, Accordion } from "react-bootstrap";


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


function validarcpp(cpp) {
  const regex_cpp = new RegExp(/\d{5}/);
  if (!regex_cpp.test(cpp) ) {
    return alert('Introduce un codigo postal valido de 5 digitos ');
  }
}
function validarnum(num_tarjeta) {
  const regex_numtarjeta = new RegExp(/(\d{4} *\d{4} *\d{4} *\d{4})/);
  if(!regex_numtarjeta.test(num_tarjeta)) {
     return alert('Introduce un numero de tarjeta valido de 16 digitos ');
  }
}
function validarexo(exp_date) {
  const regex_expdate =  new RegExp(/(\d{2})\/?(\d{2})/);
  if(!regex_expdate.test(exp_date)){
    return alert('Introduce bien el mes/año');
  }
}

function validarcvv(cvv) {
  const regex_cvv = new RegExp(/\d{3}/);
  if (!regex_cvv.test(cvv)) {
    return alert('Introduce el código de 3 digitos ');
  }
}

const GuardarInfoBank = async (id)=>{
  if (validarnum(data.num_tarjeta) != true) {
  }
  if (validarexo(data.exp_date) != true ) {
  }
  if (validarcvv(data.cvv) != true) {
  }
  if (validarcpp(data.cpp) != true ) {
  }
  if (data.num_tarjeta !=="" && data.exp_date != "" && data.nombre_titular != "" && data.cvv != "" && data.cpp != "") {
    try{
          const body = data;
          const response = await fetch(`http://localhost:5000/api/v1/infobanco/${user.id}`,
          {
              method: "POST",
              headers: {"Content-Type":"application/json"},
              body: JSON.stringify(body)
          });
          fetchitems();
    }catch(err){
        console.error(err)
    }
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
                                    <Info/>
                                    <button className="btn btn-lg btn-danger rounded-pill mx-2" data-toggle="modal" href="#Modal">Eliminar cuenta</button>
                                    <button type="button" className="btn btn-lg btn-primary rounded-pill mx-2" data-toggle="modal" href="#GuardarInfoBank">Agregar Nueva info Bancaria</button>
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
      <div id="GuardarInfoBank" class="modal fade">
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
                        <p><small>Ingresa un número de tarjeta de 16 digitos eg. 5555 5555 5555 5555</small></p>
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
                        <label for="exp_date">Fecha Expiración</label>
                        <p><small>eg. 04/28</small></p>
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
                              type="text"
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
                              type="tel"
                              name="cpp"
                              value={data.cpp}
                              onChange={updateField}
                              ></input>
                        </div>
                  </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                      <button type="button" class="btn btn-success" data-dismiss="modal" onClick={()=>GuardarInfoBank(user.id)}>Guardar</button>
                  </div>
              </div>
          </div>
      </div>
  </Fragment>
)}

function Info() {
  const {user, setUser} = useContext(UserContext);
  const [infobank, setInfobank] = useState([]);
  const [data, setData] = useState({
    nombre_titular:'',
    num_tarjeta: '',
    exp_date: '',
    cvv: '',
    cpp: ''});
    const updateField = e => {
      setData({
        ...data,
        [e.target.name]: e.target.value
      });
    }


  useEffect(() =>{
      fetchitems();
  }, []);


  const fetchitems = async (id)=>{
      const data = await fetch(`http://localhost:5000/api/v1/infobanco/${user.id}`);
      const  it= await data.json();
      setInfobank(it);
  };

  const Editar = async (infobanks)=>{
    console.log(infobanks);
    try{
          console.log("ESTO ES DATA ", data);
          const body = data;
          const response = await fetch(`http://localhost:5000/api/v1/infobanco/${infobanks.id}`,
          {
              method: "PUT",
              headers: {"Content-Type":"application/json"},
              body: JSON.stringify(body)
          });
          fetchitems();
    }catch(err){
      console.log(err);
        console.error(err)
    }
  }

  if(infobank ==null || infobank.length ==0) {
        return(
          <>
            <div className="menu-container">
                <div className="row">
                    <div className="menuItem">
                        <p className="nomargin">Aun no ha agregado ninguna tarjeta.</p>
                    </div>
                </div>
            </div>
            </>
        );}

    if (infobank.length > 0) {
      return(
          <>
                  {infobank.map(infobanks => (
                      <div>
                        <Accordion>
                          <Card>
                            <Card.Header>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                Tarjeta
                              </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                              <Card.Body>
                                <p><b>Titular: </b>{infobanks.nombre_titular}</p>
                                <p><b>Numero Tarjeta:</b> {infobanks.num_tarjeta}</p>
                                <p><b>Fecha expiración:</b> {infobanks.exp_date}</p>
                                <p><b>CVV:</b> {infobanks.cvv}</p>
                                <p><b>CPP:</b> {infobanks.cpp}</p>
                                <CAMBIAR infobanks={infobanks}/>
                              </Card.Body>
                            </Accordion.Collapse>
                          </Card>
                        </Accordion>
                      </div>
                  ))}
          </>
      );
    }}

    function CAMBIAR(props){
      return(
        <>
        <a href={"#editar" + props.infobanks.id} role="button" className="btn btn-primary btn-sm" data-toggle="modal">
        Editar
        </a>
        <ModalEDITAR infobanks={props.infobanks}/>
        </>
      )
    }

    function ModalEDITAR(props){
        let history = useHistory();
        const [data, setData] = useState({})
        const updateField = e => {
          setData({
            ...data,
            [e.target.name]: e.target.value
          });
        }
      useEffect(() =>{
          fetchitems();
      }, []);


      const fetchitems = async (id)=>{
          const data = await fetch(`http://localhost:5000/api/v1/infobanco/${props.infobanks.id}`);
          const  it= await data.json();
      };

        function validarcpp(cpp) {
          const regex_cpp = new RegExp(/\d{5}/);
          if (!regex_cpp.test(cpp) ) {
            return alert('Introduce un codigo postal valido de 5 digitos ');
          }
        }
        function validarnum(num_tarjeta) {
          const regex_numtarjeta = new RegExp(/(\d{4} *\d{4} *\d{4} *\d{4})/);
          if(!regex_numtarjeta.test(num_tarjeta)) {
             return alert('Introduce un numero de tarjeta valido de 16 digitos ');
          }
        }
        function validarexo(exp_date) {
          const regex_expdate =  new RegExp(/(\d{2})\/?(\d{2})/);
          if(!regex_expdate.test(exp_date)){
            return alert('Introduce bien el mes/año');
          }
        }
        function validarcvv(cvv) {
          const regex_cvv = new RegExp(/\d{3}/);
          if (!regex_cvv.test(cvv)) {
            return alert('Introduce el código de 3 digitos ');
          }
        }

        const Guardar = async (id)=>{
          console.log("PROPS INFOBANKS ID", props.infobanks.id);
          if (data.num_tarjeta != "") {
            if (validarnum(data.num_tarjeta) != true) {
            }
          }
          if (data.exp_date !='') {
            if (validarexo(data.exp_date) != true ) {
            }
          }
          if (data.cvv != '') {
            if (validarcvv(data.cvv) != true) {
            }
          }
          if (data.cpp != '') {
            if (validarcpp(data.cpp) != true ) {
            }
          }
                try{

                      const body = data;
                      const response = await fetch(`http://localhost:5000/api/v1/infobanco/${props.infobanks.id}`,
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
        <div id={"editar" + props.infobanks.id} class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Editar</h4>
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
                      <p><small>Ingresa un número de tarjeta de 16 digitos eg. 5555 5555 5555 5555</small></p>
                       <div>
                        <input
                            class="form-control"
                            id="num_tarjeta"
                            type="text"
                            name="num_tarjeta"
                            value={data.num_tarjeta}
                            onChange={updateField}
                            ></input>
                      </div>
                      <label for="exp_date">Fecha Expiración</label>
                      <p><small>eg. 04/28</small></p>
                      <div>
                        <input
                            class="form-control"
                            id="exp_date"
                            type="text"
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
                            type="text"
                            name="cvv"
                            placeholders={data.cvv}
                            onChange={updateField}
                            ></input>
                      </div>
                      <label for="cpp">Código Postal</label>
                      <div>
                        <input
                            class="form-control"
                            id="tel"
                            type="text"
                            name="cpp"
                            value={data.cpp}
                            onChange={updateField}
                            ></input>
                      </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal" >Cerrar</button>
                        <button type="button" class="btn btn-success" data-dismiss="modal"onClick={()=>Guardar()} >Editar</button>
                    </div>
                </div>
            </div>
        </div>
      );
    }
export default PerfilCliente;
