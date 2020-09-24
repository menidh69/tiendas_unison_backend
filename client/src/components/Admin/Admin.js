import React, {Fragment} from 'react'
import AdminNavBar from './AdminNavBar';
import TiendaTable from './TiendaTable';
import UniversidadTable from './UniversidadesTable'
import MainAdmin from './MainAdmin'
import Tienda1 from './Tienda1'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import infoUni from './InfoUni';

const Admin = ()=>{
    return(
        <Router>
            <div className='container-fluid h-100 mx-0 px-0'>
            <div className="row m-0 px-0 h-100">
                <AdminNavBar/>
                
                <Switch>

                    <Route path='/admin/tiendas' exact component={TiendaTable}></Route>
                    <Route path='/admin/tiendas/:id' component={Tienda1}></Route>
                    <Route path='/admin/universidades/:id' component={infoUni}></Route>
                    <Route path='/admin/universidades' exact component={UniversidadTable}></Route>
                    <Route path='/admin' exact component={MainAdmin}></Route>

                </Switch>
                
            </div>
            </div>
        </Router>
    )
}

export default Admin;
