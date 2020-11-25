import React, {Fragment, useState, useContext} from 'react';
import { UserContext } from '../../UserContext';
import {useHistory} from 'react-router-dom';
import './TiendaNavBar.css';
import {ReactComponent as Dropdown} from './icons/dropdown.svg';
import {ReactComponent as Settings} from './icons/configuracion.svg';
import {ReactComponent as Panel} from './icons/panel.svg';
import {ReactComponent as Logout} from './icons/cerrarsesion.svg';
import {ReactComponent as Home} from './icons/home.svg';
import {Link} from 'react-router-dom';


const TiendaNavBar = ()=>{
    return(
        <Fragment>
            <NavBar>
                    
                <NavItem icon={<Dropdown/>} >
                    <DropdownMenu/>
                </NavItem>
            </NavBar>
        </Fragment>
    )
}

function NavBar(props) {
    return (
        <nav className="navbar">
            <div className="leftNav">
                <Link to="/panel">
                    <NavItem icon={<Home/>} />
                </Link>
            </div>
            <div className="centerNav">
                    <a>
                        <h1>Tiendas Universidad</h1>
                    </a>
            </div>
            <ul className="navbar-nav">
                { props.children }
            </ul>
        </nav>
    );
}

function NavItem(props) {

    const [open, setOpen] = useState(false);

    return (
        <li className="nav-item">
            <a   className="icon-button" onClick={() => setOpen(!open)}>
                {props.icon}
            </a>
            <div style={{display: 'contents'}} onClick={() => setOpen(!open)}>
                {open && props.children}
            </div>
        </li>
    );
}

function DropdownMenu(){
    const {user, setUser} = useContext(UserContext);
    const history = useHistory();
    const logout = ()=>{
        localStorage.removeItem('token.tuw')
        alert('Hiciste logout')
        setUser(null);
        history.push('/')
    }

    function DropdownItem(props){
        return(
            <a className="menu-item" onClick={props.func}>
                <span className="icon-button">{props.leftIcon}</span>

                {props.children}
            </a>
        );
    }

    return(
        <div className="dropdown-nav">
            <Link to="/panel">
                <DropdownItem 
                leftIcon={<Panel/>}>
                    Mi panel
                </DropdownItem>
            </Link>
            <Link>
                <DropdownItem
                leftIcon={<Settings/>}>
                    Configuracion
                </DropdownItem>
            </Link>
            <Link >
                <DropdownItem func={()=>logout()}
                leftIcon={<Logout/>}>
                    Cerrar Sesion
                </DropdownItem>
            </Link>
        </div>
    );
}

export default TiendaNavBar;