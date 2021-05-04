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


export default function Upacerca() {
    const[descripcion,setDescripcion]=useState("")
    const [institucion, setinstitucion] = useState("")
    const [mision, setmision] = useState("")
    const [vision, setvision] = useState("")
    const [Data, setData] = useState("")
    const [Estado, setEstado] = useState(false);

    const guardar = (e) => {
        console.log("aqui")
        e.preventDefault()
        UploadService.sendAcerca(institucion,descripcion, mision, vision).then((result) => {
            console.log("el resultado es: ", result)
            UploadService.mostrarAcerca().then((result) => {
                setData(result.data)
                handleClick()
            })

        })
    }

    const handleClick = () => {
        setEstado(!Estado);
    }

    const refrescar=() => {
        UploadService.mostrarAcerca().then((result) => {
            setData(result.data)
        })
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
                    UploadService.deleteAcerca(id).then((result) => {

                    })
                    swal("Eliminado!", {
                        icon: "success",
                    });
                    refrescar()
                }
            });
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
                            <h1>Informacion Acerca</h1>
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
                                <CardTitle tag="h4">Datos de apartado Acerca</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Table responsive>
                                    <thead className="text-primary">
                                        <tr responsive>
                                            <th >Institucion</th>
                                            <th >Descripcion</th>
                                            <th >Misión</th>
                                            <th >Visión</th>
                                            <th >Accion</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.values(Data).map((item, index) => {
                                            return (
                                                <tr>                                                    
                                                    <th>{item.institucion}</th>
                                                    <th>{item.descripcion}</th>
                                                    <th>{item.mision}</th>
                                                    <th>{item.vision}</th>
                                                    <th>
                                                        <div className='botones'>
                                                            <button type="button" class="btn btn-success" >Editar</button>
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
                                <input
                        type="text"
                        placeholder="Nombre Institución"
                        className="name-picture mt-2"
                        onChange={(e) => setinstitucion(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Descripcion Institución"
                        className="name-picture mt-2"
                        onChange={(e) => setDescripcion(e.target.value)}
                    />

                    
                                </div>
                                <div className='col-sm'>
                                <div className='contenedor'>
                                <input
                        type="text"
                        placeholder="Misión Institución"
                        className="name-picture mt-2"
                        onChange={(e) => setmision(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Visión Institución"
                        className="name-picture mt-2"
                        onChange={(e) => setvision(e.target.value)}
                    />

                    </div>
                                </div>

                            </div>
                                       
                        </div>
                        <button type="submit" className="btn btn-success" onClick={guardar}>Guardar</button>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={handleClick}>Cerrar</Button>
                    </ModalFooter>
                </Modal>
            </div>
        </>
    );
};


