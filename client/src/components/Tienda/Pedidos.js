import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import React, {Fragment, useEffect, useState, useContext} from 'react';
import {useHistory} from "react-router-dom";
import { UserContext } from '../../UserContext'
import {Link} from 'react-router-dom';
import TiendaNavBar from './TiendaNavBar';
import { Modal, Button, Card, Accordion } from "react-bootstrap";

import datosPedidos from '../dataJSON/ventas_sinEntregar_JSON'; // ventas sin entregar -> pedidos pendientes PedidoP
//estas irian en HVentas
// ventas mensuales -> ventas mensuales MesV
// ventass entregadas -> ventas en un dia DiaV

function Pedidos() {
  return(
    <>
    <PedidosVentas/>
    </>
  );
}


function PedidosVentas(){
  return(
    <Fragment>
    <div className="container">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                      <div className="top container-item izq">
                        <Link to="/panel">
                          <a className="atras izq" href="">
                            <h6 className="izq">← Atras</h6>
                          </a>
                        </Link>
                        <h6 className="izq">| Pedidos</h6>
                      </div>
                      <div class="card-body">
                        <div class="card-title mb-4">
                            <div className="">
                                <div class="text-center ml-3">
                                    <h2 className="" >Pedidos</h2>
                                    <hr/>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                          <hr/>
                          <div class="col-12">
                              <ul class="nav nav-tabs mb-4" id="myTab" role="tablist">
                                <li class = "nav-item">
                                  <a class="nav-link active" id="PedidosP-tab" data-toggle="tab" href="#PedidosP" role="tab" aria-controls="PedidosP" aria-selected="true">Pedidos</a>
                                </li>
                                <li class = "nav-item">
                                  <a class="nav-link" id="DVentas-tab" data-toggle="tab" href="#DVentas" role="tab" aria-controls="DVentas" aria-selected="false">Ventas Diarias</a>
                                </li>
                                <li class = "nav-item">
                                  <a class="nav-link" id="MVentas-tab" data-toggle="tab" href="#MVentas" role="tab" aria-controls="MVentas" aria-selected="false">Ventas Mensuales</a>
                                </li>
                              </ul>
                              <div class="tab-content ml-l" id="myTabContent">
                                  <div class="tab-pane fade show active" id="PedidosP" role="tabpanel" aria-labelledby="PedidosP-tab">
                                    <PedidosP/>
                                  </div>
                                  <div class="tab-pane fade" id="DVentas" role="tabpanel" aria-labelledby="DVentas-tab">
                                    <DVentas/>
                                  </div>
                                  <div class="tab-pane fade" id="MVentas" role="tabpanel" aria-labelledby="MVentas-tab">
                                    <MVentas/>
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
)}



function PedidosP() {
  const [data, setData] = useState();
  const {user, setUser} = useContext(UserContext);
  useEffect(()=>{
      let isMounted = true;
      if(isMounted){
        fetchData()
        .then(json=>{
          setData(json);
        })
      }
      return ()=>{isMounted=false}
  }, []);
  const fetchData = async()=>{
      const json = datosPedidos;
      console.log(json);
      return json;
  }
  return(
      <Fragment>
          {data ?
            <div>
                  <div>
                    {data.map(item => (
                      <Accordion>
                        <Card>
                          <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                              Orden {item.id_orden} - {item.fecha}
                            </Accordion.Toggle>
                          </Card.Header>
                          <Accordion.Collapse eventKey="0">
                            <Card.Body>
                              <table class="table">
                                  <thead>
                                      <tr>
                                      <th scope="col">Producto</th>
                                      <th scope="col">Precio</th>
                                      <th scope="col">Cantidad</th>
                                      <th scope="col">Subtotal</th>
                                      </tr>
                                  </thead>
                                  <tbody>

                                    <tr>
                                      <td scope="row">{item.id_usuario}</td>
                                    </tr>
                                  </tbody>
                              </table>

                              <h3>Total: ${item.total}</h3>
                                {item.detail.map(sub => (
                                  <div>sub.subtotal</div>

                                ))}
                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>
                      </Accordion>
                    ))}
                  </div>
          </div>
      :
      <div className="menu-container">
          <div className="row">
              <div className="menuItem">
                  <h1 className="nomargin">Aun no tiene ningun pedido.</h1>
              </div>
          </div>
      </div>
      }
      </Fragment>
  )
}

function DVentas() {
  const [data, setData] = useState();
  const {user, setUser} = useContext(UserContext);
  useEffect(()=>{
      let isMounted = true;
      if(isMounted){
        fetchData()
        .then(json=>{
          setData(json);
        })
      }
      return ()=>{isMounted=false}
  }, []);
  const fetchData = async()=>{
      const json = datosPedidos;
      console.log(json);
      return json;
  }
  return(
      <Fragment>
          {data ?
            <div>
                  <div>
                    {data.map((rowdata) =>
             <div>
               <div>{rowdata.fecha}</div>
               {
                 (typeof(rowdata.detail) == 'object' ) ?
                 <div>
                   {
                     rowdata.detail.map((subRowData) =>
                       <div>
                         <div>{subRowData.id}</div>
                         <div>{subRowData.subtotal}</div>
                       </div>
                     )
                   }
                 </div>
               :
               null
               }
             </div>
           )}
                  </div>
          </div>
      :
      <div className="menu-container">
          <div className="row">
              <div className="menuItem">
                  <h1 className="nomargin">Aun no tiene ningun ingreso.</h1>
              </div>
          </div>
      </div>
      }
      </Fragment>
  )
}

function MVentas() {
  const [data, setData] = useState();
  const {user, setUser} = useContext(UserContext);
  useEffect(()=>{
      let isMounted = true;
      if(isMounted){
        fetchData()
        .then(json=>{
          setData(json);
        })
      }
      return ()=>{isMounted=false}
  }, []);
  const fetchData = async()=>{
      const json = datosPedidos;
      console.log(json);
      return json;
  }
  return(
      <Fragment>
          {data ?
            <div>

              <div>
                <label for="start">Fecha min:</label>
                <input type="date" id="fechamin"/>

                <label for="start">Fecha max:</label>
                <input type="date" id="fechamax"/>

                <button type="button" class="btn btn-info">Buscar</button>
              </div>




            </div>







      :
      <div className="menu-container">
          <div className="row">
              <div className="menuItem">
                  <h1 className="nomargin">Aun no tiene ningun ingreso.</h1>
              </div>
          </div>
      </div>
      }
      </Fragment>
  )
}


export default Pedidos;
