import {
    FaEnvelope,
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="border-t border-purple-200 bg-purple-100">
              <hr className="border-t-1 border-black" />

            <div className="mx-auto max-w-7xl px-6 py-8">

                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">

                    {/* Brand */}
                    <div>
                        <h3 className="mb-3 text-2xl font-bold text-pink-700">
                            LifestyleNest
                        </h3>

                        <p className="text-sm leading-6 text-gray-600">
                            Discover the latest fashion, electronics, home essentials,
                            beauty products, and much more—all in one place at affordable
                            prices.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h5 className="mb-4 font-semibold text-pink-700">
                            Quick Links
                        </h5>

                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    to="/"
                                    className="text-gray-600 no-underline hover:text-pink-600"
                                >
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/products"
                                    className="text-gray-600 no-underline hover:text-pink-600"
                                >
                                    Shop
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/about"
                                    className="text-gray-600 no-underline hover:text-pink-600"
                                >
                                    About Us
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/contact"
                                    className="text-gray-600 no-underline hover:text-pink-600"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Support */}
                    <div>
                        <h5 className="mb-4 font-semibold text-pink-700">
                            Customer Support
                        </h5>

                        <ul className="space-y-3 text-sm text-gray-600">

                            <li className="flex items-center gap-2">
                                <FaEnvelope className="text-pink-600" />
                                support@lifestylenest.com
                            </li>

                            <li className="flex items-center gap-2">
                                <FaPhoneAlt className="text-pink-600" />
                                +91 98765 43210
                            </li>

                            <li className="flex items-center gap-2">
                                <FaMapMarkerAlt className="text-pink-600" />
                                Jaipur, Rajasthan
                            </li>

                        </ul>
                    </div>

                    {/* Follow Us */}
                    <div>
                        <h5 className="mb-4 font-semibold text-pink-700">
                            Follow Us
                        </h5>

                        <div className="flex gap-4">

                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-white p-3 text-pink-600 shadow transition-all duration-300 hover:bg-pink-600 hover:text-white"
                            >
                                <FaFacebook size={18} />
                            </a>

                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-white p-3 text-pink-600 shadow transition-all duration-300 hover:bg-pink-600 hover:text-white"
                            >
                                <FaInstagram size={18} />
                            </a>

                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-white p-3 text-pink-600 shadow transition-all duration-300 hover:bg-pink-600 hover:text-white"
                            >
                                <FaTwitter size={18} />
                            </a>

                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-white p-3 text-pink-600 shadow transition-all duration-300 hover:bg-pink-600 hover:text-white"
                            >
                                <FaLinkedin size={18} />
                            </a>

                        </div>
                    </div>

                </div>

                {/* Bottom Section */}

                <div className="mt-3 border-t border-pink-200 pt-3 text-center">

                    <p className="text-sm text-gray-600">
                        © {new Date().getFullYear()}{" "}
                        <span className="font-semibold text-pink-700">
                            LifestyleNest
                        </span>
                        . All Rights Reserved.
                    </p>

                    <p className="mt-2 text-xs text-gray-500">
                        Designed with ❤️ for a seamless shopping experience.
                    </p>

                </div>

            </div>
            
        </footer>
    );
};

export default Footer;