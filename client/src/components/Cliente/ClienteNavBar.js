import React, {Fragment, useEffect, useState, useContext} from 'react';
import './ClienteNavBar.css';
import {ReactComponent as Dropdown} from './icons/dropdown.svg';
import {ReactComponent as Settings} from './icons/configuracion.svg';
import {ReactComponent as Panel} from './icons/panel.svg';
import {ReactComponent as Logout} from './icons/cerrarsesion.svg';
import {ReactComponent as Home} from './icons/home.svg';
import {ReactComponent as Cart} from './icons/shoppingcart.svg';
import { useHistory, Link } from 'react-router-dom';
import { UserContext } from '../../UserContext'


const ClienteNavBar = ()=>{
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
                    <NavItem icon={<Home/>} />
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
            <Link>
            <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
                {props.icon}
            </a>
            </Link>
            {open && props.children}
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
        <div className="dropdown">
            <Link to="/PerfilCliente">
            <DropdownItem 
            leftIcon={<Panel/>}>
                Mi perfil
            </DropdownItem>
            </Link>
            <DropdownItem
            href='#'
            leftIcon={<Cart/>}>
                Carrito
            </DropdownItem>
            <DropdownItem
            href='#'
            leftIcon={<Settings/>}>
                Configuracion
            </DropdownItem>
            <Link to="/">
            <DropdownItem
            leftIcon={<Logout/>}
            func={()=>logout()}>
                Cerrar Sesion
            </DropdownItem>
            </Link>
        </div>
    );
}

export default ClienteNavBar;