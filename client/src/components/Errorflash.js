import React, {Fragment, useCallback} from 'react';
import {Link} from 'react-router-dom';


const Errorflash = ()=> {
    
    return(
        <Fragment>
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
            No debe haber campos vacios
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
        </Fragment>
    );
}

export default Errorflash;
