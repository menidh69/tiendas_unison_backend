import React, {useState, Fragment, useContext, useEffect} from'react';
import FacebookLogin from 'react-facebook-login';
import { UserContext } from '../../UserContext';
import {Button, Modal} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';


const Facebook = ()=>{
    const {user, setUser} = useContext(UserContext);
    const [uni, setUni] = useState('');
    const [contra, setContra] = useState(null)
    const [match, setMatch] = useState(null)
    const [loginData, setLoginData] = useState({
      email: null,
      nombre: null,
      contra: null,
      id_universidad: null,
      tel: null
    })
    const [unis, setUnis] = useState([]);
    const history = useHistory();

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

      const login = async ()=>{
        const loginInfo={
          email: loginData.email,
          contra: loginData.contra
        }
        
          const loginresponse = await fetch('http://localhost:5000/api/v1/usuario/login',
          {
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify(loginInfo)
          });
          const userLogged = await loginresponse.json()  
          console.log(userLogged);
          if(userLogged.error){
            console.log(userLogged)
            history.push("/home") 
          }else{
            console.log(userLogged);
            localStorage.setItem("token.tuw", userLogged.user.token)
            setUser(userLogged.user);
            history.push("/")
          } 
        }
      

      const guardarInfo = async e =>{
        e.preventDefault()
        handleClose();
        try{
        if(loginData.contra===match){
          const body = loginData;
          const response = await fetch('http://localhost:5000/api/v1/usuarios', {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
          });
          const result = await response.json();
          if (result.error) {
            console.log(result.error)              
          } else {
            login();
        }
      }
        else{
          console.log('passwords dont match')
          alert('La contraseña no concuerda')
        }
      }catch(err){
        console.log(err)
      }
        
      }

    const responseFacebook = async response =>{
      console.log(response)
      const info = await fetch('http://localhost:5000/api/v1/auth/fbLogin', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(response)
      })
      const res = await info.json()
      console.log(res.user)
      if(res.exists == true){
        localStorage.setItem("token.tuw", res.user.token)
        setUser(res.user)
        history.push("/home")

      }else{
        handleShow();
        const newuser = {
          email: response.email,
          nombre: response.name
        }
        setLoginData({...loginData, email: response.email, nombre: response.name})
      }
        
    };

    const updateField = e => {
        if(e.target.value=='0'){
            setLoginData({...loginData, id_universidad: null})
        }else{
          setLoginData({...loginData, id_universidad: e.target.value})
        }
      }
    const [show, setShow] = useState(false);

      const setPassword=e=>{
        setLoginData({...loginData, contra: e.target.value})
        console.log(e.target.value)
      }
  
      const confirmPassword=e=>{
          setMatch(e.target.value)
      }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return(
    <Fragment>
        <FacebookLogin
          appId="2718234125104025"
          autoLoad={false}
          fields="name,email,picture"
          onClick={handleClose}
          callback={responseFacebook} 
          cssClass="px-4 rounded btn btn-lg btn-primary mx-auto border"
          icon="fa-facebook"/>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Termina tu registro</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>¿Primera vez?</h4>
            <p>Selecciona tu universidad y establece una contraseña para tu cuenta antes de continuar</p>
              
              <div className="form-group text-left">
                <label for="universidad">Universidad</label>
                <select id="universidad" name="universidad" className="form-control" onChange={updateField}>
                <option selected value='0'>Selecciona universidad</option>
                  {unis.map(uni=>(
                    <option key={uni.id} value={uni.id}>{uni.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label for="password">Contraseña</label>
                <input type="password" id="password" className="form-control" onChange={setPassword}></input>
              </div>
              <div className="form-group">
                  <label for="password">Repetir contraseña</label>
                  <input type="password" id="password" className="form-control" onChange={confirmPassword}></input>
              </div>

          </Modal.Body>
          <Modal.Footer className="mx-auto">
          <Button variant="primary" onClick={guardarInfo}>Continuar</Button>
          
          </Modal.Footer>
        </Modal>
      </Fragment>
  )

}

export default Facebook;