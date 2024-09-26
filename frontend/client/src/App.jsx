import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Registra from './components/Registra';
import Reserva from './components/Reserva';
import ListaReserva from './components/ListaReserva';
import PropTypes from 'prop-types' 
import { useEffect, useState } from 'react';

const PrivateRoute = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem('token');

  return isAuthenticated ? element : <Navigate to="/login" />;
}//Lógica para verificar se usuário está autenticado.  

PrivateRoute.propTypes = { 
  element: PropTypes.element.isRequired,
} //Aqui diz que o componente PrivateRoute deve receber obigatóriamente a propriedade 'Elemente'. Isso foi feito para cessar os erros de "Element is missing in props validation" do ESlint.


function App() {

  const [isActive, setIsActive] = useState(true)
  
  useEffect(() => {
  let timeout;

  const resetaLogin = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      localStorage.removeItem('token');
      setIsActive(false)
    }, 10 * 1000);

    window.addEventListener('mousemove', resetaLogin);
    window.addEventListener('keydown', resetaLogin);
  } 

  resetaLogin();

  return () => {
    clearTimeout(timeout);
    window.removeEventListener('mousemove', resetaLogin)
    window.removeEventListener('keydown', resetaLogin)

  };
}, []);

  if (!isActive) {
    return <Navigate to='/login'/>
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registrar" element={<Registra />} />
        <Route path="/reservar" element={<PrivateRoute element={<Reserva />} />} />
        <Route path="/quadro-reservas" element={<PrivateRoute element={<ListaReserva />} />} />
      </Routes>
    </Router>
  );
} //Toda a lógica das rotas da aplicação. Para acessar os endpoints "reservar" e "quadro-reservas", o usuário precisa estar autenticado.

export default App;

