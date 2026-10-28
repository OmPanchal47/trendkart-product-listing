import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
          </Routes>
        </BrowserRouter>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
