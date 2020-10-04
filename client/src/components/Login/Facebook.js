import React, {useState, Fragment} from'react';
import FacebookLogin from 'react-facebook-login';

const Facebook = ()=>{
    
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
        autoLoad={true}
        fields="name,email,picture"
        onClick={componentClicked}
        callback={responseFacebook} 
        cssClass="px-4 rounded btn btn-lg btn-outline-primary border text-light"
        icon="fa-facebook"/>
        </Fragment>
    )
}

export default Facebook;