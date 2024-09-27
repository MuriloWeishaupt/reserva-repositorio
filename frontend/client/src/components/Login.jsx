import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => { // Declara os estados dos dados dos inputs (Iniciando com string vazia) e de erro
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [ra, setRa] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => { 
    e.preventDefault(); // Evita que a página seja recarregada após apertar o botão submit
    setError(''); // Serve para não aparecerem diversas mensagens de erro na tela caso o usuário erre o login mais de uma vez

    try { // Serve para executar um código que pode gerar erros. Se for gerado, executa o bloco catch
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }, // Fetch faz uma requisição HTTP para o endereço solicitado. POST envia os dados para o servidor
        body: JSON.stringify({ email, senha, ra }) // Converte os dados em JSON
      });

      if (!response.ok) {
        throw new Error('Credenciais inválidas'); // Lança um erro que o bloco catch irá capturar
      }

      const data = await response.json(); // Transformar JSON para objeto JS
      localStorage.setItem('token', data.token); // Armazenar o token
      console.log('Usuário logado:', data); 

      navigate('/quadro-reservas'); // Se login bem-sucedido, direciona para a rota /reservar
    } catch (err) {
      setError(err.message); // Mostrar mensagem de erro
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

      {error && <div style={{ color: 'red', marginTop: '10px'}}>{error}</div>} 
      {/* Se tem erro, ativa essa linha acima */}
      <p>
        Não tem uma conta? <a href="/registrar">Cadastre-se</a>
      </p>
    </div>
  );
};

export default Login;
