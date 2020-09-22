import React, {Fragment} from 'react'
import AdminNavBar from './AdminNavBar';
import TiendaTable from './TiendaTable';
import UniversidadTable from './UniversidadesTable'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const Admin = ()=>{
    return(
        <Fragment>
            <div className="row m-0 px-0">
                <AdminNavBar/>
                <Router>
                <Switch>
                <Route path='/admin/tiendas' component={TiendaTable}></Route>
                <Route path='/admin/universidades' component={UniversidadTable}></Route>
                </Switch>
                </Router>
                </div>
        </Fragment>
    )
}

export default Admin;