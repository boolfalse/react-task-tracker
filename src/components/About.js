
import { Link } from 'react-router-dom'

const About = () => {
    return (
        <div>
            <h2>About</h2>
            <p>This is a simple React app to show the power of React.</p>
            <Link to='/'>Home</Link>
        </div>
    );
}

export default About;
