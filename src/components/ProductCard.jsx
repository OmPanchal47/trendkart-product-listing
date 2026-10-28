import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [message, setMessage] = useState("");

  const outOfStock = product.stock === 0;
  const inWishlist = isInWishlist(product.id);

  function handleAddToCart() {
    if (outOfStock) {
      setMessage("Out of stock");
      return;
    }
    if (!selectedSize) {
      setMessage("Please select a size");
      return;
    }
    addToCart(product, selectedSize, product.color.name, 1);
    setMessage("Added to cart");
    setTimeout(() => setMessage(""), 1500);
  }

  function handleBuyNow() {
    // skip the size check here, just use whatever is currently selected
    if (outOfStock) {
      setMessage("Out of stock");
      return;
    }
    addToCart(product, selectedSize, product.color.name, 1);
    navigate("/cart");
  }

  return (
    <div className="col-6 col-md-4 col-lg-3 mb-4">
      <div className="card h-100 border-0">
        <div className="position-relative bg-light d-flex align-items-center justify-content-center product-img-wrap">
          <button
            className={`position-absolute top-0 end-0 m-2 btn btn-sm rounded-circle ${inWishlist ? "btn-danger" : "btn-light"}`}
            onClick={() => toggleWishlist(product)}
          >
            ♡
          </button>
          <img src={product.image} alt={product.title} className="img-fluid" style={{ maxHeight: "85%" }} />
        </div>
        <div className="card-body px-1">
          <p className="text-muted text-uppercase small mb-1">{product.gender} {product.subCategory}</p>
          <p className="mb-1 text-truncate">{product.title}</p>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <p className="fw-bold mb-0">₹{product.priceINR}</p>
            <span className="badge bg-success">★ {product.rating.rate}</span>
          </div>

          {outOfStock ? (
            <p className="text-danger small mb-2">Out of stock</p>
          ) : (
            <select
              className="form-select form-select-sm mb-2"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              {product.sizes.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          )}

          <div className="d-flex gap-1">
            <button
              className="btn btn-sm btn-outline-dark flex-fill"
              onClick={handleAddToCart}
              disabled={outOfStock}
            >
              Add to Cart
            </button>
            <button
              className="btn btn-sm btn-dark flex-fill"
              onClick={handleBuyNow}
              disabled={outOfStock}
            >
              Buy Now
            </button>
          </div>

          {message && <p className="small text-success mt-1 mb-0">{message}</p>}
        </div>
      </div>
    </div>
  );
}
