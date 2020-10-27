import React, {useState, Fragment, useContext, useEffect} from'react';
import FacebookLogin from 'react-facebook-login';
import { UserContext } from '../../UserContext';
import {Button, Modal} from 'react-bootstrap';


const Facebook = ()=>{
    const {user, setUser} = useContext(UserContext);
    const [loginData, setLoginData] = useState({
        isLoggedIn: false,
        name: '',
        email: '',
        tipo_usuario: ''
    })
    const [uni, setUni] = useState('');
    const [unis, setUnis] = useState([]);
    
    useEffect(()=>{
      fetchUniversidades()
    }, [])

    const componentClicked = ()=>{
        handleShow();
        console.log('clicked')
        alert('Al iniciar sesión con facebook serás registrado como usuario regular')
    }
    const fetchUniversidades = async ()=>{
        const data = await fetch('http://localhost:5000/api/v1/universidades')
        const json = await data.json();
        console.log(json)
        setUnis(json);
      }
    const responseFacebook = response =>{
        console.log(response);
        handleShow();
        const info = {
            nombre: response.name,
            email: response.email,
            tipo_usuario: 'cliente',
            id_universidad: uni
        }
        setUser(info);
        console.log(user);
    };

    const updateField = e => {
        if(e.target.value=='0'){
            setUni('')
        }else{
        setUni(
          e.target.value
        );
        }
      }
    const [show, setShow] = useState(false);

      const handleGuardar = ()=>{
          setUser( {
                nombre:loginData.nombre,
                email: loginData.email,
                tipo_usuario: 'cliente',
                id_universidad: uni
            })
      }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    return(
        <Fragment>
            <Button className="px-4 rounded btn btn-lg btn-outline-primary border text-light" onClick={handleShow}>Login con Facebook</Button>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>Selecciona tu universidad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h4>Selecciona tu universidad!</h4>
            <div className="form-group text-left">
                      <label for="universidad">Universidad</label>
                      <select id="universidad" name="universidad" className="form-control" onChange={updateField}>
                      <option selected value='0'>Selecciona universidad</option>
                       {unis.map(uni=>(
                         <option key={uni.id} value={uni.id}>{uni.nombre}</option>
                       ))}
                      </select>
                    </div>

        </Modal.Body>
        <Modal.Footer className="mx-auto">
        {uni? <FacebookLogin
        appId="2718234125104025"
        autoLoad={false}
        fields="name,email,picture"
        onClick={handleClose}
        callback={responseFacebook} 
        cssClass="px-4 rounded btn btn-lg btn-primary mx-auto border"
        icon="fa-facebook"/> : ''}
        
        </Modal.Footer>
    </Modal>
    
        </Fragment>
    )
}

export default Facebook;