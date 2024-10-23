import PropTypes from 'prop-types';
import './Header.css';

const Header = ({ nome }) => {
    return (
        <header className='header'>
            <div className="user-logged">{nome && <p><span>Usuário logado:</span> {nome}</p>}</div>
        </header>
    )
}

Header.propTypes = {
    nome: PropTypes.string
}

export default Header