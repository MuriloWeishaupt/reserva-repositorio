import PropTypes from 'prop-types';
import './Header.css';

const Header = ({ nome }) => {
    return (
        <header className='header'>
            {nome && <p><span>Usuário logado:</span> {}</p>}
        </header>
    )
}

Header.propTypes = {
    nome: PropTypes.string
}

export default Header