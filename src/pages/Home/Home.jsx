import { NavLink } from 'react-router-dom';
import './Home.css';
import HeaderDashboard from '../../components/Dashboard/HeaderDashboard/HeaderDashboard';

const HomePage = () => {
    return (
        <main className='main-container'>
            <div className='user-wrapper'>
                <HeaderDashboard/>
                <h1 className='user-heading'>Choose your user</h1>
                <NavLink to='/user/12' className='user-item'>Karl</NavLink>
                <NavLink to='/user/18' className='user-item'>Cecilia</NavLink>
            </div>
        </main>
    );
}

export default HomePage;
