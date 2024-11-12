import './styles.css'
import { Outlet } from "react-router-dom";


const Layout = () => {
    return (
        <>
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default Layout;