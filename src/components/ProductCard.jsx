export default function ProductCard({ product }) {
  return (
    <div className="col-6 col-md-4 col-lg-3 mb-4">
      <div className="card h-100 border-0">
        <div className="position-relative bg-light d-flex align-items-center justify-content-center product-img-wrap">
          <button className="position-absolute top-0 end-0 m-2 btn btn-sm btn-light rounded-circle">♡</button>
          <img src={product.image} alt={product.title} className="img-fluid" style={{ maxHeight: "85%" }} />
        </div>
        <div className="card-body px-1">
          <p className="text-muted text-uppercase small mb-1">{product.gender} {product.subCategory}</p>
          <p className="mb-1 text-truncate">{product.title}</p>
          <div className="d-flex justify-content-between align-items-center">
            <p className="fw-bold mb-0">₹{product.priceINR}</p>
            <span className="badge bg-success">★ {product.rating.rate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
