import { Link } from 'react-router-dom';
import { Users, Fuel, ArrowRight } from 'lucide-react';

const CarCard = ({ car }) => {
    return (
        <div className="group bg-white rounded-3xl overflow-hidden shadow-card border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-4 right-4 bg-white/90 backdrop-blur text-gray-900 text-xs font-bold px-3 py-1 rounded-full z-20 shadow-sm uppercase tracking-wider">
                    {car.type}
                </span>
            </div>

            <div className="p-6">
                <div className="mb-4">
                    <p className="text-sm text-primary-600 font-semibold mb-1">{car.brand}</p>
                    <h3 className="text-2xl font-bold text-gray-900">{car.name}</h3>
                </div>

                <div className="flex items-center space-x-6 text-gray-500 mb-6 text-sm">
                    <div className="flex items-center space-x-2">
                        <Users size={18} className="text-primary-500" />
                        <span>{car.seats} Seats</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Fuel size={18} className="text-primary-500" />
                        <span>Petrol</span>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-gray-50">
                    <div>
                        <p className="text-2xl font-bold text-gray-900">${car.pricePerDay}</p>
                        <p className="text-xs text-gray-500">per day</p>
                    </div>
                    <Link
                        to={`/cars/${car._id}`}
                        className="flex items-center space-x-2 bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-primary-600 transition-colors group-hover:shadow-lg group-hover:shadow-primary-500/30"
                    >
                        <span>Book Now</span>
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CarCard;
