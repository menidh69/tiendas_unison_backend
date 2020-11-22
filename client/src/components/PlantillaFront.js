import React, {Fragment, useEffect, useState, useContext} from 'react';
import { UserContext } from '../UserContext';
import {Modal, Button} from 'react-bootstrap';
//Aqui importamos un archivo JSON estatico de la carpeta dataJSON
import datosVentas from './dataJSON/ventas_entregadas_JSON';


const MisReportes = () =>{
    const [data, setData] = useState();
    const {user, setUser} = useContext(UserContext);

    useEffect(()=>{
        let isMounted = true;
        if(isMounted){
          fetchData()
          .then(json=>{
            setData(json);
          })    
        } 
        return ()=>{isMounted=false}
        
    }, []);

    const fetchData = async()=>{
        // Aqui tomaremos la informacion con un fetch, pero mientras
        // esa informacion no esté lista, usaremos los archivos json predefinidos,
        // se los asignaremos a una variable y haremos return. Ejemplo a continuacion:
        const json = datosVentas;
        // console.log(json)
        return json;
    }

    
    return(
        <Fragment>
            {data ?
            <div>
                {/* Lo que mostraremos si tenemos los datos cargados*/}
                <h1>Ejemplos</h1>
                <div className="text-dark">
                {/* {data.map(item=>(
                    
                    <h1 className="text-dark">{item.total}</h1>

                ))} */}
                </div>
            </div>
        : 
        <div>
            {/* Lo que mostraremos si no hay datos para mostrar*/}
            No hay Ejemplos

        </div>
        
        }
        </Fragment>
    )
}

export default MisReportes;