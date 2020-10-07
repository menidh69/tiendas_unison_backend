import React, {Fragment} from 'react'

const RegistroTienda = ()=>{
    return(
        <Fragment>
            <div className="container w-30 bg-primary rounded-lg text-light">
                <h1 className="text-center my-10 pt-5">Registra tu Tienda</h1>

                <form className="my-5 text-center mx-auto">
                    <div className="form-group text-left">
                        <label for="Name_tienda">Nombre de Tienda</label>
                        <input className="form-control" id="Name_tienda" type="text"></input>
                    </div>

                    <div className="form-group text-left">
                        <label for="Tipo_tienda">Tipo de Tienda</label>
                        <input className="form-control" id="Tipo_tienda" type="text"></input>
                    </div>

                    <div className="form-group text-left">
                        <label for="Horario">Horario</label>
                        <input id="Horario" className="form-control" type="text"></input>
                    </div>
                    <div className="form-group text-left">
                        <label for="Universidad">Universidad</label>
                        <input className="form-control" id="Universidad" type="text"></input>
                    </div>
                    <div className="form-group text-left">
                        <label for="img_tienda">Imagen Tienda</label>
                        <small>*URL de la imagen</small>
                        <input id="img_tienda" className="form-control" type="URL"></input>
                    </div>

                    <div className="form-group text-left">
                    <label>Aceptan tarjeta</label>
                    <div name = 'tar' className="form-group text-left">
                        <label for= "Tarjeta_Si">Si</label>
                        <input  id="Tarjeta_Si" type="radio"></input>
                        <label for= "Tarjeta_No">No</label>
                        <input id="Tarjeta_No" type="radio"></input>
                    </div>
                    </div>
                    <div>
                      <small>*Tiene un mes de prueba a partir de ese plazo se le hara un cobro a su tarjeta</small>
                    </div>

                    <button className="btn btn-lg btn-warning my-4" type="submit">Login</button>

                </form>
            </div>
        </Fragment>
    )
}

export default RegistroTienda;
