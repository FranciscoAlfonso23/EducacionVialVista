import React, { useState, useEffect } from 'react'

import UploadService from '../services/imagenes.service'
import swal from 'sweetalert'
import '../Css/lista.css'




const Lista = () => {
    const [Data, setData] = useState("")

    const eliminar = (id) => {
        swal({
            title: "Desea Eliminar?",
            text: "Una vez eliminado, no se podra recuperar el registro",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    UploadService.deleteImages(id).then((result) => {
                        
                    })
                    swal("Eliminado!", {
                        icon: "success",
                    });
                    UploadService.mostrarImagenes().then((result) => {
                        setData(result.data)
                    })
                }
            }); 
    }

    useEffect(() => {
        UploadService.mostrarImagenes().then((result) => {
            setData(result.data)
        })
    }, []);
    return (
        <>
            <div class="row">
                {Object.values(Data).map((item, index) => {
                    return (
                        <div className="col-md-6">
                            <div className='car'>
                                <img src={item.urlFile} alt='' className='ca' />
                                <h5>{`${item.fileName}`}</h5>
                                <p className='about-text' >
                                    {item.descripcion}
                                </p>
                                <div className="row fila">
                                    <div className="col col-4">
                                        <button type="button" className="btn btn-danger" key={item._id} onClick={() => { eliminar(item._id) }}>Eliminar</button>
                                    </div>
                                    <br/>
                                    <div className="col col-4">
                                        <button type="button" class="btn btn-success" >Editar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

        </>
    )
}

export default Lista;