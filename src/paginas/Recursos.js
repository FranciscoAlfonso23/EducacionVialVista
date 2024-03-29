import React, { useState, useEffect } from 'react';
import '../App.css'
import '../Css/galeria.css'
//import Footer from '../componentes/Footer'
import Cookies from 'universal-cookie';
import UploadService from '../services/imagenes.service'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap'
import Card from 'react-bootstrap/Card';


const cookies = new Cookies();

function Recursos() {
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
            window.location.href = "/Principal";
        }
        UploadService.mostrarDocumentos().then((result) => {
            setData(result.data)
        })
    }, []);
    return (
        <>
            <div className="container">
                <div className="row">
                    {Object.values(Data).map((item, index) => {
                        return (
                            <div className="inf col-3 colum">
                                <Card style={{ width: '16rem' }}>
                                    <Card.Img style={{ height: '16rem' }} variant="top" src='./imagenes/pdf.svg' />
                                    <Card.Body>
                                        <Card.Text>
                                            {item.fileName}
                                        </Card.Text>
                                        <Button variant="primary" key={item._id} onClick={() => { handleClick(item.urlFile, item.fileName, item.descripcion) }}>Conocer</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='contModal'>
                <Modal isOpen={Estado}>
                    <ModalHeader>
                        <Label >Nombre: {nombre}</Label>
                    </ModalHeader>
                    <ModalBody>
                        <div className='pdf'>
                            <iframe title='Pdf' className='archivo' src={ruta}></iframe>
                        </div>
                        {descripcion}
                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary' onClick={handleClick}>Cerrar</Button>
                    </ModalFooter>
                </Modal>
            </div>

        </>
    );
}

export default Recursos;
