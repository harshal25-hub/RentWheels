import { useState, useEffect } from 'react';
import axios from 'axios';
import CarCard from '../components/CarCard';
import { Search, Filter } from 'lucide-react';

const CarListing = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/cars');
                setCars(res.data);
            } catch (error) {
                console.error('Error fetching cars:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCars();
    }, []);

    const filteredCars = cars.filter(car =>
        car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Premium Fleet</h1>
                    <p className="text-gray-500">Choose from our exclusive collection of high-end vehicles.</p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Search size={20} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by brand or model..."
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
                </div>
            ) : (
                <>
                    {filteredCars.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredCars.map(car => (
                                <CarCard key={car._id} car={car} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-soft">
                            <div className="bg-gray-50 inline-flex p-4 rounded-full mb-4 text-gray-400">
                                <Search size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No cars found</h3>
                            <p className="text-gray-500">Try adjusting your search criteria</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default CarListing;
