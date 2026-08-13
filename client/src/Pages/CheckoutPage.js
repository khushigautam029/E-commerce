import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FaCheckCircle } from 'react-icons/fa';

const CheckoutPage = () => {
    const { cartItems, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

    const handlePlaceOrder = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/orders", {
                userId: user?._id,
                items: cartItems,
                totalPrice,
                date: new Date().toISOString(),
            });

            if (response.status === 201) {
                alert("Order placed successfully!");
                clearCart();
                navigate("/orders");
            } else {
                alert("Failed to place order.");
            }
        } catch (error) {
            console.error("Order error:", error.response?.data || error.message);
            alert("Failed to place order.");
        }
    };


    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-4">Checkout</h2>
            {cartItems.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-xl text-gray-500 mb-6">Your cart is empty.</p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="p-8">
                        <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <FaCheckCircle className="text-brand-primary" /> Order Details
                        </h4>
                        
                        <div className="space-y-4 mb-8">
                            {cartItems.map((item, index) => (
                                <div key={index} className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <span className="font-medium text-gray-800">{item.name}</span>
                                    </div>
                                    <span className="font-bold text-gray-600">₹{item.price}</span>
                                </div>
                            ))}
                        </div>
                        
                        <div className="bg-brand-light/30 rounded-xl p-6 border border-brand-primary/10">
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-bold text-gray-900">Total Amount</span>
                                <span className="text-3xl font-extrabold text-brand-primary">₹{totalPrice}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-gray-50 px-8 py-6 flex justify-end">
                        <button 
                            className="px-8 py-4 bg-brand-primary text-white font-bold rounded-xl shadow-lg hover:bg-brand-dark hover:shadow-xl transition-all hover:-translate-y-0.5 w-full sm:w-auto"
                            onClick={handlePlaceOrder}
                        >
                            Place Order Securely
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckoutPage;
