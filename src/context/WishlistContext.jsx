import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext(null);

function loadWishlist() {
  const saved = localStorage.getItem("wishlist");
  return saved ? JSON.parse(saved) : [];
}

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(loadWishlist);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  function isInWishlist(id) {
    return wishlist.some((item) => item.id === id);
  }

  function addToWishlist(product) {
    if (isInWishlist(product.id)) return;
    setWishlist((prev) => [
      ...prev,
      {
        id: product.id,
        title: product.title,
        image: product.image,
        priceINR: product.priceINR,
      },
    ]);
  }

  function removeFromWishlist(id) {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  }

  function toggleWishlist(product) {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  }

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist, wishlistCount: wishlist.length }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
