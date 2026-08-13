import { Trash2 } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const CartPage = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="w-full px-4 py-8 lg:px-10">
        {/* Heading */}

        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm border">
          <h1 className="text-4xl font-bold text-slate-900">
            Shopping Cart
          </h1>

          <p className="mt-2 text-slate-500">
            Review your selected products before checkout.
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex h-[70vh] flex-col items-center justify-center rounded-2xl border bg-white shadow">
            <h2 className="mb-3 text-3xl font-bold text-slate-700">
              Your Cart is Empty
            </h2>

            <p className="mb-8 text-slate-500">
              Looks like you haven't added anything yet.
            </p>

            <Link
              to="/products"
              className="rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Products */}

            <div className="lg:col-span-8 space-y-5">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="group flex flex-col gap-5 rounded-2xl border bg-white p-5 shadow-sm transition duration-300 hover:shadow-xl sm:flex-row"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-36 w-36 rounded-xl object-cover border"
                  />

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">
                        {item.name}
                      </h3>

                      <p className="mt-2 text-slate-500">
                        {item.category || "Product"}
                      </p>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <p className="text-2xl font-bold text-blue-600">
                          ₹{item.price}
                        </p>

                        <p className="text-sm text-slate-500">
                          Quantity : {item.quantity || 1}
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 font-medium text-red-600 transition hover:bg-red-50"
                      >
                        <Trash2 size={18} />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}

            <div className="lg:col-span-4">
              <div className="sticky top-5 rounded-3xl border bg-white p-7 shadow-xl">
                <h2 className="mb-6 text-2xl font-bold">
                  Order Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between text-slate-600">
                    <span>Items</span>

                    <span>{cartItems.length}</span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>

                    <span>₹{totalPrice}</span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Shipping</span>

                    <span className="font-semibold text-green-600">
                      FREE
                    </span>
                  </div>

                  <hr />

                  <div className="flex justify-between text-2xl font-bold">
                    <span>Total</span>

                    <span className="text-blue-600">
                      ₹{totalPrice}
                    </span>
                  </div>

                  <Link
                    to="/checkout"
                    className="mt-6 flex w-full items-center justify-center rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
                  >
                    Proceed to Checkout
                  </Link>

                  <Link
                    to="/products"
                    className="mt-4 flex w-full items-center justify-center rounded-xl border border-blue-600 py-4 text-lg font-semibold text-blue-600 transition hover:bg-blue-50"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;