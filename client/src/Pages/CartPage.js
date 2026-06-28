import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const CartPage = () => {
    const { cartItems } = useContext(CartContext);

    return (
        <div className="container mt-4">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                cartItems.map((item, index) => (
                    <div key={index} className="card mb-3">
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src={item.image} className="img-fluid rounded-start" alt={item.name} />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">₹ {item.price}</p>
                                </div>
                            </div>
                            <Link to="/checkout" className="btn btn-primary mt-3">
                                Proceed to Checkout
                            </Link>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default CartPage;
