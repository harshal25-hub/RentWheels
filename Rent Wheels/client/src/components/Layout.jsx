import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
            <Navbar />
            <main className="flex-grow pt-24 px-4 sm:px-6 lg:px-8 pb-12 container mx-auto">
                <Outlet />
            </main>
            <footer className="bg-white border-t border-gray-100 py-12">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-gray-500">&copy; 2025 RentWheels. Redefining your journey.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
