import { useState } from 'react';
import './Reserva.css';
import Header from './Header';
import { useAuth } from '../AuthContext';

const CadastroReserva = () => {
  const [professor, setProfessor] = useState('');
  const [data, setData] = useState('');
  const [horarioEntrada, setHorarioEntrada] = useState('');
  const [horarioSaida, setHorarioSaida] = useState('');
  const [numeroPessoas, setNumeroPessoas] = useState('');
  const [descricao, setDescricao] = useState('');
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  const verificaReserva = async () => {
    const checkReserva = await fetch(`http://localhost:3001/api/reservas?data=${data}&horarioEntrada=${horarioEntrada}&horarioSaida=${horarioSaida}`);

    if (!checkReserva.ok) {
      setError('Erro ao verificar reservas')
      return
    }

    return checkReserva.json()

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    setLoading(true)

    try {
      const reservaExiste = await verificaReserva();
      
      if (reservaExiste.length > 0) {
        setError('Horário de reserva indisponível')
        setLoading(false)
        return
      }

      const novaReserva = {
        id: Date.now(),
        professor,
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
    <>
    <Header nome={user?.nome}/>
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
          mask="99/99/9999"
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
