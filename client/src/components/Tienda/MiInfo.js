import React, {Fragment, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const MiInfo = ()=>{
  useEffect(()=>{
      fetchitems();
  }, []);

  const [items, setItems] = useState([])
  const [data, setData] = useState({})

  const fetchitems = async ()=>{
      const data = await fetch(`http://localhost:5000/api/v1/$mitienda{id}`);
      const items = await data.json();
      console.log(items)
      setItems(items)
  };


    return(
        <Fragment>
        <h1>MI INFORMACION</h1>

        </Fragment>
    )
}

export default MiInfo;
