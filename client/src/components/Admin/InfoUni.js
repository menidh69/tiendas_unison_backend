import React, {Fragment, useEffect, useState} from 'react';


function InfoUni({match}){

    const mystyle = {
        height: "100%",
    }

        useEffect(()=>{
            fetchinfo();
            console.log(match)
        }, []);
    

    const [item, setItem] = useState({
        sprites:{}
    })

    const fetchinfo = async ()=>{
        const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${match.params.id}`)
        const item = await data.json();
        setItem(item)
    }

    return(
       
        <div className="col-9 border-left" style={{mystyle}}>
            <div className="container my-4 mx-4">
                <h1 className='my-4 display-4'>Información de {match.params.id}</h1>
                <h1>{item.name}</h1>
                <img src={item.sprites.front_default}></img>
            </div>
        </div>
       
    )
}

export default InfoUni;