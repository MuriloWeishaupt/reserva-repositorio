import { useState } from 'react';
import './Registra.css';
import Header from './Header';
import { useAuth } from '../AuthContext';
import LogoEtec from './LogoEtec';

const Cadastro = () => {
  const [nome, setNome] = useState(''); //Faz a declaração dos estados do UseState
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const error = useState('');
  const { user } = useAuth()

  const handleSubmit = (e) => { {/*Código para quando o botão de submit for apertado, a página não recarregar*/}
    e.preventDefault();

    console.log('Cadastro realizado:', { nome, email, senha });

    //  Limpa os campos (Já analisei os fatos)
    setNome('');
    setEmail('');
    setSenha('');
  };

  return (
    <>
    <LogoEtec/>
    <Header nome={user?.nome}/>
    <div className="cadastro-container">
      <h1>Cadastro de Usuário</h1>
      {error && <p className="error-message">{error}</p>}  {/*Exibe alguma mensagem de erro, se tiver nessa budega*/}
      <form onSubmit={handleSubmit} className="cadastro-form">
        <div className="form-group">
          <label htmlFor="nome">Nome:</label> {/*Esse htnlFor vincula uma Label a um input*/}
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)} /*Muda o estado do nome de acordo com o que foi escrito no input*/
            required /* campo obrigatório */
          />
        </div>
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
        <button type="submit" className="btn-cadastrar">Cadastrar</button>
      </form>
      <p>
        Já tem uma conta? <a href="/login">Faça login</a>
      </p>
    </div>
    </>
  );
};

export default Cadastro;
