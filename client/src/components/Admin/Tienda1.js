import React, {Fragment} from 'react';

const Tienda1 = () => {
  const mystyle = {
    height: "100%"
  }
  return (<Fragment>
    <div class='container'>
      <div>
        <button className="my-5 ml-5 btn btn-lg btn-warning">Atras</button>
        <h1 className='my-2 ml-5 display-4'>Tienda x</h1>
      </div>
      <div class="my-5 ml-5 col-lg-8 text-left">
        <div class="row interiorTienda">
            <label for="Encargado">Encargado</label>
            <label className="form-control" id="Encargado" hint="8a"></label>

            <label for="tel">Telefono</label>
            <label className="form-control" id="tel" hint="66215888"></label>

            <label for="Universidad">Universidad</label>
            <label className="form-control" id="Universidad" hint="uni"></label>

            <label for="Horario">Horario</label>
            <label id="Horario" className="form-control" hint="8am"></label>
            
            <label for="tarjeta">Terminal</label>
            <label className="form-control" id="tarjeta" hint="si"></label>

            <label for="validacion">Validacion</label>
            <label className="form-control" id="validacion" hint="pendiente"></label>
        </div>
        <div class="row interiorTienda2">
            <label for="img_tienda">Imagen Tienda</label>
            <img alt="Tienda"></img>
        </div>
      </div>
    </div>
  </Fragment>)
}

export default Tienda1;
