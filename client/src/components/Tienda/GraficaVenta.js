import React, {Fragment, useEffect, useState, useContext} from 'react';
import { UserContext } from '../../UserContext';
import {Modal, Button, Form, Container, Row, Col} from 'react-bootstrap';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryZoomContainer } from 'victory';


const GraficaVenta = (props)=>{
    const [ventadiaria, setVentadiaria] = useState()
    const[dias, setDias]=useState(30)
    const [datos, setDatos] = useState()

    const setDiasMes = ()=>{
        let dias = [];
        switch(props.month){
            case 1,3,5,7,9,11:
                for(let i=1; i<31; i++){
                    dias.push(i)
                }
                break;
            case 4,6,8,10,12:
                for(let i=1; i<32; i++){
                    dias.push(i)
                }
                break;
            case 2:
                for(let i=1; i<29; i++){
                    dias.push(i)
                }
                break;
                
        }
        return dias
    }

    const arrangeData = (data)=>{
        let arrayDatos = []
        let arrayDias = []
        data.map(orden=>{
            if(!(arrayDias.includes(orden.fecha))){
                arrayDias.push(orden.fecha)
        }})
        console.log(arrayDias)
        arrayDias.map(fecha=>{
            let totalDiario = 0
            data.map(orden=>{
                if(fecha==orden.fecha){
                    if(orden.amount){
                    totalDiario += orden.amount
                    }
                }
                })
            arrayDatos.push({x: new Date(fecha).getDate(), y: totalDiario/100})
        })
        console.log(arrayDatos)
        return arrayDatos
    }

    const setTickDates = ()=>{
        let dates = []
        const d = new Date()
        const año = d.getFullYear()
        switch(props.month){
            case 1,3,5,7,9,11:
                for(let i=1; i<31; i++){
                    dates.push(new Date(año, props.month, i).getDate())
                }
                break;
            case 4,6,8,10,12:
                for(let i=1; i<32; i++){
                    dates.push(new Date(año, props.month, i).getDate())
                }
                break;
            case 2:
                for(let i=1; i<29; i++){
                    dates.push(new Date(año, props.month, i).getDate())
                }
                break;
                
        }
        console.log(dates)
        return dates
    }

    const totalVendido = ()=>{
        let total = 0
        ventadiaria.map(venta=>{
            total += venta.y
        })
        return total;
    }

    const calculaPromedio = ()=>{
        let promedio = 0
        let suma = 0
        ventadiaria.map(venta=>{
            suma+=venta.y
        })
        promedio = suma/ventadiaria.length
        return promedio
    }

    const obtenMayor = ()=>{
        let mayor = 0;
        ventadiaria.map(venta=>{
            if(venta.y>mayor){
                mayor = venta.y
            }
        })
        return mayor;
    }

    const fetchVentas = async()=>{
        const datos = await fetch(`http://localhost:5000/api/v1/ventas/${props.month}/${props.id}`)
        const json = await datos.json()
        return json.ventas
    }

    useEffect(()=>{
        let isMounted = true;
        if(isMounted){
            fetchVentas()
            .then(json=>{
                setDatos(json)
                const data = arrangeData(json)
                setVentadiaria(data)
            })
            
        }
        return ()=>isMounted=false;
    },[props.month])

    const style = {
        backgroundColor: "#29698f"
    }

    return(
        <Fragment>
            {ventadiaria?
            <Container style={style} className="py-2 rounded">
                <Row>
                    <Col className="border text-left py-4 bg-light mx-2 rounded px-4">
                    <h3 className="my-4">Informacion de Ventas</h3>
                    <div className="my-2">
                    <h5>Cantidad de ventas realizadas</h5>
                    <p>{datos.length}</p>
                    </div>
                    <div className="my-2">
                    <h5>Total vendido</h5>
                    <p>${totalVendido()}</p>
                    </div>
                    <div className="my-2">
                        <h5>Promedio diario</h5>
                        <p>${calculaPromedio()}</p>
                    </div>
                    </Col>
                    <Col className="bg-light mx-2 rounded">
                    <VictoryChart domainPadding={10} 
                    containerComponent={<VictoryZoomContainer zoomDomain={{x: [5, 35], y: [0, obtenMayor()]}}/>}
                    animate={{
                    duration: 1000,
                    onLoad: { duration: 500 }
                    }}
                    scale={{ x: "time" }} theme={VictoryTheme.material}>
                    <VictoryAxis
                        // tickValues specifies both the number of ticks and where
                        // they are placed on the axis
                        tickValues={setTickDates()}
                        tickFormat={(x) => {
                                if(x%5===0){
                                    return (x +`/${props.month}`) ;
                                }
                                else{
                                    return
                                }
                              
                        }}
                            
                        />
                        <VictoryAxis
                        dependentAxis
                        // tickFormat specifies how ticks should be displayed
                        tickFormat={(x) => (`$${x}`)}
                        />
                    <VictoryBar
                    barWidth={4}
                    data={ventadiaria}
                    style={{ data: { fill: "#FF9500" } }}
                    ></VictoryBar>
                    </VictoryChart>
                    </Col>
                </Row>
            </Container>
            : null}
        </Fragment>
    )
}

export default GraficaVenta;