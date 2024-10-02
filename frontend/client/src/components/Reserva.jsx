import { useState } from 'react';
import './Reserva.css';
import Header from './Header';
import { useAuth } from '../AuthContext';
import reservas from './ListaReserva'

const CadastroReserva = () => {
  const [data, setData] = useState('');
  const [horarioEntrada, setHorarioEntrada] = useState('');
  const [horarioSaida, setHorarioSaida] = useState('');
  const [numeroPessoas, setNumeroPessoas] = useState('');
  const [descricao, setDescricao] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const verificaReserva = async () => {
    const response = await fetch(`http://localhost:3001/api/reservas?data=${data}`);
    
    if (!response.ok) {
      setError('Erro ao verificar reservas');
      return false; // Retorna false se a verificação falhar
    }

    const reservas = await response.json();

    // Verifica conflito de horários
    return reservas.some(reserva => 
      (reserva.data === data && (horarioEntrada < reserva.horarioSaida && horarioSaida > reserva.horarioEntrada))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    

    try { 
      const reservaJaExiste = await verificaReserva();

      if (reservaJaExiste) {
        setError('Horário de reserva indisponível');
        console.log('Reservas existentes:', reservas);
        console.log('Nova reserva:', novaReserva);

        setLoading(false);
        return;
      }

      const novaReserva = {
        id: Date.now(),
        professor: user?.nome,
        data,
        horarioEntrada,
        horarioSaida,
        numeroPessoas,
        descricao,
      };

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

      // Limpa os campos do formulário após o cadastro
      setData('');
      setHorarioEntrada('');
      setHorarioSaida('');
      setNumeroPessoas('');
      setDescricao('');

    } catch (error) {
      console.log('Erro:', error);
      setError('Erro ao cadastrar reserva. Tente novamente.');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <>
      <Header nome={user?.nome} />
      <div className="cadastro-reserva">
        <h2>Cadastro de Reserva do Auditório</h2>
        <form onSubmit={handleSubmit}>
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

          {error && <div style={{ color: 'red' }}>{error}</div>}
          <button type="submit" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar Reserva'}
          </button>
          <a href="/quadro-reservas"><button type='button' className='checkList'>Verificar reservas</button></a>
        </form>
      </div>
    </>
  );
};

export default CadastroReserva;
