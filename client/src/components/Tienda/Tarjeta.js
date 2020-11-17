import React, {Fragment, useEffect, useState, useContext} from 'react';
import {useHistory} from "react-router-dom";
import { UserContext } from '../../UserContext'
import TiendaNavBar from './TiendaNavBar';
import {Link} from 'react-router-dom';
import './MenuTienda.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Modal, Button, Card, Accordion } from "react-bootstrap";


const Tarjeta = () => {

  return (<Fragment>
    <InfoBancaria/>
  </Fragment>);
}

function InfoBancaria() {
  let history = useHistory()
  const [items, setItems] = useState([])
  const {user, setUser} = useContext(UserContext);

  const fetchitems = async (id)=>{
      const data = await fetch(`http://localhost:5000/api/v1/infobanco/${user.id}`);
      const  it= await data.json();
      setItems(it[0]);
  };

  useEffect(()=>{
      fetchitems();
  }, []);

  const updateField = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  }

  const [data, setData] = useState({
    nombre_titular:'',
    num_tarjeta: '',
    exp_date: '',
    cvv: '',
    cpp: ''});

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

    const GuardarNueva = async (id)=>{
      if (validarnum(data.num_tarjeta) != true) {
      }
      if (validarexo(data.exp_date) != true ) {
      }
      if (validarcvv(data.cvv) != true) {
      }
      if (validarcpp(data.cpp) != true ) {
      }
      if (data.num_tarjeta !=="" && data.exp_date != "" && data.nombre_titular != "" && data.cvv != "" && data.cpp != "") {
      } 
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
  return (
    <>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div className="top container-item izq">
              <Link to="/panel">
                <a className="atras izq" href="">
                  <h6 className="izq">← Atras</h6>
                </a>
              </Link>
              <h6 className="izq">| Tarjeta</h6>
            </div>
            <div class="card-body">
              <div class="card-title mb-4">
                <div class="d-flex">
                  <div class="userData ml-3 ml-3">
                    <h2 class="d-block">Información Bancaria</h2>
                    <hr/>
                  </div>
                </div>
              </div>
              {items ? 
              <div class="row">
                <hr/>
                <button type="button" class="btn btn-info" data-toggle="modal" href="#Agregar">Agregar Nueva Información Bancaria</button>
                </div>
                <Info/>
              </div>
              : ''}
            </div>
          </div>
        </div>

      <div id="Agregar" class="modal fade">

          <div class="modal-dialog">
              <div class="modal-content">
                  <div class="modal-header">
                      <h4 class="modal-title">Información Bancaria</h4>
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
                        <label for="exp_date">Fecha Expiración</label>
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
                      <button type="button" class="btn btn-success" data-dismiss="modal"onClick={()=>GuardarNueva(user.id)}>Guardar</button>
                  </div>
              </div>
          </div>
      </div>
      : ''}
  </div>
</>
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

        const GuardarInfoBank = async (id)=>{
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
                        <button type="button" class="btn btn-success" data-dismiss="modal"onClick={()=>GuardarInfoBank()} >Editar</button>
                    </div>
                </div>
            </div>
        </div>
      );
    }
export default Tarjeta;
