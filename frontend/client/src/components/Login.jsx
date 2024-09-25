import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [ra, setRa] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha, ra})
      });

      if (!response.ok) {
        throw new Error('Credenciais inválidas');
      }

      navigate('/reservar')
      const data = await response.json();

      localStorage.setItem('token', data.token);
      console.log('Usuário logado:', data); 
    } catch (err) {
      setError(err.message)
   }

   const fazReserva = async (dadosReserva) => {
    const token = localStorage.getItem('token')

    const response = await fetch('/reserva', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(dadosReserva)
    }) 

    const data = await response.json()

    if (response.ok) {
      console.log(data.message)
    } else {
      console.error(data.message)
    }
   }

};



  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="ra">RA do professor:</label>
          <input
            type="text"
            id="ra"
            value={ra}
            onChange={(e) => setRa(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-login">Entrar</button>
      </form>
      <p>
        Não tem uma conta? <a href="/registrar">Cadastre-se</a>
      </p>
    </div>
  );
};

export default Login;
