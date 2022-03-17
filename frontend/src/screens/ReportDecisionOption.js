import React from 'react'

export default function ReportDecisionOption(props) {

    const ReportHandler = (e) => {
        var nowDate = new Date()
        var date = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate()
        var param
        var tipo = e.target.id
        var flag = true
        var fechaInicio
        var fechaFinal
        do {
             fechaInicio = prompt('Ingrese fecha inicial para el reporte')
             fechaFinal = prompt('Ingrese fecha final para el reporte')
           
            if (fechaInicio === "" || fechaFinal === "") {
                flag = false
                alert('No puede estar vacio')
            }

            else {
                if (fechaInicio?.includes("/") || fechaFinal?.includes("/")) {
                    flag = false
                    alert('Ingrese formato adecuado: yyyy-mm-dd')
                }for( let i=0; i<=fechaInicio?.length; i++){
                    if(fechaInicio.charAt(i)>= 'a' && fechaInicio.charAt(i)<='z'){
                        flag = false
                    }
                }
                for( let i=0; i<=fechaFinal?.length; i++){
                    if(fechaFinal.charAt(i)>= 'a' && fechaFinal.charAt(i)<='z'){
                        flag = false
                    }
                }
              /*  if (fechaInicio > date || fechaFinal > date) {
                    flag = false
                    alert('Fecha invalida')
                }*/
            
            }
        } while (!flag);
        if(fechaInicio=== null && fechaFinal=== null)
        {

        }
        if (flag) {
            props.history.push({
                pathname: '/reportsdecision',
                state: {
                    tipoReporte: tipo,
                    fechaInicio: fechaInicio,
                    fechaFinal: fechaFinal
                }
            })
        }
    }
    return (
        <div>
            <ul onClick={ReportHandler} >
                <li><a id='Ganancias'>Reporte de ganancias</a></li>
                <li><a id='Entregas'>Reporte de entregas</a></li>
                <li><a id="Ordenes">Reporte de ordenes registradas</a></li>
                <li><a id="Cobradas">Reporte de ordenes cobradas</a></li>
                <li><a id="Producto">Reporte de producto mas vendido</a></li>
            </ul>
        </div>
    )
}
