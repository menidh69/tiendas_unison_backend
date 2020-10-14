import React, {Fragment, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import TiendaNavBar from './TiendaNavBar';
import './MiInfo.css';

function MiInfo({match}){

  useEffect(()=>{
      fetchitems();
  }, []);

  const [items, setItems] = useState([])
  const [data, setData] = useState({})

  const fetchitems = async ()=>{
      const data = await fetch(`http://localhost:5000/api/v1/mitienda/${match.params.id}`);
      const items = await data.json();
      console.log(items)
      setItems(items)
  };

    return(
        <Fragment>
          <TiendaNavBar/>
          <div class="container">
                  <div class="row">
                      <div class="col-12">
                          <div class="card">

                            <div class="card-body">

                              <div class="card-title mb-4">
                                  <div class="d-flex justify-content-start">
                                      <div class="image-container">
                                          <img src="http://placehold.it/300x300" id="imgProfile"  class="img-thumbnail" />
                                          <div class="middle">
                                              <input type="button" class="btn btn-secondary" id="btnChangePicture" value="Change" />
                                              <input type="file" id="profilePicture" name="file" />
                                          </div>
                                      </div>
                                      <div class="userData ml-3">
                                          <h2 class="d-block" >Mi Información</h2>
                                          <hr/>
                                          <h2 class="d-block">Tienda Domo</h2>
                                      </div>
                                      <div class="ml-auto">
                                          <input type="button" class="btn btn-primary d-none" id="btnDiscard" value="Discard Changes" />
                                      </div>
                                  </div>
                              </div>

                              <div class="row">
                                <div class="col-12">
                                    <ul class="nav nav-tabs mb-4" id="myTab" role="tablist">
                                      <li class="nav-item">
                                        <a class="nav-link active" id="MyInfo-tab" data-toggle="tab" href="#MyInfo" role="tab" aria-controls="MyInfo" aria-selected="true">Perfil</a>
                                      </li>
                                      <li class="nav-item">
                                        <a class="nav-link" id="MapaInfo-tab" data-toggle="tab" href="#MapaInfo" role="tab" aria-controls="MapaInfo" aria-selected="false">Mapa</a>
                                      </li>
                                    </ul>

                                    <div class="tab-content ml-1" id="myTabContent">
                                        <div class="tab-pane fade show active" id="MyInfo" role="tabpanel" aria-labelledby="MyInfo-tab">
                                          <table className="table table-striped">

                                              <tbody>
                                                <tr><th>ID</th><td>i</td></tr>
                                                <tr><th>Nombre tienda</th><td>nombre</td></tr>
                                                <tr><th>Horario</th><td>horario</td></tr>
                                                <tr><th>id Usuario q no importa</th><td>id_usuario</td></tr>
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




        </Fragment>
    )
}

export default MiInfo;
