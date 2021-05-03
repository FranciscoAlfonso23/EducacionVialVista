import API from "../utils/api";
import axios from 'axios'

class ImagenesDataService {
  sendImages(name, descripcion, file) {
    const form = new FormData()
    form.append('name', name)
    form.append('descripcion', descripcion)
    form.append('file', file, 'form-data')

    return axios.post(`${API.URI}/upload`, form)
  }

  deleteImages(id) {
    return axios.get(`${API.URI}/delete/${id}`)
  }

  mostrarImagenes() {
    return axios.get(`${API.URI}/download`)
  }


  sendDocument(name, descripcion, file) {
    const form = new FormData()
    form.append('name', name)
    form.append('descripcion', descripcion)
    form.append('file', file, 'form-data')
    return axios.post(`${API.URI}/UpDocument`, form)
  }

  sendContacto(Desarrollador, Email, Telefono,Direccion) {
    const form = new FormData()
    form.append('Desarrollador', Desarrollador)
    form.append('Email', Email)
    form.append('Telefono', Telefono)
    form.append('Direccion', Direccion)
    return axios.post(`${API.URI}/InserContacto`, form)
  }

  login(usuario,contra) {
    console.log(usuario)
    console.log(contra)
    const form = new FormData()
    form.append('usuario', usuario)
    form.append('contra', contra)
    return axios.post(`${API.URI}/login`, form)
  }


  mostrarContacto() {
    return axios.get(`${API.URI}/Readcontacto`)
  }

  mostrarDocumentos() {
    return axios.get(`${API.URI}/downloadDocument`)
  }



  deleteDocument(id) {
    return axios.get(`${API.URI}/delDocument/${id}`)
  }

  deleteContacto(id) {
    return axios.get(`${API.URI}/delContacto/${id}`)
  }





  loginUser(email,password) {
    const form = new FormData()
    form.append('email', email)
    form.append('password', password)
    return axios.post(`${API.URI}/login`,form)
  }


  sendAcerca(institucion,descripcion,mision, vision) {
    const form = new FormData()
    form.append('institucion', institucion)
    form.append('descripcion', descripcion)
    form.append('mision', mision)
    form.append('vision', vision)
    return axios.post(`${API.URI}/InserAcerca`, form)
  }

  deleteAcerca(id) {
    return axios.get(`${API.URI}/delAcerca/${id}`)
  }

  mostrarAcerca() {
    return axios.get(`${API.URI}/Readacerca`)
  }

}
export default new ImagenesDataService();