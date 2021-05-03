import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import UploadService from '../services/imagenes.service'
import '../Css/Contacto.css'

const cookies = new Cookies();

export default function Contacto(){
  const [Data, setData] = useState("")
  const refrescar=() => {
    UploadService.mostrarContacto().then((result) => {
        setData(result.data)
    })
}
useEffect(() => {
  if (cookies.get('Nombre')) {
    window.location.href = "/Principal";
}
  refrescar()
}, []);

    return(
      <div className='contenido'>
        <h1>Contactanos</h1>
      <div class="row mb-3 fila">      
            <div className="col-6 themed-grid-col columna">
            <img className='dev' src="/imagenes/develop.jpg" alt="MDN"/>              
            </div>
            {Object.values(Data).map((item, index) => {
                                            return (
            <div className="col-6 themed-grid-col">
            
                <h4>Desarrollador</h4>
                <p/>
                <label>{item.Desarrollador}</label>
                <h4>Correo electronico de soporte</h4>
                <p/>
                <label>{item.Email}</label>
                <h4>Telefono</h4>
                <p/>
                <label>{item.Telefono}</label>
                <h4>Direccion</h4>
                <p/>
                <label>{item.Direccion}</label>
                  
            </div>
            )
          })}
      </div>     
      </div> 
    )
}
