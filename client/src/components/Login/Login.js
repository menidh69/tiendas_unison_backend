import React, {Fragment, useState, useMemo, useContext} from 'react'
import Registro from '../Landing-Registro/Registro'
import {useHistory} from "react-router-dom";
import { UserContext } from '../../UserContext'
import Facebook from './Facebook'
import {Router, Switch, Route} from 'react-router-dom';
import Home from '../Cliente/Home';
import Admin from '../Admin/Admin';
import Panel from '../Tienda/Panel'
import LandingNav from '../Landing-Registro/LandingNav';

// const Login = ()=>{
//   const {user, setUser} = useContext(UserContext);
//   if(user!==null && user.isLoggedIn){
//     return <LoginFactory></LoginFactory>
//   }else{
//     return <LoginForm></LoginForm>
//   }
// }
const LoginForm = () => {

  const {user, setUser} = useContext(UserContext);


  let history = useHistory()
  const [data, setData] = useState({
      email: '',
      contra: ''
  });


  const [alert, setAlert] = useState([])

  const updateField = e =>{
    e.preventDefault()
      setData({
          ...data,
          [e.target.name]: e.target.value
      });
  }

  const onSubmitForm = async e =>{

      e.preventDefault();
      try{
          const body = data;
          console.log(body);
          const response = await fetch('http://localhost:5000/api/v1/usuario/login',
          {
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify(body)
          })
          .then(async resp =>{
              const result = await resp.json()
              if(result.error){
                  console.log(result.error)
                  history.push("/home")
              }else{
                console.log(result)
                  console.log(result.user);
                  console.log(result)
                  console.log(resp)
                  localStorage.setItem("token.tuw", result.user.token)
                  setUser(result.user);
                  history.push("/")

              }
          })
      }catch(err){

      }
  }

  return (
  <Fragment>
    <LandingNav></LandingNav>
    <div className="row">
        <div className="col-md-4">

        </div>
        <div className="col-md-4">
    <div className="container bg-primary rounded-lg text-light my-2 pb-2">
      <h1 className="text-center my-5 pt-5">Login</h1>

        <form className="my-2 text-center mx-auto" onSubmit={onSubmitForm}>
        <div className="form-group text-left">
          <label for="email">Email address</label>
          <input
            className="form-control"
            id="email"
            type="text"
            name="email"
            value={data.email}
            onChange={updateField}
            ></input>
        </div>
        <div className="form-group text-left">
          <label for="contra">Password</label>
          <input
            className="form-control"
            id="contra"
            type="password"
            name= "contra"
            value={data.contra}
            onChange={updateField}

            ></input>
          <small id="olvidada" class="form-text text-light">
            <a href="olvidarcontra">¿Olvidaste tu contraseña?</a>
          </small>
        </div>
        <button className="btn btn-lg btn-warning my-4" type='submit'>Login</button>
      </form>

      {/* <div className="text-center">
      <Facebook></Facebook>
      </div> */}
      </div>
      <Registro></Registro>

        </div>
        <div className="col-md-4">

        </div>


    </div>

  </Fragment>)
}

const LoginFactory = ()=>{
  const {user, setUser} = useContext(UserContext);

    switch (user.tipo) {
      case 'cliente':
        return(
          <Router>
            <UserContext.Provider value={user}>
              <Switch>
                <Route path="/home" component={Home}/>
              </Switch>
            </UserContext.Provider>
          </Router>
          );
          break;
      case 'admin':
        return(
          <Router>
            <UserContext.Provider value={user}>
              <Switch>
                <Route path="/admin" component={Admin}/>
              </Switch>
            </UserContext.Provider>
          </Router>
          );
          break;
      case 'tienda':
        return(
          <Router>
            <UserContext.Provider value={user}>
              <Switch>
                <Route path="/tienda" component={Panel}/>
              </Switch>
            </UserContext.Provider>
          </Router>
          );
          break;
      case 'default':
        return(
          <Router>
            <UserContext.Provider value={user}>
              <Switch>
                <Route path="/home" component={Home}/>
              </Switch>
            </UserContext.Provider>
          </Router>
          );
          break;
    }
}
export default LoginForm;
