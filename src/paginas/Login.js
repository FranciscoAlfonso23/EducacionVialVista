import React, { useState,useEffect } from 'react';
import '../Css/login.css';
import Cookies from 'universal-cookie';
import swal from 'sweetalert';
import UploadService from '../services/imagenes.service'
import { Button } from '../componentes/Button';

const cookies= new Cookies();


export default function Login() {
   
    const [usuario, setUsername] = useState("");
    const [contra, setPassword] = useState("");

    const loginUser = (e) => {
        e.preventDefault()
        UploadService.loginUser(usuario,contra).then((result) => {
              if(JSON.stringify(result.data.message)){
                  alert(JSON.stringify(result.data.message))
              }else{
                cookies.set('Nombre', JSON.stringify(result.data.dataUser.name), { path: '/' });                
                swal("Bienvenido: "+cookies.get('Nombre'));                  
                window.location.href="/Principal";   
              }
     
        })
    }
    useEffect(() => {    
        if(cookies.get('Nombre')){
            window.location.href="/Principal";
        }
     });

    return <div className='login'>
        <div className='login-container'>
            
            <div className='login-user'>
                <img src="/imagenes/login1.png" alt="l" />
            </div>

            <input type="text" placeholder="Usuario" onChange={(e) => {
                setUsername(e.target.value);
            }} />
            <input type="password" placeholder="Password" onChange={(e) => {
                setPassword(e.target.value);
            }} />
            <Button className='btns' buttonStyle='btn--outline'
                buttonSize='btn--large' onClick={loginUser}>Acceder <i className='fas fa-sign-in-alt' />
            </Button>
        </div>
    </div>;
}
