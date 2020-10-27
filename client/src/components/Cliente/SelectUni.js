
import React, {Fragment, useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { UserContext } from '../../UserContext';
import {Button, Modal} from 'react-bootstrap';

const SelectUni = ()=>{
    const [unis, setUnis] = useState([]);
    const {user, setUser} = useContext(UserContext)
    useEffect(()=>{
      fetchUniversidades()
    }, [])

    const updateField = e => {
        setUser({
          ...user,
          id_universidad: e.target.value
        });
      }

    const fetchUniversidades = async ()=>{
      const data = await fetch('http://localhost:5000/api/v1/universidades')
      const json = await data.json();
      console.log(json)
      setUnis(json);
    }

    const handleClose = ()=>{
        console.log('Hola')
    }


return(
<Fragment>
    <Modal show={'true'} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>Selecciona tu universidad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h4>Selecciona tu universidad!</h4>
            <div className="form-group text-left">
                      <label for="universidad">Universidad</label>
                      <select id="universidad" name="universidad" className="form-control" onChange={updateField}>
                      <option selected>Selecciona universidad</option>
                       {unis.map(uni=>(
                         <option key={uni.id} value={uni.id}>{uni.nombre}</option>
                       ))}
                      </select>
                    </div>

        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
            Guardar
        </Button>
        </Modal.Footer>
    </Modal>
</Fragment>
)

}
export default SelectUni;