import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { X, MessageCircle, Users, GraduationCap, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';

const Dashboard = () => {
    const [showPopup, setShowPopup] = useState(false);

    // Typing animation for greeting
    const fullText = "I am College Mitra, your AI-based college predictor. I will help you with selecting colleges, comparing them, and predicting cutoffs for next year!";
    const [typedText, setTypedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    // Typing effect
    useEffect(() => {
        const startDelay = setTimeout(() => {
            setIsTyping(true);
        }, 2500);

        return () => clearTimeout(startDelay);
    }, []);

    useEffect(() => {
        if (!isTyping) return;

        if (typedText.length < fullText.length) {
            const timeout = setTimeout(() => {
                setTypedText(fullText.slice(0, typedText.length + 1));
            }, 50);
            return () => clearTimeout(timeout);
        }
    }, [typedText, isTyping, fullText]);

    return (
        <div className="min-h-screen bg-orange-50">
            {/* Community Popup */}
            <AnimatePresence>
                {showPopup && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed bottom-4 right-4 z-50 max-w-sm w-full p-4 md:bottom-8 md:right-8"
                    >
                        <div className="bg-white rounded-2xl shadow-2xl border border-orange-100 p-6 relative overflow-hidden">
                            <button
                                onClick={() => setShowPopup(false)}
                                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors bg-gray-50 rounded-full p-1"
                            >
                                <X size={20} />
                            </button>

                            <div className="flex items-start gap-4">
                                <div className="bg-orange-100 p-3 rounded-xl">
                                    <MessageCircle className="w-8 h-8 text-[#f68014]" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2">
                                        Talk to Seniors from your <span className="text-[#f68014]">Dream College!</span>
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                                        Join our community to connect with mentors from COEP, VJTI, SPIT & more.
                                    </p>
                                    <a
                                        href="https://chat.whatsapp.com/HbLY6umdG2G5jKfeRIfbxf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold rounded-lg transition-all shadow-md gap-2"
                                    >
                                        <Users size={18} />
                                        Join Community
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero Section - Full viewport height */}
            <section className="relative overflow-hidden min-h-[90vh] lg:min-h-screen flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative w-full">
                    <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
                        {/* Left Content */}
                        <div className="space-y-4 sm:space-y-6 z-10 text-center lg:text-left">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                                Find the Right<br />
                                College <span className="text-[#f68014]">with Confidence</span>
                            </h1>

                            <p className="text-base sm:text-lg text-gray-600 max-w-lg leading-relaxed mx-auto lg:mx-0">
                                Not sure which college you'll get? Enter your percentile and see your options instantly. We've analyzed 5 years of MHT-CET cutoff data so you don't have to.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2 justify-center lg:justify-start">
                                <Link to="/college-predictor">
                                    <button className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 bg-[#f68014] text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/25">
                                        Predict College →
                                    </button>
                                </Link>
                                <Link to="/cutoff-predictor">
                                    <button className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 transition-colors bg-white">
                                        Predict Cutoff for 2026 →
                                    </button>
                                </Link>
                            </div>

                            {/* Simple Stats */}
                            <div className="flex justify-center lg:justify-start gap-6 sm:gap-8 lg:gap-10 pt-4 sm:pt-6 text-sm">
                                <div>
                                    <div className="text-xl sm:text-2xl font-bold text-gray-900">19,500+</div>
                                    <div className="text-gray-500 text-xs sm:text-sm">records</div>
                                </div>
                                <div>
                                    <div className="text-xl sm:text-2xl font-bold text-gray-900">2021-25</div>
                                    <div className="text-gray-500 text-xs sm:text-sm">data</div>
                                </div>
                                <div>
                                    <div className="text-xl sm:text-2xl font-bold text-[#f68014]">Free</div>
                                    <div className="text-gray-500 text-xs sm:text-sm">always</div>
                                </div>
                            </div>
                        </div>

                        {/* Right - 3D AI Assistant */}
                        <div className="relative hidden md:flex items-center justify-center lg:justify-end overflow-visible order-first lg:order-last">
                            <div className="relative w-full max-w-lg lg:max-w-2xl">
                                {/* 3D Spline Robot */}
                                <div className="relative h-[400px] lg:h-[600px] w-full">
                                    <Spline
                                        scene="https://prod.spline.design/GnHmmYaecwIV0ptE/scene.splinecode"
                                        className="w-full h-full"
                                    />
                                </div>

                                {/* College Mitra Greeting Bubble - Modern Interactive */}
                                <motion.div
                                    initial={{ opacity: 0, x: 50, y: -20 }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                        y: 0,
                                        y: [0, -10, 0]
                                    }}
                                    transition={{
                                        opacity: { delay: 1, duration: 0.6 },
                                        x: { delay: 1, duration: 0.6, ease: "easeOut" },
                                        y: { delay: 2, duration: 3, repeat: Infinity, ease: "easeInOut" }
                                    }}
                                    className="absolute -top-8 -right-20 lg:-right-32 xl:-right-44 max-w-sm z-20"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.02, y: -5 }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-gradient-to-br from-white/90 via-white/85 to-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/60 px-6 py-6 relative group cursor-pointer"
                                    >
                                        {/* Animated glow effect */}
                                        <motion.div
                                            animate={{
                                                opacity: [0.3, 0.6, 0.3],
                                                scale: [1, 1.05, 1]
                                            }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                            className="absolute -inset-1 bg-gradient-to-r from-orange-400/30 via-orange-500/30 to-orange-600/30 rounded-3xl blur-xl -z-10"
                                        />

                                        {/* College Mitra Badge */}
                                        <div className="flex items-center gap-3 mb-4">
                                            <motion.div
                                                animate={{ rotate: [0, 5, -5, 0] }}
                                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                                className="bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 p-2.5 rounded-xl shadow-lg shadow-orange-500/40 group-hover:shadow-orange-500/60 transition-shadow"
                                            >
                                                <Sparkles className="w-4 h-4 text-white" />
                                            </motion.div>
                                            <div className="flex-1">
                                                <motion.span
                                                    className="font-bold text-gray-900 text-base block"
                                                    animate={{ opacity: [1, 0.8, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                >
                                                    College Mitra
                                                </motion.span>
                                                <div className="flex items-center gap-1.5 mt-0.5">
                                                    <motion.div
                                                        animate={{
                                                            scale: [1, 1.3, 1],
                                                            opacity: [1, 0.7, 1]
                                                        }}
                                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                                        className="w-2 h-2 bg-green-500 rounded-full shadow-md shadow-green-500/60"
                                                    />
                                                    <span className="text-xs text-gray-600 font-medium">Online & Ready</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Greeting Message */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 1.5, duration: 0.5 }}
                                            className="text-gray-800 text-sm leading-relaxed space-y-2.5"
                                        >
                                            <motion.p
                                                animate={{ scale: [1, 1.05, 1] }}
                                                transition={{ duration: 3, repeat: Infinity }}
                                                className="font-bold text-orange-600 text-base flex items-center gap-2"
                                            >
                                                Hello Aspirants!!
                                            </motion.p>
                                            <p className="font-medium min-h-[80px]">
                                                {typedText}
                                                {isTyping && typedText.length < fullText.length && (
                                                    <span className="inline-block w-0.5 h-4 bg-orange-600 ml-1 animate-pulse"></span>
                                                )}
                                            </p>
                                        </motion.div>

                                        {/* Quick Action Hint with Pulse */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 2, duration: 0.5 }}
                                            className="mt-5 pt-4 border-t border-gray-300/50 flex items-center gap-2.5 text-xs"
                                        >
                                            <div className="flex gap-1.5">
                                                <motion.div
                                                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                                                    transition={{ duration: 1.5, repeat: Infinity }}
                                                    className="w-1.5 h-1.5 bg-orange-500 rounded-full"
                                                />
                                                <motion.div
                                                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                                                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                                                    className="w-1.5 h-1.5 bg-orange-500 rounded-full"
                                                />
                                                <motion.div
                                                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                                                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                                                    className="w-1.5 h-1.5 bg-orange-500 rounded-full"
                                                />
                                            </div>
                                            <span className="font-semibold text-gray-700 group-hover:text-orange-600 transition-colors">
                                                Try the tools below to get started! ✨
                                            </span>
                                        </motion.div>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Bottom gradient fade */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
            </section>

            {/* Mentorship / Community Section */}
            <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-orange-600 to-orange-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
                        <div className="text-white space-y-3 sm:space-y-4 max-w-2xl text-center md:text-left">
                            <div className="inline-flex items-center gap-2 bg-white/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-sm border border-white/20">
                                <GraduationCap size={18} className="text-orange-200" />
                                <span className="text-orange-100 font-medium text-xs sm:text-sm">Mentorship Program</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                                Confused about College Life? <br className="hidden sm:block" />
                                <span className="text-orange-200">Talk to Seniors Directly.</span>
                            </h2>
                            <p className="text-orange-100 text-sm sm:text-base lg:text-lg leading-relaxed">
                                Get honest reviews, placement reality checks, and campus insights from students already studying in your dream colleges (COEP, VJTI, SPIT, PICT & more).
                            </p>
                            <div className="pt-2 sm:pt-4 flex flex-wrap gap-4 justify-center md:justify-start">
                                <a
                                    href="https://chat.whatsapp.com/HbLY6umdG2G5jKfeRIfbxf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-orange-600 hover:bg-orange-50 font-bold rounded-xl transition-all shadow-lg transform hover:-translate-y-1 text-sm sm:text-base"
                                >
                                    Join Community For Free
                                </a>
                            </div>
                        </div>
                        <div className="relative hidden sm:block">
                            <div className="absolute -inset-4 bg-white/20 blur-xl rounded-full"></div>
                            <Users className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 text-white/90 relative z-10" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Tools Section */}
            <section className="py-12 sm:py-16 lg:py-20 bg-white" id="tools">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Explore Our Tools</h2>
                        <p className="text-gray-500 text-sm sm:text-base">Everything you need for MHT-CET Mentorship</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        {/* College Predictor */}
                        <Link to="/college-predictor" className="group block bg-white rounded-2xl p-5 sm:p-6 lg:p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-orange-200 hover:-translate-y-1 transition-all duration-300">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-orange-100 rounded-xl flex items-center justify-center text-xl sm:text-2xl mb-4 sm:mb-5 group-hover:bg-orange-200 transition-colors">
                                🎓
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">College Predictor</h3>
                            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">Enter your percentile and see which colleges you're likely to get admission in.</p>
                            <span className="text-[#f68014] font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all text-sm sm:text-base">
                                Try Now <span className="text-lg">→</span>
                            </span>
                        </Link>

                        {/* Cutoff Analyzer */}
                        <Link to="/cutoff-predictor" className="group block bg-white rounded-2xl p-5 sm:p-6 lg:p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-orange-200 hover:-translate-y-1 transition-all duration-300">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-xl flex items-center justify-center text-xl sm:text-2xl mb-4 sm:mb-5 group-hover:bg-blue-200 transition-colors">
                                📊
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Cutoff Analyzer</h3>
                            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">View 5 years of cutoff trends and predict what cutoffs might be in 2026.</p>
                            <span className="text-[#f68014] font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all text-sm sm:text-base">
                                Analyze <span className="text-lg">→</span>
                            </span>
                        </Link>

                        {/* College Comparison */}
                        <Link to="/college-comparison" className="group block bg-white rounded-2xl p-5 sm:p-6 lg:p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-orange-200 hover:-translate-y-1 transition-all duration-300 sm:col-span-2 lg:col-span-1">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-100 rounded-xl flex items-center justify-center text-xl sm:text-2xl mb-4 sm:mb-5 group-hover:bg-green-200 transition-colors">
                                ⚖️
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">College Comparison</h3>
                            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">Compare two colleges side by side with cutoffs, trends and more.</p>
                            <span className="text-[#f68014] font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all text-sm sm:text-base">
                                Compare <span className="text-lg">→</span>
                            </span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-8 sm:py-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
                        <div className="col-span-2 md:col-span-1">
                            <h3 className="text-white font-bold text-base sm:text-lg mb-3 sm:mb-4">College Pe Charcha</h3>
                            <p className="text-xs sm:text-sm leading-relaxed">Helping MHT-CET aspirants make informed decisions with data-driven insights.</p>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Tools</h4>
                            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                                <li><Link to="/college-predictor" className="hover:text-white transition">College Predictor</Link></li>
                                <li><Link to="/cutoff-predictor" className="hover:text-white transition">Cutoff Analyzer</Link></li>
                                <li><Link to="/college-comparison" className="hover:text-white transition">College Comparison</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Data Sources</h4>
                            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                                <li>Cet Cell Maharashtra</li>
                                <li>CAP Rounds 2021-2025</li>
                                <li>Official Cutoff Records</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm">
                        <p className="text-center md:text-left">© 2026 College Pe Charcha. Made for MHT-CET Aspirants.</p>
                        <div className="flex gap-4 sm:gap-6">
                            <Link to="/about" className="hover:text-white transition">About Us</Link>
                            <Link to="/contact" className="hover:text-white transition">Contact Us</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;
