import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { LayoutDashboard, Car, Users, FileText, Menu, LogOut, X } from 'lucide-react';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const AdminLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const location = useLocation();
    const { logout } = useContext(AuthContext);

    const menuItems = [
        { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { path: '/admin/bookings', icon: <Car size={20} />, label: 'Manage Bookings' },
        { path: '/admin/users', icon: <Users size={20} />, label: 'User Management' }, // Placeholder
        { path: '/admin/reports', icon: <FileText size={20} />, label: 'Reports' }, // Placeholder
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 transform transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:block`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-8 border-b border-gray-50">
                        <div className="flex items-center space-x-2 text-2xl font-bold text-gray-900">
                            <div className="bg-primary-600 text-white p-2 rounded-xl">
                                <Car size={24} />
                            </div>
                            <span className="tracking-tight">Rent<span className="text-primary-600">Wheels</span></span>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-6 space-y-2">
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-medium
                                ${location.pathname === item.path
                                        ? 'bg-primary-50 text-primary-600 shadow-sm'
                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* Logout */}
                    <div className="p-6 border-t border-gray-50">
                        <button
                            onClick={logout}
                            className="flex items-center space-x-3 px-4 py-3 w-full text-left text-red-500 hover:bg-red-50 rounded-xl transition-colors font-medium"
                        >
                            <LogOut size={20} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto h-screen">
                {/* Mobile Header */}
                <header className="lg:hidden bg-white border-b border-gray-100 p-4 flex items-center justify-between sticky top-0 z-40">
                    <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-gray-600">
                        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                    <span className="font-bold text-gray-900">Admin Panel</span>
                </header>

                <div className="p-6 lg:p-10 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default AdminLayout;
