import React  from 'react';
import './App.css';
import Navbar from './componentes/Navbar';
import Sidebar from './componentes/sidebar';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Home from './paginas/Home';
import Galeria from './paginas/Galeria';
import Recursos from './paginas/Recursos';
import Contacto from './paginas/Contacto';
import Acerca from './paginas/Acerca';
import Login from './paginas/Login';
import Upload from './paginas/Upload';
import Principal from './paginas/Principal';
import Uprecursos from './paginas/Uprecursos';
import Upcontacto from './paginas/UpContacto';
import Upacerca from './paginas/Upacerca';
function App() {
  return (    
    <>
    <Router>
    <Sidebar />
     <Navbar/>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/Galeria' component={Galeria}/>
        <Route path='/Recursos' component={Recursos}/>
        <Route path='/Contacto' component={Contacto}/>
        <Route path='/Acerca' component={Acerca}/>
        <Route path='/Login' component={Login}/>
        <Route path='/Upload' component={Upload}/>
        <Route path='/Principal' component={Principal}/>
        <Route path='/Uprecursos' component={Uprecursos}/>
        <Route path='/Upcontacto' component={Upcontacto}/>
        <Route path='/Upacerca' component={Upacerca}/>
      </Switch>
    </Router>
    </>
  );
}
export default App;
