import React, {Fragment, useState} from 'react'
import {useHistory} from "react-router-dom";
import Errorflash from '../Errorflash';
import LandingNav from './LandingNav';

const RegistroUniversidad = ()=>{

    let history = useHistory()
    const [data, setData] = useState({
        nombre: '',
        ciudad: '',
        estado: ''
    });

    const [alert, setAlert] = useState([])
    const [error, setError] = useState(false)

    const updateField = e =>{
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    const onSubmitForm = async e =>{
        e.preventDefault();
        try{
            if (data.nombre!=="" && data.ciudad !=="" && data.estado!=="") {
              const body = data;
              const response = await fetch('http://localhost:5000/api/v1/universidades',
              {
                  method: "POST",
                  headers: {"Content-Type": "application/json"},
                  body: JSON.stringify(body)
              })
              .then(async resp =>{
                  const result = await resp.json()
                  if(result.error){
                      console.log(result.error)
                      history.push("/")
                  }else{
                      history.push("/")
                  }
              })
            }else{
                setError(true)
        console.log(error)
            }
        }catch(err){

        }
    }

    return(
        <Fragment>
            <LandingNav></LandingNav>
            <div className=""></div>
            <div className="container w-50 my-4 py-2 bg-color rounded-lg text-light">
                <h1 className="text-center my-10 pt-5">Registra tu Universidad</h1>
                <div className="my-2">
                  {error ? <Errorflash/> : '' }
                </div>
                <form className="my-5 text-center mx-auto w-75" onSubmit={onSubmitForm}>
                    <div className="form-group text-left">
                        <label for="Name_Universidad">Universidad</label>
                        <input
                        className="form-control"
                        id="Name_Universidad"
                        type="text"
                        name="nombre"
                        value={data.nombre}
                        onChange={updateField}
                        ></input>
                    </div>
                    <div className="form-group text-left">
                        <label for="tel">Ciudad</label>
                        <input
                        className="form-control"
                        id="Ciudad"
                        type="text"
                        name="ciudad"
                        value={data.ciudad}
                        onChange={updateField}
                        ></input>
                    </div>
                    <div className="form-group text-left">
                        <label for="Campus">Estado</label>
                        <input
                        className="form-control"
                        id="Campus"
                        type="text"
                        name="estado"
                        value={data.estado}
                        onChange={updateField}
                        ></input>
                    </div>
                    <button className="btn btn-lg btn-warning my-4" type="submit">Registrar</button>
                </form>
            </div>
        </Fragment>
    )
}
export default RegistroUniversidad;
