import React, {useState, Fragment, useContext} from'react';
import FacebookLogin from 'react-facebook-login';
import { UserContext } from '../../UserContext'


const Facebook = ()=>{
    const {user, setUser} = useContext(UserContext);
    const [loginData, setLoginData] = useState({
        isLoggedIn: false,
        userID: '',
        name: '',
        email: ''
    })

    const componentClicked = ()=>{
        console.log('clicked')
        alert('Al iniciar sesión con facebook serás registrado como usuario regular')
    }

    const responseFacebook = response =>{
        console.log(response);
        const info = {
            nombre: response.name,
            email: response.email,
            tipo_usuario: 'cliente'
        }
        setUser(info);
        console.log(user);
        setLoginData({
            isLoggedIn: true,
            userID: response.userID,
            name: response.name,
            email: response.email,
        });
    };

    return(
        <Fragment>
            <FacebookLogin
        appId="2718234125104025"
        autoLoad={false}
        fields="name,email,picture"
        onClick={componentClicked}
        callback={responseFacebook} 
        cssClass="px-4 rounded btn btn-lg btn-outline-primary border text-light"
        icon="fa-facebook"/>
        </Fragment>
    )
}

export default Facebook;