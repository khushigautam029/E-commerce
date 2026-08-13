import { createContext, useContext, useMemo, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Normalize product IDs
  const normalizeProduct = (product) => ({
    ...product,
    id: product.id ?? product._id,
    _id: product._id ?? product.id,
  });

  // Add Product
  const addToCart = (product) => {
    const normalizedProduct = normalizeProduct(product);

    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => (item._id ?? item.id) === normalizedProduct._id
      );

      if (existingItem) {
        return prevItems.map((item) =>
          (item._id ?? item.id) === normalizedProduct._id
            ? {
                ...item,
                quantity: (item.quantity || 1) + 1,
              }
            : item
        );
      }

      return [
        ...prevItems,
        {
          ...normalizedProduct,
          quantity: 1,
        },
      ];
    });
  };

  // Remove Product
  const removeFromCart = (id) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => (item._id ?? item.id) !== id)
    );
  };

  // Increase Quantity
  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        (item._id ?? item.id) === id
          ? {
              ...item,
              quantity: (item.quantity || 1) + 1,
            }
          : item
      )
    );
  };

  // Decrease Quantity
  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        (item._id ?? item.id) === id
          ? {
              ...item,
              quantity: Math.max((item.quantity || 1) - 1, 1),
            }
          : item
      )
    );
  };

  // Clear Cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Total Items
  const totalItems = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + (item.quantity || 1),
      0
    );
  }, [cartItems]);

  // Total Price
  const totalPrice = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);