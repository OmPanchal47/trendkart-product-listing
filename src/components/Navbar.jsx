import { Link } from "react-router-dom";

export default function Navbar({ search, setSearch }) {
  return (
    <nav className="navbar navbar-light bg-white border-bottom sticky-top px-3 py-2">
      <div className="d-flex align-items-center justify-content-between w-100">
        <div className="d-flex align-items-center gap-4">
          <button className="btn border-0">
            <i className="bi bi-list fs-4"></i>☰
          </button>
          <div className="d-none d-md-flex gap-4">
            <Link to="/" className="nav-link fw-bold text-primary">MEN</Link>
            <Link to="/" className="nav-link fw-bold text-dark">WOMEN</Link>
            <Link to="/" className="nav-link fw-bold text-dark">ACCESSORIES</Link>
          </div>
        </div>

        <Link to="/" className="navbar-brand fw-bold fs-4 text-primary mb-0">
          TREND<span className="text-dark">KART</span>
        </Link>

        <div className="d-flex align-items-center gap-3">
          <input
            type="text"
            className="form-control rounded-pill d-none d-sm-block"
            style={{ width: "260px" }}
            placeholder="What are you looking for?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn border-0 fs-5">♡</button>
          <button className="btn border-0 fs-5">🛒</button>
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
