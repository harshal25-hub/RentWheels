import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { Car, User, LogOut, Menu, X } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 transition-all duration-300 glass">
            <div className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-gray-900 group">
                        <div className="bg-primary-500 text-white p-2 rounded-xl group-hover:scale-110 transition-transform">
                            <Car size={24} />
                        </div>
                        <span className="tracking-tight">Rent<span className="text-primary-600">Wheels</span></span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/cars" className="font-medium text-gray-600 hover:text-primary-600 transition-colors">Our Fleet</Link>

                        {user ? (
                            <div className="flex items-center space-x-6">
                                <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="flex items-center space-x-2 font-medium text-gray-600 hover:text-primary-600 transition-colors">
                                    <User size={20} />
                                    <span>{user.name}</span>
                                </Link>
                                <button onClick={logout} className="flex items-center space-x-2 text-red-500 hover:text-red-700 font-medium transition-colors">
                                    <LogOut size={20} />
                                    <span>Logout</span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="font-medium text-gray-600 hover:text-primary-600 transition-colors">Login</Link>
                                <Link to="/register" className="bg-primary-600 text-white px-5 py-2.5 rounded-full font-medium hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50">
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-gray-600" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden mt-4 pb-4 space-y-4 border-t pt-4">
                        <Link to="/cars" className="block text-gray-600 hover:text-primary-600" onClick={() => setIsOpen(false)}>Our Fleet</Link>
                        {user ? (
                            <>
                                <Link to="/dashboard" className="block text-gray-600 hover:text-primary-600" onClick={() => setIsOpen(false)}>Dashboard</Link>
                                <button onClick={() => { logout(); setIsOpen(false); }} className="block text-red-500">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="block text-gray-600 hover:text-primary-600" onClick={() => setIsOpen(false)}>Login</Link>
                                <Link to="/register" className="block text-primary-600 font-semibold" onClick={() => setIsOpen(false)}>Register</Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
