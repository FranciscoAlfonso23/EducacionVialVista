import React from 'react'
import { Button } from './Button'
import {Link} from 'react-router-dom'
import '../Css/Footer.css'


function Footer() {
  return (
      <div className='footer-container'>
          <section className='footer-subscription'>
             
           
          </section>
        
          <section className='social-media'>
      <div className='social-media-wrap'>

        <small className='website-rights'>Universidad Tecnologica de la huasteca Hidalguense © 2021</small>
        <div className='social-icons'>
          <Link
            className='social-icon-link facebook'
            to='/'
            target='_blank'
            aria-label='Facebook'
          >
            <i className='fab fa-facebook-f' />
          </Link>
          <Link
            className='social-icon-link instagram'
            to='/'
            target='_blank'
            aria-label='Instagram'
          >
            <i className='fab fa-instagram' />
          </Link>
          <Link
            className='social-icon-link youtube'
            to='/'
            target='_blank'
            aria-label='Youtube'
          >
            <i className='fab fa-youtube' />
          </Link>
          <Link
            className='social-icon-link twitter'
            to='/'
            target='_blank'
            aria-label='Twitter'
          >
            <i className='fab fa-twitter' />
          </Link>
          <Link
            className='social-icon-link twitter'
            to='/'
            target='_blank'
            aria-label='LinkedIn'
          >
            <i className='fab fa-linkedin' />
          </Link>
        </div>
      </div>
    </section> 
          
      </div>
  );
}


export default Footer;

