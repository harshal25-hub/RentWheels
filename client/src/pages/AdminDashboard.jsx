import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { BarChart3, Users, Car, Calendar, Search } from 'lucide-react';

const AdminDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bookingsRes = await axios.get('http://localhost:5000/api/bookings/admin');
                setBookings(bookingsRes.data);
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
                <StatCard icon={<Calendar size={24} className="text-blue-600" />} title="Total Bookings" value={bookings.length} color="bg-blue-600" />
                <StatCard icon={<Users size={24} className="text-purple-600" />} title="Active Users" value="24" color="bg-purple-600" />
                <StatCard icon={<Car size={24} className="text-orange-600" />} title="Fleet Status" value="12 Cars" color="bg-orange-600" />
                <StatCard icon={<BarChart3 size={24} className="text-green-600" />} title="Revenue" value="$12,450" color="bg-green-600" />
            </div>

            <div className="bg-white rounded-3xl shadow-card border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-900">Recent Bookings</h3>
                    <div className="relative">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-4 px-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                                <th className="py-4 px-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Vehicle</th>
                                <th className="py-4 px-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Dates</th>
                                <th className="py-4 px-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Total</th>
                                <th className="py-4 px-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="py-4 px-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {bookings.map(booking => (
                                <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="font-bold text-gray-900">{booking.user?.name || 'Unknown'}</div>
                                        <div className="text-xs text-gray-500">{booking.user?.email}</div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="font-medium">{booking.car?.name}</span>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-600">
                                        {format(new Date(booking.startDate), 'MMM dd')} - {format(new Date(booking.endDate), 'MMM dd')}
                                    </td>
                                    <td className="py-4 px-6 font-bold text-gray-900">${booking.totalPrice}</td>
                                    <td className="py-4 px-6">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold
                      ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                                                booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-red-100 text-red-700'}`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <button className="text-primary-600 hover:text-primary-800 font-bold text-xs">Manage</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {bookings.length === 0 && <div className="p-8 text-center text-gray-500">No recent bookings found.</div>}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
