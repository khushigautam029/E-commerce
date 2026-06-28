import axios from 'axios';
import { useEffect, useState } from 'react';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        axios.get(`http://localhost:5000/api/orders/${userId}`)
            .then(res => setOrders(res.data))
            .catch(err => console.error("Error fetching orders", err));
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="mb-4">My Orders</h2>
            {orders.length === 0 ? (
                <p>You have no orders yet.</p>
            ) : (
                orders.map((order, index) => (
                    <div key={index} className="card mb-3 shadow-sm">
                        <div className="card-body">
                            <h5>Order #{index + 1} - {new Date(order.orderedAt).toLocaleString()}</h5>
                            <p><strong>Status:</strong> {order.status}</p>
                            <ul>
                                {order.items.map((item, idx) => (
                                    <li key={idx}>
                                        {item.name} x {item.quantity} — ₹{item.price * item.quantity}
                                    </li>
                                ))}
                            </ul>
                            <strong>Total: ₹{order.totalAmount}</strong>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Orders;
