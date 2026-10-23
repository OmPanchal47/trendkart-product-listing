const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const GENDERS = ["Men", "Women", "Unisex"];
const CATEGORIES = ["T-Shirts", "Shirts", "Jeans", "Hoodies", "Other"];
const COLORS = ["Black", "White", "Navy", "Red", "Olive", "Grey"];

export default function Filters({ filters, setFilters, products }) {
  function toggle(group, value) {
    setFilters((prev) => {
      const current = prev[group];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [group]: next };
    });
  }

  function clearAll() {
    setFilters({ size: [], gender: [], category: [], color: [] });
  }

  function countFor(group, value) {
    return products.filter((p) => {
      if (group === "gender") return p.gender === value;
      if (group === "category") return p.subCategory === value;
      if (group === "color") return p.color.name === value;
      if (group === "size") return p.sizes.includes(value);
      return false;
    }).length;
  }

  return (
    <div className="filters-box">
      <div className="filters-head">
        <h6>FILTERS</h6>
        <button onClick={clearAll}>Clear all</button>
      </div>

      <div className="filter-group">
        <p className="filter-label">GENDER</p>
        {GENDERS.map((g) => (
          <label className="filter-row" key={g}>
            <span>
              <input
                type="checkbox"
                checked={filters.gender.includes(g)}
                onChange={() => toggle("gender", g)}
              />
              {g}
            </span>
            <small>{countFor("gender", g)}</small>
          </label>
        ))}
      </div>

      <div className="filter-group">
        <p className="filter-label">CATEGORY</p>
        {CATEGORIES.map((c) => (
          <label className="filter-row" key={c}>
            <span>
              <input
                type="checkbox"
                checked={filters.category.includes(c)}
                onChange={() => toggle("category", c)}
              />
              {c}
            </span>
            <small>{countFor("category", c)}</small>
          </label>
        ))}
      </div>

      <div className="filter-group">
        <p className="filter-label">SIZE</p>
        <div className="size-grid">
          {SIZES.map((s) => (
            <button
              key={s}
              className={`size-btn ${filters.size.includes(s) ? "active" : ""}`}
              onClick={() => toggle("size", s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <p className="filter-label">COLOR</p>
        {COLORS.map((c) => (
          <label className="filter-row" key={c}>
            <span>
              <input
                type="checkbox"
                checked={filters.color.includes(c)}
                onChange={() => toggle("color", c)}
              />
              {c}
            </span>
            <small>{countFor("color", c)}</small>
          </label>
        ))}
      </div>
    </div>
  );
}
