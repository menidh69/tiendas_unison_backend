import React, { useState, useEffect} from "react";

export default function App(){
    const[data, setData]  = useState([])
    const [q,setQ] = useState("")

    return(
        <div>
        <div> Filtro va aqui</div>
        <div> Datatable va aqui </div>
        </div>
    );
    
}
