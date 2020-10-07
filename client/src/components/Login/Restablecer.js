import React, {Fragment, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import LandingNav from './../Landing-Registro/LandingNav';

const Restablecer = ()=> {
    const history = useHistory();
    const [password, setPassword] = useState("")
    const {token} = useParams()

    const PostData = async ()=>{
        console.log('click')
        await fetch("http://localhost:5000/new-password", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({password, token})
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                console.log(data.error)
            }else{
                alert('Tu contraseña cambió exitosamente')
                history.push('/login')
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    return(
        
        <Fragment>
            <LandingNav></LandingNav>
            <div class = "restablece">
            <div className="container w-25 my-5 bg-primary rounded-lg text-light p-4">
             
                    <div className="form-group text-left">
                        <label for="pwd">Contraseña</label>
                        <input id="pwd" className="form-control" onChange={(e)=>setPassword(e.target.value)} type="password"></input>
                    </div>
                <button className="btn btn-lg btn-warning my-4"  onClick={()=>PostData()}>Reestablecer contraseña</button>

                
            </div>  
            </div>
        </Fragment>
        
    );
}

export default Restablecer; 