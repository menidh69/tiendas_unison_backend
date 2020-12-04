import React, {Fragment, useEffect, useState, useContext} from 'react';
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
                <Link to="/home">
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

                <button className="icon-button" onClick={() => setOpen(!open)}>
                    {props.icon}
                </button>
            <div style={{display: 'contents'}} onClick={() => setOpen(!open)}>
                {open && props.children}
            </div>

        </li>
    );
}

function DropdownMenu(){
    
    const [items, setItems] = useState([]);

    useEffect(()=>{
        fetchitems();
    }, []);

    const {user, setUser} = useContext(UserContext);
    const history = useHistory();
    const logout = ()=>{
        localStorage.removeItem('token.tuw')
        alert('Hiciste logout')
        setUser(null);
        history.push('/')
    }

    const fetchitems = async () => {
        const data = await fetch (`http://localhost:5000/api/v1/carrito/${user.id}`);
        const items = await data.json();
        const data2 = await fetch (`http://localhost:5000/api/v1/carritoItem/${items[0].id}`);
        const items2 = await data2.json();
        console.log(items2[0])
        if (items2 == null) {
            console.log("hola");
        } else {
            setItems(items2[0]);

        }
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
            <Link to="/PerfilCliente">
            <DropdownItem 
            leftIcon={<Panel/>}>
                Mi perfil
            </DropdownItem>
            </Link>
            <Link to="/carrito">
            <DropdownItem
            href='#'
            leftIcon={<Cart/>}>
                Carrito({items.length})
            </DropdownItem>
            </Link>

            <Link to="/pedidos">
            <DropdownItem
            href='#'
            leftIcon={<Cart/>}>
                Pedidos recientes
            </DropdownItem>
            </Link>
            <Link to="/misCompras">
            <DropdownItem 
            leftIcon={<Panel/>}>
                Mis compras

            </DropdownItem>
            </Link>
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