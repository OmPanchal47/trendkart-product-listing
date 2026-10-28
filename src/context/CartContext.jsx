import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

function loadCart() {
  const saved = localStorage.getItem("cart");
  return saved ? JSON.parse(saved) : [];
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(loadCart);

  // keep localStorage in sync whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(product, size, color, qty) {
    setCart((prev) => {
      // same product + same size + same color = same cart line, just bump qty
      const existing = prev.find(
        (item) => item.id === product.id && item.size === size && item.color === color
      );

      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.size === size && item.color === color
            ? { ...item, qty: item.qty + qty }
            : item
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          image: product.image,
          priceINR: product.priceINR,
          size,
          color,
          qty,
        },
      ];
    });
  }

  function removeFromCart(id, size, color) {
    setCart((prev) =>
      prev.filter((item) => !(item.id === id && item.size === size && item.color === color))
    );
  }

  function updateQuantity(id, size, color, qty) {
    if (qty < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size && item.color === color
          ? { ...item, qty }
          : item
      )
    );
  }

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.priceINR * item.qty, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, cartCount, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
