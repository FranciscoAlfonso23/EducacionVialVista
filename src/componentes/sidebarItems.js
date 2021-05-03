import React from 'react'
import * as IoIcons from 'react-icons/io';
import * as KoIcons from 'react-icons/bs';
import * as GR from 'react-icons/ai';


export const SidebarData=[
    {
        title:'Configuracion',
        path:'/Plataforma',
        icon:<IoIcons.IoIosBook/>,
        cName:'side-text',
        id:'con'
    },
    {
        title:'Imagenes',
        path:'/Upload',
        icon:<KoIcons.BsCardImage/>,
        cName:'side-text',
        id:'prin'
    },    
    {
        title:'Archivos',
        path:'/Uprecursos',
        icon:<GR.AiFillFilePdf/>,
        cName:'side-text',
        id:'prin'
    },    
    {
        title:'Contacto',
        path:'/Upcontacto',
        icon:<GR.AiFillFilePdf/>,
        cName:'side-text',
        id:'prin'
    },    
    {
        title:'Acerca',
        path:'/Upacerca',
        icon:<GR.AiFillFilePdf/>,
        cName:'side-text',
        id:'prin'
    }
];