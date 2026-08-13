import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './Layout/MainLayout';
import CartPage from './Pages/CartPage';
import CheckoutPage from './Pages/CheckoutPage';
import Clothes from './Pages/Clothes';
import DecorationItem from './Pages/DecorationItem';
import DeleteAccount from './Pages/DeleteAccount';
import Footwear from './Pages/Footwear';
import Gifts from './Pages/Gifts';
import Home from './Pages/Home';
import LoginPage from './Pages/LoginPage';
import LogoutPage from './Pages/LogoutPage';
import NotFound from './Pages/NotFound';
import Orders from './Pages/Orders';
import ProductDescription from './Pages/ProductDescription';
import ProductList from './Pages/ProductList';
import ProductsByCategory from './Pages/ProductsByCategory';
import SignupPage from './Pages/SignupPage';
import Skincare from './Pages/Skincare';
import ProtectedRoute from './ProtectedRoute';


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="delete-account" element={<DeleteAccount />} />
            <Route path="home" element={<Home />} />
            <Route path="products" element={<ProductList />} />
            <Route path="products/:category" element={<ProductsByCategory />} />
            <Route path="clothes" element={<Clothes />} />
            <Route path="skincare" element={<Skincare />} />
            <Route path="footwear" element={<Footwear />} />
            <Route path="gifts" element={<Gifts />} />
            <Route path="decoration" element={<DecorationItem />} />
            <Route path="product/:id" element={<ProductDescription />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
