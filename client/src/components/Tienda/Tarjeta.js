import React, {Fragment, useEffect, useState, useContext} from 'react';
import {useHistory} from "react-router-dom";
import { UserContext } from '../../UserContext'
import TiendaNavBar from './TiendaNavBar';
import {Link} from 'react-router-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const Tarjeta = () => {

  return (<Fragment>
    <InfoBancaria/>
  </Fragment>);
}

function InfoBancaria() {
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);


  let history = useHistory()
  const [data, setData] = useState({
    nombre_titular: '',
    num_tarjeta: '',
    exp_date: '',
    cvv: '',
    cp: ''});

  const [items, setItems] = useState([])
  const {user, setUser} = useContext(UserContext);
  useEffect(() => {
    fetchitems();
  }, []);

  const fetchitems = async () => {};

  const updateField = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  }
  return (
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div className="container-item izq">
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
              <div class="row">
                <hr/>
                <button type="button" class="btn btn-info" data-toggle="modal" href="#Editar">Editar</button>
                <div class="col-12">
                  <table className="table table-striped">
                    <tbody>
                      <tr>
                        <tr>
                          <th>Nombre del titular de la tarjeta</th>
                          <td>{items.nombre_titular}</td>
                        </tr>
                        <tr>
                          <th>Número Tarjeta</th>
                          <td>{items.num_tarjeta}</td>
                        </tr>
                        <tr>
                          <th>Fecha de expiración <small>MM/YY></small></th>
                          <td>{items.exp_date}</td>
                        </tr>
                        <tr>
                          <th>CVV
                          <small>Código de 3 digitos de la parte trasera de tu tarjeta</small> </th>
                          <td>{items.cvv}</td>
                        </tr>
                        <tr>
                          <th>Código Postal</th>
                          <td>{items.cpp}</td>
                        </tr>
                      </tr>
                    </tbody>
                  </table>
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
                      <h4 class="modal-title">Editar Información Bancaria</h4>
                      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>

                  </div>
                  <div class="modal-body">

                        <label for="nombre">Nombre del titular de la tarjeta</label>
                        <div>
                          <input
                          class="form-control"
                          required autocomplete="off"
                          id="nombre_titular"
                          type="text"
                          name="nombre"
                          value={data.nombre_titular}
                          onChange={updateField}
                          ></input>
                        </div>
                        <label for="horario">Número de tarjeta</label>
                        <p><small>Ingresa un número de tarjeta de 12 a 16 digitos </small></p>
                         <div>
                          <input
                              class="form-control"
                              required autocomplete="off"
                              id="num_tarjeta"
                              type="tel"
                              name="horario"
                              value={data.num_tarjeta}
                              onChange={updateField}
                              ></input>
                        </div>
                        <label for="exp_date">Expiration Date</label>
                        <div>
                          <input
                              class="form-control"
                              id="exp_date"
                              type="tel"
                              name="exp_date"
                              placeholder="MM / YY"
                              required autocomplete="cc-exp"
                              value={data.exp_date}
                              onChange={updateField}
                              ></input>
                        </div>
                        <label for="cvv">Cvv</label>
                        <p><small>Código de 3 digitos de la parte trasera de tu tarjeta</small></p>
                        <div>
                          <input
                              class="form-control"
                              id="cvv"
                              type="tel"
                              name="cvv"
                              required autocomplete="off"
                              value={data.cvv}
                              onChange={updateField}
                              ></input>
                        </div>
                        <label for="cpp">Código Postal</label>
                        <div>
                          <input
                              class="form-control"
                              required autocomplete="off"
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
                      <button type="button" class="btn btn-success" data-dismiss="modal">Guardar</button>
                  </div>
              </div>
          </div>
      </div>
  </div>


)}

export default Tarjeta;
