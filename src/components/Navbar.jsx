import { Link } from "react-router-dom";

export default function Navbar({ search, setSearch }) {
  return (
    <header className="site-header">
      <div className="header-row">
        <div className="header-left">
          <button className="icon-btn menu-btn">
            <span></span><span></span><span></span>
          </button>
          <nav className="nav-links d-none d-md-flex">
            <Link to="/" className="nav-link active">MEN</Link>
            <Link to="/" className="nav-link">WOMEN</Link>
            <Link to="/" className="nav-link">ACCESSORIES</Link>
          </nav>
        </div>

        <Link to="/" className="brand">
          URBAN<span>CRATE</span>
        </Link>

        <div className="header-right">
          <div className="search-wrap d-none d-sm-flex">
            <input
              type="text"
              placeholder="What are you looking for?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <i className="bi bi-search"></i>
          </div>
          <button className="icon-btn">♡</button>
          <button className="icon-btn">🛒</button>
        </div>
      </div>
      <div className="search-wrap d-flex d-sm-none mobile-search">
        <input
          type="text"
          placeholder="What are you looking for?"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </header>
  );
}
