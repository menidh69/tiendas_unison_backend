import React, {Fragment, useEffect, useState, useContext} from 'react';
import { UserContext } from '../../UserContext';
import {Modal, Button, Form} from 'react-bootstrap';
import GraficaVenta from './GraficaVenta';


const VentanaVentas = ()=>{
const [month, setMonth] = useState(11)
const [ventas, setVentas] = useState()
const {user, setUser} = useContext(UserContext);


useEffect(()=>{
    let isMounted = true;
    if(isMounted){
        fetchVentas()
        .then(json=>{
            console.log(json)
            setVentas(json);
        })
    }
    return ()=>isMounted=false
}, [month])

const fetchVentas = async()=>{
    const datos = await fetch(`https://tiendas-unison-web.herokuapp.com/api/v1/ventas/${month}/${user.id}`)
    const json = await datos.json()
    return json
}

const getMonth = ()=>{
    //oBTENER EL MES Y PONERLO COMO DEFAULT
}

return (
    <Fragment>
    <div className="text-center my-4">
    <h2>Mis ventas</h2>
    <Form.Group controlId="exampleForm.ControlSelect1" className="w-50 mx-auto">
    <Form.Label>Selecciona el mes</Form.Label>
    <Form.Control as="select" defaultValue="12" onChange={e=>setMonth(e.target.value)}>
      <option value="1">Enero</option>
      <option value="2">Febrero</option>
      <option value="3">Marzo</option>
      <option value="4">Abril</option>
      <option value="5">Mayo</option>
      <option value="6">Junio</option>
      <option value="7">Julio</option>
      <option value="8">Agosto</option>
      <option value="9">Septiembre</option>
      <option value="10">Octubre</option>
      <option value="11">Noviembre</option>
      <option value="12">Diciembre</option>
    </Form.Control>
  </Form.Group>
    <hr/>
    {ventas ? 
    <div>
        <GraficaVenta ventas={ventas} month={month} id={user.id}></GraficaVenta>
    </div>
    : 
    null}
    </div>
    </Fragment>
)
}

export default VentanaVentas;