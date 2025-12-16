import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { Search, Filter, Calendar } from 'lucide-react';
import BookingDetailsModal from '../components/BookingDetailsModal';

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [selectedBooking, setSelectedBooking] = useState(null);

    const fetchBookings = async () => {
        try {
            const res = await axios.get('http://localhost:5001/api/bookings/admin', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setBookings(res.data);
            setFilteredBookings(res.data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    useEffect(() => {
        let result = bookings;

        // Filter by Status
        if (statusFilter !== 'All') {
            result = result.filter(b => b.status === statusFilter);
        }

        // Search
        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            result = result.filter(b =>
                b.user?.name.toLowerCase().includes(lowerTerm) ||
                b.user?.email.toLowerCase().includes(lowerTerm) ||
                b._id.toLowerCase().includes(lowerTerm) ||
                b.car?.name.toLowerCase().includes(lowerTerm)
            );
        }

        setFilteredBookings(result);
    }, [searchTerm, statusFilter, bookings]);

    const handleUpdateStatus = async (id, status) => {
        try {
            await axios.put(`http://localhost:5001/api/bookings/${id}/status`, { status }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            // Refresh local data
            const updatedBookings = bookings.map(b =>
                b._id === id ? { ...b, status } : b
            );
            setBookings(updatedBookings);
            setSelectedBooking(null); // Close modal

            // Optional: Show success toast/message
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
        }
    };

    if (loading) return (
        <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
    );

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">Manage Bookings</h1>
                    <p className="text-gray-500">View and manage all customer bookings.</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by User, Car, or ID..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto">
                    {['All', 'Pending', 'Confirmed', 'Rejected', 'Cancelled'].map(status => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap
                                ${statusFilter === status
                                    ? 'bg-primary-600 text-white shadow-md shadow-primary-200'
                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-3xl shadow-card border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-4 px-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Booking ID</th>
                                <th className="py-4 px-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                                <th className="py-4 px-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Vehicle</th>
                                <th className="py-4 px-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Dates</th>
                                <th className="py-4 px-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="py-4 px-6 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredBookings.map(booking => (
                                <tr key={booking._id} className="hover:bg-gray-50 transition-colors group cursor-pointer" onClick={() => setSelectedBooking(booking)}>
                                    <td className="py-4 px-6 font-mono text-xs text-gray-500">
                                        #{booking._id.slice(-6).toUpperCase()}
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="font-bold text-gray-900">{booking.user?.name || 'Unknown'}</div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="font-medium text-gray-900">{booking.car?.name}</span>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} className="text-gray-400" />
                                            {format(new Date(booking.startDate), 'MMM dd')} - {format(new Date(booking.endDate), 'MMM dd')}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold
                                            ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                                                booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                                    booking.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                                        'bg-gray-100 text-gray-700'}`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setSelectedBooking(booking); }}
                                            className="text-primary-600 hover:text-primary-800 font-bold text-xs bg-primary-50 px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredBookings.length === 0 && (
                        <div className="p-12 text-center flex flex-col items-center">
                            <div className="bg-gray-100 p-4 rounded-full mb-4">
                                <Filter size={24} className="text-gray-400" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">No bookings found</h3>
                            <p className="text-gray-500">Try adjusting your filters or search terms.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {selectedBooking && (
                <BookingDetailsModal
                    booking={selectedBooking}
                    onClose={() => setSelectedBooking(null)}
                    onUpdateStatus={handleUpdateStatus}
                />
            )}
        </div>
    );
};

export default AdminBookings;
