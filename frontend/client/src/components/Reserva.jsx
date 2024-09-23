import React, { useState } from 'react';
import './Reserva.css'; 

const CadastroReserva = () => {
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [horarioEntrada, setHorarioEntrada] = useState('');
  const [horarioSaida, setHorarioSaida] = useState('');
  const [numeroPessoas, setNumeroPessoas] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ nome, data, horarioEntrada, horarioSaida, numeroPessoas, descricao });
    setNome('');
    setData('');
    setHorarioEntrada('');
    setHorarioSaida('')
    setNumeroPessoas('');
    setDescricao('');
  };

  return (
    <div className="cadastro-reserva">
      <h2>Cadastro de Reserva do Auditório</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome do Professor solicitante:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="data">Data:</label>
          <input
            type="date"
            id="data"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="horario">Horário de entrada:</label>
          <input
            type="time"
            id="horarioEntrada"
            value={horarioEntrada}
            onChange={(e) => setHorarioEntrada(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="horario">Horário de saída:</label>
          <input
            type="time"
            id="horarioSaida"
            value={horarioSaida}
            onChange={(e) => setHorarioSaida(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="numeroPessoas">Número de Pessoas:</label>
          <input
            type="number"
            id="numeroPessoas"
            value={numeroPessoas}
            onChange={(e) => setNumeroPessoas(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="descricao">Descrição:</label>
          <textarea className='descricao-fixa'
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            rows="4"
          />
        </div>

        <button type="submit">Cadastrar Reserva</button>
      </form>
    </div>
  );
};

export default CadastroReserva;
