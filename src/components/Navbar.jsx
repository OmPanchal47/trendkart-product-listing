import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function Navbar({ search, setSearch }) {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <nav className="navbar navbar-light bg-white border-bottom sticky-top px-3 py-2">
      <div className="d-flex align-items-center justify-content-between w-100">
        <div className="d-flex align-items-center gap-4">
          <button className="btn border-0">
            <i className="bi bi-list fs-4"></i>☰
          </button>
          <div className="d-none d-lg-flex gap-2 gap-lg-4">
            <Link to="/" className="nav-link fw-bold text-primary px-1">MEN</Link>
            <Link to="/" className="nav-link fw-bold text-dark px-1">WOMEN</Link>
            <Link to="/" className="nav-link fw-bold text-dark px-1">ACCESSORIES</Link>
          </div>
        </div>

        <Link to="/" className="navbar-brand fw-bold fs-4 text-primary mb-0">
          TREND<span className="text-dark">KART</span>
        </Link>

        <div className="d-flex align-items-center gap-2 gap-md-3">
          <input
            type="text"
            className="form-control rounded-pill d-none d-sm-block search-input"
            placeholder="What are you looking for?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link to="/wishlist" className="btn border-0 fs-5 position-relative text-dark">
            ♡
            {wishlistCount > 0 && (
              <span className="badge rounded-pill bg-danger nav-badge">{wishlistCount}</span>
            )}
          </Link>
          <Link to="/cart" className="btn border-0 fs-5 position-relative text-dark">
            🛒
            {cartCount > 0 && (
              <span className="badge rounded-pill bg-danger nav-badge">{cartCount}</span>
            )}
          </Link>
        </div>
      </div>

      <input
        type="text"
        className="form-control rounded-pill d-block d-sm-none mt-2"
        placeholder="What are you looking for?"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </nav>
  );
}
