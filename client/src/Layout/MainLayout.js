import { Outlet, useLocation } from 'react-router-dom';
import CategoryBar from '../Components/CategoryBar';
import Footer from '../Components/Footer';
import NavBar from '../Components/Navbar';
import ReturnPolicy from '../Components/ReturnPolicy';
import Slider from '../Components/Slider';
import ProductList from '../Pages/ProductList';
import { CartProvider } from '../context/CartContext';

const MainLayout = () => {
    const location = useLocation();

    const isHomePage = location.pathname === '/';

    return (
        <>
        <CartProvider>
            <NavBar />
            <CategoryBar />
            {isHomePage && <Slider />}
            {isHomePage && <ReturnPolicy />}
            {isHomePage && <ProductList />}

            <Outlet />
            <Footer />
        </CartProvider>
        
        </>
    );
};

export default MainLayout;
