import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="page-wrap text-center py-5">
        <h4>Your cart is empty</h4>
        <p className="text-muted">Looks like you haven't added anything yet.</p>
        <Link to="/" className="btn btn-dark mt-2">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="page-wrap">
      <h4 className="mb-4">Your Cart</h4>

      {cart.map((item) => (
        <div
          className="d-flex align-items-center border-bottom py-3 gap-3"
          key={`${item.id}-${item.size}-${item.color}`}
        >
          <img src={item.image} alt={item.title} style={{ width: "70px", height: "70px", objectFit: "contain" }} />
          <div className="flex-grow-1">
            <p className="mb-1 fw-bold">{item.title}</p>
            <p className="mb-1 small text-muted">Size: {item.size} | Color: {item.color}</p>
            <div className="d-flex align-items-center gap-2">
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => updateQuantity(item.id, item.size, item.color, item.qty - 1)}
              >
                -
              </button>
              <span>{item.qty}</span>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => updateQuantity(item.id, item.size, item.color, item.qty + 1)}
              >
                +
              </button>
            </div>
          </div>
          <div className="text-end">
            <p className="fw-bold mb-1">₹{item.priceINR * item.qty}</p>
            <button
              className="btn btn-sm btn-link text-danger p-0"
              onClick={() => removeFromCart(item.id, item.size, item.color)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="d-flex justify-content-between align-items-center mt-4">
        <h5 className="mb-0">Subtotal: ₹{cartTotal}</h5>
        <button className="btn btn-dark px-4">Checkout</button>
      </div>
    </div>
  );
}
