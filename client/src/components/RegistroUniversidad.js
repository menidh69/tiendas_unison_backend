import React, {Fragment} from 'react'

const RegistroUniversidad = ()=>{
    return(
        <Fragment>
            <div className="container w-30 bg-primary rounded-lg text-light">
                <h1 className="text-center my-10 pt-5">Registra tu Universidad</h1>

                <form className="my-5 text-center mx-auto">
                    <div className="form-group text-left">
                        <label for="Name_Universidad">Universidad</label>
                        <input className="form-control" id="Name_Universidad" type="text"></input>
                    </div>
                    <div className="form-group text-left">
                        <label for="tel">Ciudad</label>
                        <input className="form-control" id="Ciudad" type="text"></input>
                    </div>
                    <div className="form-group text-left">
                        <label for="Campus">Campus</label>
                        <input className="form-control" id="Campus" type="text"></input>
                    </div>
                    <button className="btn btn-lg btn-warning my-4" type="submit">Login</button>
                </form>
            </div>
        </Fragment>
    )
}
export default RegistroUniversidad;
