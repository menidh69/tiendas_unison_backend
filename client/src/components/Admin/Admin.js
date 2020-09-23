import React, {Fragment} from 'react'
import AdminNavBar from './AdminNavBar';
import TiendaTable from './TiendaTable';
import UniversidadTable from './UniversidadesTable'
import MainAdmin from './MainAdmin'
import Tienda1 from './Tienda1'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const Admin = ()=>{
    return(
        <Fragment>
            <div className='container-fluid h-100 mx-0 px-0'>
            <div className="row m-0 px-0 h-100">
                <AdminNavBar/>
                <Router>
                <Switch>
                <Route path='/admin/tiendas' component={TiendaTable}></Route>
                <Route path='/admin/universidades' component={UniversidadTable}></Route>
                <Route path='/admin' component={MainAdmin}></Route>
                <Route path='/admin/tiendas/tienda1' component={Tienda1}></Route> {/*no entra nose pq*/}
                </Switch>
                </Router>
                </div>
                </div>
        </Fragment>
    )
}

export default Admin;
