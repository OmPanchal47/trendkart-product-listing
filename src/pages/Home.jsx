import { useEffect, useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import Filters from "../components/Filters";
import ProductCard from "../components/ProductCard";
import { enrichProduct } from "../utils/productMeta";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    size: [],
    gender: [],
    category: [],
    color: [],
  });

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.map(enrichProduct));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (filters.gender.length && !filters.gender.includes(p.gender)) return false;
      if (filters.category.length && !filters.category.includes(p.subCategory)) return false;
      if (filters.color.length && !filters.color.includes(p.color.name)) return false;
      if (filters.size.length && !p.sizes.some((s) => filters.size.includes(s))) return false;
      return true;
    });
  }, [products, search, filters]);

  return (
    <>
      <Navbar search={search} setSearch={setSearch} />
      <div className="page-wrap">
        <div className="row">
          <div className="col-lg-3">
            <Filters filters={filters} setFilters={setFilters} products={products} />
          </div>
          <div className="col-lg-9">
            <div className="listing-head">
              <div>
                <p className="crumb">Home / Men's shirt</p>
                <h5>Men's shirt <span>- {filtered.length} items</span></h5>
              </div>
            </div>
            {loading && <p>Loading products...</p>}
            {!loading && filtered.length === 0 && (
              <p className="text-muted">No products match your filters.</p>
            )}
            <div className="row">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
