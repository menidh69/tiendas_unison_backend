import React, {Fragment, useState} from 'react'
import {useHistory} from "react-router-dom";
import '../LandingPage.css';
import {ToastContainer, toast, Zoom, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import LandingNav from '../Landing-Registro/LandingNav';


    const OlvidarContra  =() =>{
        const history = useHistory()
        const [email,setEmail] = useState("")

        const PostData = ()=>{
            if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
                toast({html: "invalid email",classes:"#c62828 red darken-3"})
                return
            }
            fetch('https://tiendas-unison-web.herokuapp.com/olvidarcontra   ',{
                method:"post",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    email
                })
            }).then(res=>res.json())
            .then(data=>{
               if(data.error){
                   toast({html: data.error,classes:"#c62828 red darken-3"})
               }
               else{
                   toast({html:data.message,classes:"#43a047 green darken-1"})
                   history.push('/')
               }
            }).catch(err=>{
                console.log(err)
            })
        }
       return (
           <Fragment>
           <LandingNav></LandingNav>
        <div className="container w-25 my-5 p-3 bg-primary rounded-lg text-light">
        <h4 className="text-center my-5 pt-5">Restablece tu contraseña</h4>
           
           
           <div className="form-group text-left">
                  <label for="email">Email address</label>
                    <input
                     className="form-control"
                     
                     type="text"
                     placeholder="email" 
                     value={email}
                     onChange={(e)=>setEmail(e.target.value)}
                     
                     ></input>
           </div> 
           <button className="btn btn-lg btn-warning my-5" onClick={()=>PostData()} > Enviar correo </button>
    
         
     </div>
     </Fragment>
 
    
       )
    }

export default OlvidarContra

// https://www.youtube.com/watch?v=VdVGPov7Yqc  toastify 
/*
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
                const response = await fetch('https://tiendas-unison-web.herokuapp.com/api/v1/olvidarcontra',
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

export default OlvidarContra; */
      