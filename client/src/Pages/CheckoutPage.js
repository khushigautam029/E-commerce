import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

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
                navigate("/my-orders");
            } else {
                alert("Failed to place order.");
            }
        } catch (error) {
            console.error("Order error:", error.response?.data || error.message);
            alert("Failed to place order.");
        }
    };


    return (
        <div className="container py-4">
            <h2>Checkout</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <ul className="list-group mb-4">
                        {cartItems.map((item) => (
                            <li key={item.id} className="list-group-item d-flex justify-content-between">
                                <div>{item.name}</div>
                                <div>₹{item.price}</div>
                            </li>
                        ))}
                    </ul>
                    <h5>Total: ₹{totalPrice}</h5>
                    <button className="btn btn-success" onClick={handlePlaceOrder}>
                        Place Order
                    </button>
                </div>
            )}
        </div>
    );
};

export default CheckoutPage;
