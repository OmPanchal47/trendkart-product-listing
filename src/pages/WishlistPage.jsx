import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="page-wrap text-center py-5">
        <h4>Your wishlist is empty</h4>
        <p className="text-muted">Save items you like so you can find them later.</p>
        <Link to="/" className="btn btn-dark mt-2">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="page-wrap">
      <h4 className="mb-4">Your Wishlist</h4>
      <div className="row">
        {wishlist.map((item) => (
          <div className="col-6 col-md-4 col-lg-3 mb-4" key={item.id}>
            <div className="card h-100 border-0">
              <div className="bg-light d-flex align-items-center justify-content-center product-img-wrap">
                <img src={item.image} alt={item.title} className="img-fluid" style={{ maxHeight: "85%" }} />
              </div>
              <div className="card-body px-1">
                <p className="mb-1 text-truncate">{item.title}</p>
                <p className="fw-bold mb-2">₹{item.priceINR}</p>
                <button
                  className="btn btn-sm btn-outline-danger w-100"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
