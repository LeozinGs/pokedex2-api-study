import Navbar from '../Components/Navbar/Navbar';
import './styles.css'
import { Outlet } from "react-router-dom";


const Layout = () => {
    return (
        <>
            <main className='main'>
                <Outlet />
                <Navbar />
            </main>
        </>
    );
}

export default Layout;