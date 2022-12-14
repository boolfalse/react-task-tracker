
import PropTypes from 'prop-types'
import Button from "./Button";
import { useLocation } from "react-router-dom";

const Header = ({title, toggleForm, showFormState, tasksCount}) => {
    const location = useLocation();
    return (
        <header className='header'>
            <h1>{title}: {tasksCount}</h1>
            {
                location.pathname === '/' && (
                    <Button onClick={toggleForm}
                            color={showFormState ? 'red' : 'green'}
                            text={showFormState ? 'Close' : 'Add'} />)
            }
        </header>
    );
};

Header.defaultProps = {
    title: 'Tasks',
    tasksCount: 0,
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
    tasksCount: PropTypes.number,
};

export default Header;
