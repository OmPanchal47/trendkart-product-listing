// FakeStoreAPI doesn't give us size/color/gender/sub-category,
// so we derive them from title + category + id.
// Not perfect but good enough for filtering demo.

const SIZE_POOL = ["XS", "S", "M", "L", "XL", "XXL"];
const COLOR_POOL = [
  { name: "Black", hex: "#111111" },
  { name: "White", hex: "#f5f5f5" },
  { name: "Navy", hex: "#1b2a4a" },
  { name: "Red", hex: "#c0392b" },
  { name: "Olive", hex: "#6b7a3a" },
  { name: "Grey", hex: "#8a8a8a" },
];

function pickCategory(title) {
  const t = title.toLowerCase();
  if (t.includes("t-shirt") || t.includes("tee") || t.includes("shirt") && t.includes("casual"))
    return "T-Shirts";
  if (t.includes("shirt")) return "Shirts";
  if (t.includes("jean") || t.includes("denim")) return "Jeans";
  if (t.includes("hoodie") || t.includes("jacket")) return "Hoodies";
  return "Other";
}

function pickGender(apiCategory) {
  if (apiCategory === "men's clothing") return "Men";
  if (apiCategory === "women's clothing") return "Women";
  return "Unisex";
}

const FIT_TAGS = ["RELAXED FIT", "OVERSIZED FIT", "BOXY FIT", "REGULAR FIT", "SLIM FIT"];

export function enrichProduct(p) {
  // simple deterministic spread so same product always gets same sizes/color
  const sizeStart = p.id % SIZE_POOL.length;
  const sizes = [
    SIZE_POOL[sizeStart],
    SIZE_POOL[(sizeStart + 1) % SIZE_POOL.length],
    SIZE_POOL[(sizeStart + 2) % SIZE_POOL.length],
  ];
  const color = COLOR_POOL[p.id % COLOR_POOL.length];
  const fitTag = FIT_TAGS[p.id % FIT_TAGS.length];
  const priceINR = Math.round(p.price * 83);

  // fake stock number, 0 means out of stock - used for add to cart validation
  const stock = (p.id * 7) % 11;

  return {
    ...p,
    gender: pickGender(p.category),
    subCategory: pickCategory(p.title),
    sizes,
    color,
    fitTag,
    priceINR,
    stock,
  };
}
