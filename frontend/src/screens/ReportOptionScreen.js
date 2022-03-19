import React from 'react'

export default function ReportOptionScreen(props) {
  const ReportHandler = e => {
    var param
    var tipo = e.target.id
    var flag = true
    switch (tipo) {
      case 'Categoria':
        do {
          param = prompt('Ingrese la categoria del producto')
          if (param === '') {
            flag = false
            alert('No puede estar vacio')
          } else {
            for (let i = 0; i <= param?.length; i++) {
              if (param.charAt(i) >= '0' && param.charAt(i) <= '9') {
                flag = false
              }
            }
          }
        } while (!flag)

        break
      case 'Marca':
        do {
          param = prompt('Ingrese la marca del producto')
          if (param === '') {
            flag = false
            alert('No puede estar vacio')
          } else {
            for (let i = 0; i <= param?.length; i++) {
              if (param.charAt(i) >= '0' && param.charAt(i) <= '9') {
                flag = false
              }
            }
          }
        } while (!flag)
        break
      case 'Cantidad':
        do {
          param = prompt('Ingrese la cantidad del producto')
          if (param === '') {
            flag = false
            alert('No puede estar vacio')
          } else {
            for (let i = 0; i <= param?.length; i++) {
              if (param.charAt(i) >= 'a' && param.charAt(i) <= 'z') {
                flag = false
              }
            }
          }
        } while (!flag)
        break
      case 'Marca':
        do {
          param = prompt('Ingrese la marca del producto')
          if (param === '') {
            flag = false
            alert('No puede estar vacio')
          } else {
            for (let i = 0; i <= param?.length; i++) {
              if (param.charAt(i) >= '0' && param.charAt(i) <= '9') {
                flag = false
              }
            }
          }
        } while (!flag)
        break
    }

    props.history.push({
      pathname: '/reports',
      state: {
        tipoReporte: tipo,
        parametro: param,
      },
    })
  }
  return (
    <div>
      <ul onClick={ReportHandler}>
        <li>
          <a id="Categoria">Reporte de categoria</a>
        </li>
        <li>
          <a id="Marca">Reporte por marca</a>
        </li>
        <li>
          <a id="Precio">Reporte por precio</a>
        </li>
        <li>
          <a id="Cantidad">Reporte por cantidad</a>
        </li>
      </ul>
    </div>
  )
}
