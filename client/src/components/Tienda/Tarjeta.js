import React, {Fragment, useEffect, useState, useContext} from 'react';
import {useHistory} from "react-router-dom";
import { UserContext } from '../../UserContext'
import TiendaNavBar from './TiendaNavBar';
import {Link} from 'react-router-dom';
import './MenuTienda.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const Tarjeta = () => {

  return (<Fragment>
    <InfoBancaria/>
  </Fragment>);
}

function InfoBancaria() {
  let history = useHistory()
  const [items, setItems] = useState([])
  const {user, setUser} = useContext(UserContext);
  useEffect(()=>{
      fetchitems();
  }, []);

  const fetchitems = async (id)=>{

      const data = await fetch(`http://localhost:5000/api/v1/infobanco/${user.id}`);
      const  it= await data.json();
      setItems(it[0]);
      setData(it[0]);
  };

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

    function validar() {
      const regex_numtarjeta = new RegExp(/(\d{4} *\d{4} *\d{4} *\d{4})/);
      const regex_expdate =  new RegExp(/(\d{2})\/?(\d{2})/);
      const regex_cvv = new RegExp(/\d{3}/);
      const regex_cpp = new RegExp(/\d{5}/);

      const paso = true;

      if(!regex_numtarjeta.test(data.num_tarjeta)) {
          alert('Introduce un numero de tarjeta valido de 16 digitos ');
          paso = false;
      }

      if(!regex_expdate.test(data.exp_date)){
        alert('Introduce bien el mes/año ');
        paso = false;

      }
      if (!regex_cvv.test(data.cvv)) {
        alert('Introduce el código de 3 digitos ');
        paso = false;

      }
      if (!regex_cpp.test(data.cpp)) {
        alert('Introduce un codigo postal valido de 5 digitos ');
        paso = false;
      }
      if (paso == false) {
        return false
      }
    }

    const Guardar = async (id)=>{

        if ( validar() != true) {
        }
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


  return (
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
                <button type="button" class="btn btn-info" data-toggle="modal" href="#Editar">Editar</button>
                <div class="col-12">
                  <table className="table table-striped">
                    <tbody>
                      <tr>
                        <tr>
                          <th>Titular de la tarjeta</th>
                          <td>{items.nombre_titular}</td>
                        </tr>
                        <tr>
                          <th>Número Tarjeta<br/>
                            <small>eg 5555 5555 5555 5555</small></th>
                          <td>{items.num_tarjeta}</td>
                        </tr>
                        <tr>
                          <th>Fecha de expiración <br/>
                            <small>MM/YY</small></th>
                          <td>{items.exp_date}</td>
                        </tr>
                        <tr>
                          <th>CVV <br/>
                          <small>Código de 3 digitos de la parte trasera de tu tarjeta</small></th>
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
              : ''}
            </div>
          </div>
        </div>
      </div>
      {items ?
      <div id="Editar" class="modal fade">
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
                      <button type="button" class="btn btn-success" data-dismiss="modal"onClick={()=>Guardar(user.id)}>Guardar</button>
                  </div>
              </div>
          </div>
      </div>
      : ''}
  </div>


)}

export default Tarjeta;
