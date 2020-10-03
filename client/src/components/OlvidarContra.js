import React, {Fragment, useState} from 'react'
import {useHistory} from "react-router-dom";
import './LandingPage.css';

const OlvidarContra = ()=> {
        let history = useHistory()
        const [data, setData] = useState({
            email: ''
        });

        const [alert, setAlert] = useState([])

        const updateField = e =>{
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
                const response = await fetch('http://localhost:5000/api/v1/olvidarcontra',
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
                        history.push("/")
                    }
                })
            }catch(err){
      
            }
        }
    return(
        
        <Fragment>
        <div className="container w-25 p-3 bg-primary rounded-lg text-light">
             <h4 className="text-center my-5 pt-5">Restablece tu contraseña</h4>

             <form className="my-5 text-center mx-auto" onSubmit={onSubmitForm}>            
                    <label for="email">Email address</label>
                    <input
                      className="form-control"
                      id="email"
                      type="email"
                      name= "email"
                      value={data.email}
                      onChange={updateField}
                      ></input>
                     <button className="btn btn-lg btn-warning my-5" type="submit">Enviar correo</button>


                      </form>
                
    </div>
    

</Fragment>
)
}

export default OlvidarContra; 
      