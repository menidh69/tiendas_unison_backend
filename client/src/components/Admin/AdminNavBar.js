import React, {Fragment} from 'react';


const AdminNavBar = ()=>{
    return(
        <Fragment>
        <div className="col-3 bg-primary">
        <a className="nav-link my-4" href="/admin"><h1>Tiendas UNI <span className='small'>Admin</span></h1></a>
          <div className="nav flex-column nav-pills bg-primary py-4" role="tablist" aria-orientation="vertical">
            <a className="nav-link"  href="/admin/tiendas">Tiendas</a>
            <a className="nav-link" href="/admin/universidades">Universidades</a>
          </div>
        </div>
        </Fragment>
    )
}

export default AdminNavBar;