import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import UploadService from '../services/imagenes.service'
import '../Css/servicios.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap'

const cookies = new Cookies();
function Servicios() {
    const [Data, setData] = useState("")
    const [Estado, setEstado] = useState(false);
    const [nombre, setNombre] = useState("")
    const [ruta, setRuta] = useState("")
    const [descripcion, setDescripcion] = useState("")

    const handleClick = (ruta, nombre, descripcion) => {
        setEstado(!Estado);
        setRuta(ruta)
        setNombre(nombre)
        setDescripcion(descripcion)
    }
    useEffect(() => {
        if (cookies.get('Nombre')) {
            window.location.href = "/DigiVot";
        }
        UploadService.mostrarImagenes().then((result) => {
            setData(result.data)
        })
    }, []);
    return (
        <>
            <div className="container">
                <div className="row">
                    {Object.values(Data).map((item, index) => {
                        return (
                            <div className="col-3 colum">
                                <div className="row">
                                    <img src={item.urlFile} alt='' className='card-img' />
                                </div>
                                <div className="row">
                                    <Button className='visualizar' color='success' key={item._id} onClick={() => { handleClick(item.urlFile, item.fileName, item.descripcion) }}>Ver</Button>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
            <div className='contModal'>
                <Modal isOpen={Estado}>
                    <ModalHeader>
                        <Label >{nombre}</Label>
                    </ModalHeader>

                    <ModalBody>
                        <div className="d-flex justify-content-center mb-2">
                            <img className='imModal' src={ruta} alt='' />
                        </div>

                    </ModalBody>

                    <ModalFooter>
                        <div class="row mb-3">
                            <div className="justify-content-center mb-2">
                                <Label >{descripcion}</Label>
                            </div>
                            <div >
                                <Button color='primary' onClick={handleClick}>Cerrar</Button>
                            </div>
                        </div>

                    </ModalFooter>
                </Modal>
            </div>

        </>
    );
}

export default Servicios;