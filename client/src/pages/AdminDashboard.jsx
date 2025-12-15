import { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart3, Users, Car, Calendar } from 'lucide-react';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ totalBookings: 0, totalUsers: 0, totalCars: 0, totalRevenue: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const statsRes = await axios.get('http://localhost:5000/api/bookings/stats/admin', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setStats(statsRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return (
        <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
    );

    const StatCard = ({ icon, title, value, color }) => (
        <div className="bg-white p-6 rounded-3xl shadow-soft border border-gray-100 flex items-center space-x-4">
            <div className={`p-4 rounded-2xl ${color} bg-opacity-10 text-${color.split('-')[1]}-600`}>
                {icon}
            </div>
            <div>
                <p className="text-gray-500 text-sm font-medium">{title}</p>
                <h4 className="text-2xl font-bold text-gray-900">{value}</h4>
            </div>
        </div>
    );

    return (
        <div>
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">Admin Control</h1>
                    <p className="text-gray-500">Overview of system performance.</p>
                </div>
                <button className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors">
                    Download Reports
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard icon={<Calendar size={24} className="text-blue-600" />} title="Total Bookings" value={stats.totalBookings} color="bg-blue-600" />
                <StatCard icon={<Users size={24} className="text-purple-600" />} title="Active Users" value={stats.totalUsers} color="bg-purple-600" />
                <StatCard icon={<Car size={24} className="text-orange-600" />} title="Fleet Size" value={`${stats.totalCars} Cars`} color="bg-orange-600" />
                <StatCard icon={<BarChart3 size={24} className="text-green-600" />} title="Revenue" value={`$${stats.totalRevenue.toLocaleString()}`} color="bg-green-600" />
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>

                <h2 className="text-3xl font-bold mb-4 relative z-10">Welcome Back, Admin!</h2>
                <p className="text-gray-300 max-w-xl mb-8 relative z-10">
                    You have <span className="text-white font-bold">{stats.totalBookings}</span> total bookings and have generated <span className="text-white font-bold">${stats.totalRevenue.toLocaleString()}</span> in revenue.
                    Head over to the bookings manager to handle pending requests.
                </p>

                <a href="/admin/bookings" className="inline-flex items-center px-6 py-3 bg-white text-gray-900 rounded-xl font-bold hover:bg-gray-100 transition-colors relative z-10 shadow-lg">
                    Manage Bookings
                </a>
            </div>
        </div>
    );
};

export default AdminDashboard;
