
import { Outlet } from 'react-router';
import Navbar from '../shared/Navbar';
import Footer from '../../../pro-course-practice/src/pages/shared/Footer/Footer';

const RootLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            {/* <Footer /> */}
        </div>
    );
};

export default RootLayout;