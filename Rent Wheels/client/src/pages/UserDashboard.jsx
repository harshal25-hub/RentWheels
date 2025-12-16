import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { Calendar, MapPin, Clock } from 'lucide-react';

const UserDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axios.get('http://localhost:5001/api/bookings/user');
                setBookings(res.data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    if (loading) return (
        <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
    );

    return (
        <div>
            <h1 className="text-3xl font-bold mb-2 text-gray-900">My Basecamp</h1>
            <p className="text-gray-500 mb-10">Manage your upcoming journeys and rental history.</p>

            {bookings.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-soft">
                    <div className="bg-gray-50 inline-flex p-4 rounded-full mb-4 text-gray-400">
                        <Calendar size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No bookings yet</h3>
                    <p className="text-gray-500 mb-6">You haven't made any reservations.</p>
                    <a href="/cars" className="bg-primary-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-700 transition-colors">
                        Start Your Journey
                    </a>
                </div>
            ) : (
                <div className="space-y-6">
                    {bookings.map(booking => (
                        <div key={booking._id} className="bg-white rounded-3xl p-6 shadow-soft border border-gray-100 flex flex-col md:flex-row gap-6 hover:shadow-card transition-shadow">
                            <div className="md:w-1/4">
                                <img src={booking.car.image} alt={booking.car.name} className="w-full h-32 object-cover rounded-2xl" />
                            </div>
                            <div className="flex-grow">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{booking.car.name}</h3>
                                        <p className="text-gray-500">{booking.car.brand}</p>
                                    </div>
                                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide
                    ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                                            booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-red-100 text-red-700'}`}>
                                        {booking.status}
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-6">
                                    <div className="flex items-center space-x-2">
                                        <Calendar size={18} className="text-primary-500" />
                                        <span>{format(new Date(booking.startDate), 'MMM dd')} - {format(new Date(booking.endDate), 'MMM dd, yyyy')}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Clock size={18} className="text-primary-500" />
                                        <span>{differenceInDays(new Date(booking.endDate), new Date(booking.startDate))} Days</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <MapPin size={18} className="text-primary-500" />
                                        <span>Main Hub Pickup</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center border-t border-gray-50 pt-4">
                                    <div>
                                        <span className="text-gray-400 text-xs uppercase font-bold tracking-wider">Total Booking Value</span>
                                        <p className="text-xl font-bold text-gray-900">${booking.totalPrice}</p>
                                    </div>
                                    <button className="text-primary-600 font-bold hover:text-primary-700 text-sm">View Ticket</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
import { differenceInDays } from 'date-fns';

export default UserDashboard;
