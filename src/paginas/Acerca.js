import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import UploadService from '../services/imagenes.service'
import '../Css/Contacto.css'

const cookies = new Cookies();

export default function Contacto(){
  const [Data, setData] = useState("")
  const refrescar=() => {
    UploadService.mostrarAcerca().then((result) => {
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
      <div class="container">
      {Object.values(Data).map((item, index) => {
        return (
        <div>
            <h2 class="title text-center">Quienes somos?</h2>
            <p class="intro text-center">{item.descripcion}</p>
           
            <div class="row">
                <div class="item col-lg-4 col-md-6 col-12">
                    <div class="icon-holder">
                        <i class="fas fa-heart"></i>
                    </div>
                    <div class="content">
                        <h3 class="sub-title">Nombre de la Institutcion</h3>
                        <p>{item.institucion}</p>
                    </div>
                </div>
                <div class="item col-lg-4 col-md-6 col-12">
                    <div class="icon-holder">
                        <i class="far fa-clock"></i>
                    </div>
                    <div class="content">
                        <h3 class="sub-title">Vision</h3>
                        <p>{item.vision}</p>
                    </div>
                </div>
                <div class="item col-lg-4 col-md-6 col-12">
                    <div class="icon-holder">
                        <i class="fas fa-crosshairs"></i>
                    </div>
                    <div class="content">
                        <h3 class="sub-title">Misión</h3>
                        <p>{item.mision}</p>
                    </div>
                </div>          
                 
            </div>          
      </div>
        )
      })}
        </div>
    )
}
