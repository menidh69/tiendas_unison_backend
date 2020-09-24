import React, {Fragment, useState} from 'react';
import './ClienteNavBar.css';
import {ReactComponent as Dropdown} from './icons/dropdown.svg';
import {ReactComponent as Settings} from './icons/configuracion.svg';
import {ReactComponent as Panel} from './icons/panel.svg';
import {ReactComponent as Logout} from './icons/cerrarsesion.svg';
import {ReactComponent as Home} from './icons/home.svg';
import {ReactComponent as Cart} from './icons/shoppingcart.svg';


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
            <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
                {props.icon}
            </a>

            {open && props.children}
        </li>
    );
}

function DropdownMenu(){

    function DropdownItem(props){
        return(
            <a href="#" className="menu-item">
                <span className="icon-button">{props.leftIcon}</span>

                {props.children}
            </a>
        );
    }

    return(
        <div className="dropdown">
            <DropdownItem 
            leftIcon={<Panel/>}>
                Mi perfil
            </DropdownItem>
            <DropdownItem
            leftIcon={<Cart/>}>
                Carrito
            </DropdownItem>
            <DropdownItem
            leftIcon={<Settings/>}>
                Configuracion
            </DropdownItem>
            <DropdownItem 
            leftIcon={<Logout/>}>
                Cerrar Sesion
            </DropdownItem>
        </div>
    );
}

export default ClienteNavBar;