import { useState } from 'react';
import './Reserva.css';

const CadastroReserva = () => {
  const [professor, setProfessor] = useState('');
  const [data, setData] = useState('');
  const [horarioEntrada, setHorarioEntrada] = useState('');
  const [horarioSaida, setHorarioSaida] = useState('');
  const [numeroPessoas, setNumeroPessoas] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novaReserva = {
      id: Date.now(),
      professor,
      data,
      horarioEntrada,
      horarioSaida,
      numeroPessoas,
      descricao,
    };

    try {
      const response = await fetch('http://localhost:3001/api/reservas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaReserva),
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar reserva');
      }

      const result = await response.json();
      console.log('Reserva cadastrada com sucesso:', result);

      setProfessor('');
      setData('');
      setHorarioEntrada('');
      setHorarioSaida('');
      setNumeroPessoas('');
      setDescricao('');

    } catch (error) {
      console.log('Erro:', error);
    }
  };

  return (
    <div className="cadastro-reserva">
      <h2>Cadastro de Reserva do Auditório</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="professor">Nome do Professor solicitante:</label>
          <input
            type="text"
            id="professor"
            value={professor}
            onChange={(e) => setProfessor(e.target.value)}
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
          <label htmlFor="horarioEntrada">Horário de entrada:</label>
          <input
            type="time"
            id="horarioEntrada"
            value={horarioEntrada}
            onChange={(e) => setHorarioEntrada(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="horarioSaida">Horário de saída:</label>
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
          <textarea
            className='descricao-fixa'
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            rows="4"
          />
        </div>

        <button type="submit">Cadastrar Reserva</button>
        <a href="/quadro-reservas"><button type='button' className='checkList'>Verificar reservas</button></a>
      </form>
    </div>
  );
};

export default CadastroReserva;
