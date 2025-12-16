import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { Users, Fuel, Calendar, CheckCircle2, ArrowLeft } from 'lucide-react';

const CarDetails = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const res = await axios.get(`http://localhost:5001/api/cars/${id}`);
                setCar(res.data);
            } catch (error) {
                console.error('Error fetching car details:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCar();
    }, [id]);

    if (loading) return (
        <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
    );

    if (!car) return <div className="text-center py-20">Car not found</div>;

    return (
        <div>
            <Link to="/cars" className="inline-flex items-center space-x-2 text-gray-500 hover:text-primary-600 mb-8 transition-colors">
                <ArrowLeft size={20} />
                <span>Back to Fleet</span>
            </Link>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-3xl overflow-hidden shadow-card border border-gray-100">
                        <img src={car.image} alt={car.name} className="w-full h-[400px] object-cover" />
                    </div>

                    <div className="bg-white rounded-3xl p-8 shadow-card border border-gray-100">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <span className="text-primary-600 font-semibold tracking-wider text-sm uppercase mb-1 block">{car.brand}</span>
                                <h1 className="text-4xl font-bold text-gray-900">{car.name}</h1>
                            </div>
                            <span className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wide">
                                {car.type}
                            </span>
                        </div>

                        <div className="grid grid-cols-3 gap-6 mb-8">
                            <div className="bg-gray-50 p-4 rounded-2xl text-center">
                                <Users size={24} className="mx-auto text-primary-600 mb-2" />
                                <span className="block text-gray-900 font-bold">{car.seats} Seats</span>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-2xl text-center">
                                <Fuel size={24} className="mx-auto text-primary-600 mb-2" />
                                <span className="block text-gray-900 font-bold">Petrol</span>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-2xl text-center">
                                <Calendar size={24} className="mx-auto text-primary-600 mb-2" />
                                <span className="block text-gray-900 font-bold">2024 Model</span>
                            </div>
                        </div>

                        <h3 className="text-xl font-bold mb-4">Vehicle Features</h3>
                        <ul className="grid sm:grid-cols-2 gap-4">
                            {['Bluetooth', 'Navigation System', 'Leather Seats', 'Cruise Control', 'Parking Sensors', 'Apple CarPlay'].map((feature, idx) => (
                                <li key={idx} className="flex items-center space-x-3 text-gray-600">
                                    <CheckCircle2 size={20} className="text-green-500" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-3xl p-8 shadow-card border border-gray-100 sticky top-28">
                        <h3 className="text-xl font-bold mb-6 text-gray-900">Rental Summary</h3>

                        <div className="flex justify-between items-end mb-8 pb-8 border-b border-gray-100">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Daily Rate</p>
                                <p className="text-3xl font-bold text-gray-900">${car.pricePerDay}</p>
                            </div>
                            <span className="text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full text-sm">Best Price</span>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-gray-600">
                                <span>Free Cancellation</span>
                                <CheckCircle2 size={20} className="text-primary-600" />
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Instant Confirmation</span>
                                <CheckCircle2 size={20} className="text-primary-600" />
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Insurance Included</span>
                                <CheckCircle2 size={20} className="text-primary-600" />
                            </div>
                        </div>

                        {user ? (
                            <Link to={`/booking/${car._id}`} className="block w-full bg-gray-900 text-white text-center py-4 rounded-xl text-lg font-bold hover:bg-primary-600 transition-all shadow-lg hover:shadow-primary-600/30">
                                Proceed to Booking
                            </Link>
                        ) : (
                            <div className="space-y-4">
                                <Link to="/login" className="block w-full bg-primary-600 text-white text-center py-4 rounded-xl text-lg font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/30">
                                    Login to Book
                                </Link>
                                <p className="text-center text-sm text-gray-500">
                                    Not a member? <Link to="/register" className="text-primary-600 font-bold hover:underline">Sign up</Link>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetails;
