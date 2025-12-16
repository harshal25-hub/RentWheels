import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { differenceInDays, format } from 'date-fns';
import { Calendar, Shield, CreditCard, ArrowLeft } from 'lucide-react';

const Booking = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [insurance, setInsurance] = useState(false);
    const [error, setError] = useState('');
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const res = await axios.get(`http://localhost:5001/api/cars/${id}`);
                setCar(res.data);
            } catch (error) {
                console.error('Error fetching car:', error);
            }
        };
        fetchCar();
    }, [id]);

    const calculateTotal = () => {
        if (!startDate || !endDate || !car) return 0;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const days = differenceInDays(end, start) + 1;
        if (days <= 0) return 0;

        let total = days * car.pricePerDay;
        if (insurance) total += days * 15;
        return total;
    };

    const calculateDays = () => {
        if (!startDate || !endDate) return 0;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const days = differenceInDays(end, start) + 1;
        return days > 0 ? days : 0;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!startDate || !endDate) {
            setError('Please select dates');
            return;
        }

        try {
            await axios.post('http://localhost:5001/api/bookings', {
                carId: car._id,
                startDate,
                endDate,
                totalPrice: calculateTotal(),
                insurance
            });
            navigate('/dashboard');
        } catch (error) {
            setError(error.response?.data?.message || 'Booking failed');
        }
    };

    if (!car) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div></div>;

    return (
        <div className="max-w-4xl mx-auto">
            <Link to={`/cars/${id}`} className="inline-flex items-center space-x-2 text-gray-500 hover:text-primary-600 mb-8 transition-colors">
                <ArrowLeft size={20} />
                <span>Back to Car Details</span>
            </Link>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Booking Form */}
                <div>
                    <h2 className="text-3xl font-bold mb-2 text-gray-900">Finalize Booking</h2>
                    <p className="text-gray-500 mb-8">Complete your reservation for the {car.name}</p>

                    {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium border border-red-100">{error}</div>}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100">
                            <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
                                <Calendar className="text-primary-600" size={20} />
                                <span>Rental Dates</span>
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                                    <input
                                        type="date"
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                                        value={startDate}
                                        min={format(new Date(), 'yyyy-MM-dd')}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                                    <input
                                        type="date"
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                                        value={endDate}
                                        min={startDate || format(new Date(), 'yyyy-MM-dd')}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100">
                            <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
                                <Shield className="text-primary-600" size={20} />
                                <span>Protection & Extras</span>
                            </h3>
                            <label className="flex items-center justify-between cursor-pointer group">
                                <div>
                                    <span className="block font-medium text-gray-900">Full Coverage Insurance</span>
                                    <span className="text-sm text-gray-500">Covers damage, theft, and third-party liability</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className="font-bold text-gray-900">$15<span className="text-gray-400 font-normal text-xs">/day</span></span>
                                    <input
                                        type="checkbox"
                                        className="w-6 h-6 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                                        checked={insurance}
                                        onChange={(e) => setInsurance(e.target.checked)}
                                    />
                                </div>
                            </label>
                        </div>

                        <div className="md:hidden">
                            {/* Mobile total shown here if needed, but sticky summary covers it usually */}
                        </div>

                        <button type="submit" className="w-full bg-gray-900 text-white py-4 rounded-xl text-lg font-bold hover:bg-primary-600 transition-all shadow-lg hover:shadow-primary-600/30 flex items-center justify-center space-x-2">
                            <CreditCard size={20} />
                            <span>Confirm & Pay ${calculateTotal()}</span>
                        </button>
                    </form>
                </div>

                {/* Order Summary */}
                <div>
                    <div className="bg-white rounded-3xl p-6 shadow-card border border-gray-100 sticky top-28">
                        <h3 className="text-xl font-bold mb-6">Order Summary</h3>

                        <div className="flex items-center space-x-4 mb-6">
                            <img src={car.image} alt={car.name} className="w-24 h-16 object-cover rounded-lg" />
                            <div>
                                <h4 className="font-bold text-gray-900">{car.name}</h4>
                                <p className="text-sm text-gray-500">{car.brand}</p>
                            </div>
                        </div>

                        <div className="space-y-4 text-sm border-t border-gray-100 pt-4 mb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Duration</span>
                                <span className="font-medium text-gray-900">{calculateDays()} Days</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Car Rental</span>
                                <span className="font-medium text-gray-900">${calculateDays() * car.pricePerDay}</span>
                            </div>
                            {insurance && (
                                <div className="flex justify-between text-gray-600">
                                    <span>Insurance</span>
                                    <span className="font-medium text-gray-900">${calculateDays() * 15}</span>
                                </div>
                            )}
                        </div>

                        <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                            <span className="font-bold text-lg text-gray-900">Total</span>
                            <span className="font-bold text-2xl text-primary-600">${calculateTotal()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;
