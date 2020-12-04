import React, {Fragment, useEffect, useState, useContext} from 'react';
import { UserContext } from '../../UserContext';
import {Modal, Button} from 'react-bootstrap';


const MisReportes = () =>{
    const [dataReportes, setDataReportes] = useState([]);
    const {user, setUser} = useContext(UserContext);



    useEffect(()=>{
        let isMounted = true;
        if(isMounted){
          fetchReportes()
          .then(json=>{
            setDataReportes(json);
          })    
        } 
        return ()=>{isMounted=false}
        
    }, []);

    const fetchReportes = async()=>{
        const data = await fetch(`https://tiendas-unison-web.herokuapp.com/api/v1/reporte_tienda/usuario/${user.id}`);
        const json = await data.json();
        return json.result[0].tienda.reporte_tiendas;
    }

    
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    
    return(
        <Fragment>
            {dataReportes ?
            <Fragment>
                <div className="container my-4">
                    <h1 className="text-center text-dark my-4">Mis Reportes 
                    <span><button className="btn btn-sm btn-primary float-right" onClick={handleShow}>Contacta al admin</button></span>
                    </h1>

                    <p><strong>Reportes totales:{dataReportes.length}</strong></p>
                    <table className="table table-striped">
                    <thead>
                        <th>ID</th>
                        <th>Id Usuario</th>
                        <th>Reporte</th>
                    </thead>
                    <tbody>
                    {dataReportes.map(item=>(
                
                        <tr>
                        <td>{item.id}</td>
                        <td>{item.id_usuario}</td>
                        <td>Descripcion</td>
                        <td>
                        </td>
                        </tr>
                        
                    ))}
                        
                    </tbody>
                    </table>
                    </div>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Contacta al admin</Modal.Title>
                        </Modal.Header>
                        <Modal.Body><p>Puedes contactar por medio de correo o llamda telefónica, este revisará tus reportes
                            yen caso de ser un malentendido eliminará los reportes.</p>
                            <label for="correo">Correo</label>
                            <p id="correo">admin@tiendasuniversitarias.mx</p>
                            <label for="tel">Telefono</label>
                            <p id="tel">6624284910</p>
                        </Modal.Body>
                        <Modal.Footer>
                        
                        <Button variant="primary" onClick={handleClose}>
                            Entendido
                        </Button>
                        </Modal.Footer>
                    </Modal>
        </Fragment>
        : <h1 className="text-center"> Usted no tiende reportes</h1>}
        </Fragment>
    )
}

export default MisReportes;