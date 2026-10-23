export default function ProductCard({ product }) {
  return (
    <div className="col-6 col-md-4 col-lg-3 mb-4">
      <div className="product-card">
        <div className="product-img-wrap">
          <span className="fit-badge">{product.fitTag}</span>
          <button className="wish-btn">♡</button>
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-info">
          <p className="brand-line">{product.gender} {product.subCategory}</p>
          <p className="product-name">{product.title}</p>
          <p className="price-line">₹{product.priceINR}</p>
        </div>
      </div>
    </div>
  );
}
