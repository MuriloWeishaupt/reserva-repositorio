import React from 'react';
import './ListaReserva.css'; 

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
      <div className="buttonReservar">
        <button><a href="/reservar">Faça a sua reserva</a></button>
      </div>
    </div>
  );
};

export default ListaReservas;
