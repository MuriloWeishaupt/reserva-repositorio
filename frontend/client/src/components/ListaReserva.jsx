import React from 'react';
import './ListaReserva.css'; 

const reservas = [
  { id: 1, professor: 'Marcos Nogueira', data: '2024-09-25', horario: '13:00 - 15:05', status: 'Confirmada' },
  { id: 2, professor: 'Fabiano', data: '2024-09-26', horario: '15:20 - 17:25', status: 'Pendente' },
  { id: 3, professor: 'Emerson', data: '2024-09-27', horario: '13:00 - 14:00', status: 'Cancelada' },
];

const ListaReservas = () => {
  return (
    <div className="lista-reservas">
      <h2>Lista de Reservas</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome do Professor</th>
            <th>Data</th>
            <th>Horário</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map(reserva => (
            <tr key={reserva.id}>
              <td>{reserva.id}</td>
              <td>{reserva.professor}</td>
              <td>{reserva.data}</td>
              <td>{reserva.horario}</td>
              <td className={reserva.status.toLowerCase()}>{reserva.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaReservas;
