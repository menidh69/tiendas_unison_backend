import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';

const LandingNav = ()=>{
  
    const style={
        maxWidth: "30px",
        maxHeight: "30px"
    }
    const navStyle={
        position: "absolute",
        left: "50%",
        transform: "translatex(-50%)"
    }

    return(
        <Fragment>
        <nav className="navbar bg-primary py-auto my-auto center">
            <div className="container-fluid-nav text-center" style={navStyle}>
            <Link to="/">
            <a className="mx-auto text-center text-light">
                <img src="/Unioncarrito.png" style={style} alt="" className="mx-2" loading="lazy"/>
                Tiendas Universidad
            </a>
            </Link>
            </div>
        </nav>
        </Fragment>
    )
}

export default LandingNav;