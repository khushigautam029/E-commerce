import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaBoxOpen, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        axios.get(`http://localhost:5000/api/orders/${userId}`)
            .then(res => setOrders(res.data))
            .catch(err => console.error("Error fetching orders", err));
    }, [userId]);

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-4 flex items-center gap-3">
                <FaBoxOpen className="text-brand-primary" /> My Orders
            </h2>
            
            {orders.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-xl text-gray-500">You have no orders yet.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                                <div className="flex items-center gap-2 text-gray-600 font-medium">
                                    <FaCalendarAlt className="text-brand-primary" />
                                    <span>Ordered on: {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-bold rounded-full flex items-center gap-1">
                                        <FaCheckCircle /> Confirmed
                                    </span>
                                </div>
                            </div>
                            
                            <div className="p-6">
                                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Items Summary</h4>
                                <ul className="space-y-4 mb-6">
                                    {order.items.map((item, idx) => (
                                        <li key={idx} className="flex justify-between items-center">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                </div>
                                                <span className="font-medium text-gray-800">{item.name}</span>
                                            </div>
                                            <span className="text-gray-600">₹{item.price}</span>
                                        </li>
                                    ))}
                                </ul>
                                
                                <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                                    <span className="text-lg font-bold text-gray-900">Total Amount</span>
                                    <span className="text-2xl font-extrabold text-brand-primary">₹{order.totalPrice}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;
