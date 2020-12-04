import React, {Fragment, useContext, useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';



const StarIcon = (props)=>{
    const {fill=false}=props;
    return(
        <Fragment>
            {fill?
            <FontAwesomeIcon color="gold" icon={faStar} />
            :
            <FontAwesomeIcon icon={faStar} />
}
        </Fragment>
    )
}
export default StarIcon;