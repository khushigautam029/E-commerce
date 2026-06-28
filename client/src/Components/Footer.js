import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-4 mt-5">
            <div className="container text-center">
                <h4 className="mb-3">LifestyleNest</h4>

                {/* Footer Links */}
                <div className="d-flex justify-content-center mb-3">
                    <Link to="#" className="text-white mx-3 text-decoration-none">Home</Link>
                    <Link to="#" className="text-white mx-3 text-decoration-none">Shop</Link>
                    <Link to="#" className="text-white mx-3 text-decoration-none">About</Link>
                    <Link to="#" className="text-white mx-3 text-decoration-none">Contact</Link>
                </div>

                {/* Social Media Icons */}
                <div className="d-flex justify-content-center mb-3">
                    <Link to="#" className="text-white mx-3" target="_blank" rel="noopener noreferrer">
                        <FaFacebook size={24} />
                    </Link>
                    <Link to="#" className="text-white mx-3" target="_blank" rel="noopener noreferrer">
                        <FaInstagram size={24} />
                    </Link>
                    <Link to="#" className="text-white mx-3" target="_blank" rel="noopener noreferrer">
                        <FaTwitter size={24} />
                    </Link>
                    <Link to="#" className="text-white mx-3" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin size={24} />
                    </Link>
                </div>

                <p className="mb-0">&copy; {new Date().getFullYear()} LifestyleNest. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
