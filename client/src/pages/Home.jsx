import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, Heart } from 'lucide-react';

const Home = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className="relative bg-gray-900 rounded-3xl overflow-hidden mb-20 text-white">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                        alt="Luxury Car"
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
                </div>

                <div className="relative z-10 px-8 py-24 md:py-32 md:px-12 max-w-4xl">
                    <span className="text-primary-400 font-semibold tracking-wider uppercase mb-4 block">Premium Car Rental</span>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        Elevate Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-white">Journey</span>
                    </h1>
                    <p className="text-xl text-gray-300 mb-10 max-w-xl leading-relaxed">
                        Experience the thrill of the road with our curated collection of premium vehicles. Whether it's for business or leisure, we have the perfect ride for you.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link to="/cars" className="bg-primary-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary-500 transition-all shadow-lg shadow-primary-600/30 text-center">
                            Explore Fleet
                        </Link>
                        <Link to="/register" className="bg-white/10 backdrop-blur border border-white/20 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all text-center">
                            Create Account
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="mb-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">Why Choose RentWheels?</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">We provide more than just a car; we provide a seamless travel experience tailored to your needs.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { icon: <ShieldCheck size={40} />, title: "Secure Booking", desc: "Your safety and privacy are our top priority with fully encrypted transactions." },
                        { icon: <Zap size={40} />, title: "Fast & Easy", desc: "Book your dream car in minutes with our streamlined digital process." },
                        { icon: <Heart size={40} />, title: "Premium Support", desc: "24/7 dedicated customer support to ensure your journey is smooth." }
                    ].map((feature, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-2xl shadow-soft hover:shadow-card transition-all text-center group">
                            <div className="inline-block p-4 bg-primary-50 text-primary-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                            <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
