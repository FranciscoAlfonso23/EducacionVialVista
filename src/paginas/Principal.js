import React, { useEffect} from 'react';
import Cookies from 'universal-cookie';
import '../App.css'
import '../Css/principal.css';
const cookies = new Cookies();
export default function Principal() {
    

    useEffect(() => {     
        if (!cookies.get('Nombre')) {
            window.location.href = "/Login";
        } else {
            document.getElementById("Menu").style.display = 'none';
            document.getElementById("sidebarmenu").style.display = 'flex'; 
            document.getElementById("con").style.display='none';                    
        }
    },[]);   
    return (
        <div>
            <h1 className='Principal'>Bienvenido</h1>
        </div>);
}
