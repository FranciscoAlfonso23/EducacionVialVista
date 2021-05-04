import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import '../Css/Plataforma.css';
import swal from 'sweetalert'
import UploadService from '../services/imagenes.service'
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Card,
    CardBody,
    CardHeader,
    CardTitle,
    Table,
    Row,
    Col,
} from 'reactstrap'

const cookies = new Cookies();

export default function Plataforma() {
    const [id, setid] = useState("")
    const [name, setName] = useState("")
    const [descripcion, setD] = useState("")
    const [file, setFile] = useState("")
    const [pathImage, setPathImage] = useState("http://localhost:4000/upload.png")
    const [Data, setData] = useState("")
    const [Estado, setEstado] = useState(false);
    const [Modal2, setModal2] = useState(false);
    const [ruta, setRuta] = useState("")

    const sendImage = (e) => {
        e.preventDefault()
        UploadService.sendImages(name, descripcion, file).then((result) => {
            console.log("el resultado es: ", result)
            UploadService.mostrarImagenes().then((result) => {
                setData(result.data)
                handleClick()
                setPathImage("http://localhost:4000/upload.png")
            })
        })
    }

    const sendDocument = (e) => {
        e.preventDefault();
        UploadService.updatePicture(id,name,descripcion).then((result) => {
            UploadService.mostrarImagenes().then((result) => {
                setData(result.data)
                Cerrar()
            })
        });

    }

    
    const update = (id, ruta, nombre, descripcion) => {
        setModal2(!Modal2);
        setid(id);
        setName(nombre);
        setRuta(ruta);
        setD(descripcion);
    }
    

    const handleClick = () => {
        setEstado(!Estado);
    }

    const refrescar = () => {
        UploadService.mostrarImagenes().then((result) => {
            setData(result.data)
        })
    }

    const Cerrar=()=>{
        setModal2(!Modal2);
    }



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
                    refrescar()
                }
            });
    }

    const onFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            if (file.type.includes("image")) {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = function load() {
                    setPathImage(reader.result)
                }
                setFile(file)
            } else {
                console.log("error")
            }
        }
    }

    useEffect(() => {
        if (!cookies.get('Nombre')) {
            window.location.href = "/Login";
        } else {
            document.getElementById("Menu").style.display = 'none';
            document.getElementById("sidebarmenu").style.display = 'flex';
            document.getElementById("con").style.display = 'none';
        }

        refrescar()
    }, []);



    return (
        <>
            <div class="breadcome-area">
                <div class="container-fluid">
                    <div class="row">
                        <div class="breadcome-list">
                            <h1>Fotos</h1>
                            <hr />
                            <button type="button" class="btn btn-custon-rounded-four btn-primary" onClick={handleClick}>
                                <i class="fa fa-plus" aria-hidden="true"></i> Agregar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="content">
                <Row>
                    <Col xs={12}>
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Tabla Fotos</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Table responsive>
                                    <thead className="text-primary">
                                        <tr responsive>
                                            <th  >Nombre</th>
                                            <th >Descripcion</th>
                                            <th >Foto</th>
                                            <th >Accion</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.values(Data).map((item, index) => {
                                            return (
                                                <tr>
                                                    <th   >{item.fileName}</th>
                                                    <th  >{item.descripcion}</th>
                                                    <th  ><a href={item.urlFile}>Abrir el Archivo</a></th>
                                                    <th >
                                                        <div className='botones'>
                                                            <button type="button" class="btn btn-success" onClick={() => { update(item._id,item.urlFile,item.fileName,item.descripcion) }}>Editar</button>
                                                            <button type="button" class="btn btn-danger" onClick={() => { eliminar(item._id) }} >Eliminar</button>
                                                        </div>
                                                    </th>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>

            <div className='agregar'>
                <Modal isOpen={Estado}>
                    <ModalHeader>
                        <Label >Nueva Foto</Label>
                    </ModalHeader>

                    <ModalBody>
                        <form className='subir' >
                            <div class="container">
                                <div className='row'>
                                    <div className='col-sm'>
                                        <div className='input-file'>
                                            <input
                                                type="file"

                                                class="form-file"
                                                placeholder="file"
                                                onChange={onFileChange}
                                            />
                                            <img className="img-fluid img-thumbnail image" src={pathImage} alt="Im" />
                                        </div>
                                    </div>
                                    <div className='col-sm'>
                                        <div className='contenedor'>
                                            <input
                                                type="text"
                                                placeholder="Ingresa nombre"
                                                className="name-picture mt-2"
                                                onChange={(e) => setName(e.target.value)}
                                            />

                                            <input
                                                type="text"
                                                placeholder="Descripcion"
                                                className="name-picture mt-2"
                                                onChange={(e) => setD(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                </div>

                            </div>
                            <button type="submit" className="btn btn-success" onClick={sendImage}>Guardar</button>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={handleClick}>Cerrar</Button>
                    </ModalFooter>
                </Modal>
            </div>
            <div className='agregar'>
                <Modal isOpen={Modal2}>
                    <ModalHeader>
                        <Label >Editar Documento</Label>
                    </ModalHeader>

                    <ModalBody>
                        <form className='subir' >
                            <div class="container">
                                <div className='row'>
                                    <div className='col-sm'>
                                
                                        <iframe title='visor' className='archivo' src={ruta}>hola</iframe>
                               
                                    </div>
                                    <div className='col-sm'>
                                        <div className='contenedor'>
                                            <input
                                                type="text"
                                                placeholder={name}
                                                className="name-picture mt-2"
                                                onChange={(e) => setName(e.target.value)}
                                            />

                                            <input
                                                type="text"
                                                placeholder={descripcion}
                                                className="name-picture mt-2"
                                                onChange={(e) => setD(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                </div>

                            </div>
                            <button type="submit" className="btn btn-success" onClick={sendDocument}>Actualizar</button>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={Cerrar}>Cerrar</Button>
                    </ModalFooter>
                </Modal>
            </div>
        </>
    );
};

