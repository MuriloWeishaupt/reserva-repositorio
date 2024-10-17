import { useEffect, useState } from 'react';
import { format, parseISO} from 'date-fns'
import './ListaReserva.css'; 
import Header from './Header'
import PropTypes from 'prop-types';
import { useAuth } from '../AuthContext';

const ListaReservas = () => {
  const [reservas, setReservas] = useState([]);
  const { user } = useAuth()

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/reservas')
        const data= await response.json()
        setReservas(data)
      } catch (error) {
        console.log('Erro ao buscar reservas: ', error)
      }
    }

    fetchReservas()
  }, [])

  return (
    <div className="lista-reservas">
      <Header nome={user?.nome}/>
      <h2>Lista de Reservas</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome do Professor</th>
            <th>Data</th>
            <th>Horário</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map(reserva => (
            <tr key={reserva.id || reserva_id}>
              <td>{reserva.id}</td>
              <td>{reserva.professor}</td>
              <td>{format(parseISO(reserva.data), 'dd/MM/yyyy')}</td>
              <td><p>Das {reserva.horarioEntrada}h às {reserva.horarioSaida}h</p></td>
              <td>{reserva.descricao}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="buttonReservar">
        <button><a href="/reservar">Faça a sua reserva</a></button>
      </div>
    </div>
  );

};

ListaReservas.propTypes = {
  nome: PropTypes.string,  
}

export default ListaReservas;
