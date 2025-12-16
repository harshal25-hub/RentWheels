import { X, Calendar, MapPin, User, Car, Shield } from 'lucide-react';
import { format } from 'date-fns';

const BookingDetailsModal = ({ booking, onClose, onUpdateStatus }) => {
    if (!booking) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="bg-gray-50 px-8 py-6 border-b border-gray-100 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
                        <p className="text-gray-500 text-sm">ID: {booking._id}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                    >
                        <X size={24} className="text-gray-500" />
                    </button>
                </div>

                <div className="p-8 space-y-8">
                    {/* Status Badge */}
                    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
                        <span className="text-gray-600 font-medium">Current Status</span>
                        <span className={`px-4 py-2 rounded-full text-sm font-bold
                            ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                                booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                    booking.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                        'bg-gray-100 text-gray-700'}`}>
                            {booking.status}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* User Info */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <User className="text-primary-600" size={20} />
                                Customer Info
                            </h3>
                            <div className="bg-white border border-gray-100 rounded-2xl p-4 space-y-2 shadow-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500 text-sm">Name</span>
                                    <span className="font-medium">{booking.user?.name || 'Unknown'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500 text-sm">Email</span>
                                    <span className="font-medium">{booking.user?.email}</span>
                                </div>
                            </div>
                        </div>

                        {/* Car Info */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <Car className="text-primary-600" size={20} />
                                Vehicle Details
                            </h3>
                            <div className="bg-white border border-gray-100 rounded-2xl p-4 space-y-2 shadow-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500 text-sm">Car</span>
                                    <span className="font-medium">{booking.car?.name || 'Unknown Car'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500 text-sm">Brand</span>
                                    <span className="font-medium">{booking.car?.brand}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Booking Specifics */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <Calendar className="text-primary-600" size={20} />
                            Trip Schedule
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded-2xl">
                                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Pick-up</p>
                                <p className="font-medium text-gray-900">{format(new Date(booking.startDate), 'PPP')}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-2xl">
                                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Drop-off</p>
                                <p className="font-medium text-gray-900">{format(new Date(booking.endDate), 'PPP')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Total & Actions */}
                    <div className="border-t border-gray-100 pt-8 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Total Amount</p>
                            <p className="text-3xl font-bold text-gray-900">${booking.totalPrice}</p>
                        </div>

                        {booking.status === 'Pending' && (
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => onUpdateStatus(booking._id, 'Rejected')}
                                    className="px-6 py-3 rounded-xl border-2 border-red-100 text-red-600 font-bold hover:bg-red-50 transition-colors"
                                >
                                    Reject
                                </button>
                                <button
                                    onClick={() => onUpdateStatus(booking._id, 'Confirmed')}
                                    className="px-6 py-3 rounded-xl bg-primary-600 text-white font-bold hover:bg-primary-700 shadow-lg shadow-primary-200 transition-all hover:scale-105"
                                >
                                    Accept Booking
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingDetailsModal;
