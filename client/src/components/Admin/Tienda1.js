import React, {Fragment} from 'react';


const Tienda1 = ()=>{
    const mystyle = {
        height: "100%",
    }
    return(
      <Fragment>
        <div>
          <button className="btn btn-lg btn-warning">Atras</button>
          <h1 className='my-4 display-4'>Tienda X</h1>
        </div>
        <div class="col-sm-4 col-md-4 col-lg-4 text-center">

            <label for="Encargado">Encargado</label>
            <label className="form-control" id="Encargado" hint="8a"></label>

            <label for="tel">Telefono</label>
            <label className="form-control" id="tel" hint="66215888"></label>

            <label for="Universidad">Universidad</label>
            <label className="form-control" id="Universidad" hint="uni"></label>

            <label for="Horario">Horario</label>
            <label id="Horario" className="form-control"  hint="8am"></label>

            <label for="tarjeta">Terminal</label>
            <label className="form-control" id="tarjeta" hint="si"></label>



        </div>
        <div col-sm-4 hidden-md col-lg-4 text-center>
          <label for="img_tienda">Imagen Tienda</label>
          <label id="img_tienda"></label>
      
          <label for="validacion">Validacion</label>
          <label className="form-control" id="validacion" hint="pendiente"></label>

        </div>
      </Fragment>
    )
}

export default Tienda1;
