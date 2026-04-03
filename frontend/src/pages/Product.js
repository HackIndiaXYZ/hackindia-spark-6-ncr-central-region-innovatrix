import { useEffect, useState } from "react";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
  try {
    let url = "https://fakestoreapi.com/products";

    if (category !== "all") {
      url = `https://fakestoreapi.com/products/category/${category}`;
    }

    const res = await fetch(url);
    const data = await res.json();
    setProducts(data);

  } catch (error) {
    console.log("API failed, using fallback data");

    // 🔥 fallback data (VERY IMPORTANT)
    const dummy = [
      {
        id: 1,
        title: "Smartphone",
        price: 15000,
        image: "https://source.unsplash.com/200x200/?phone",
        rating: { rate: 4.5 }
      },
      {
        id: 2,
        title: "Shoes",
        price: 2000,
        image: "https://source.unsplash.com/200x200/?shoes",
        rating: { rate: 4.2 }
      },
      {
        id: 3,
        title: "Laptop",
        price: 50000,
        image: "https://source.unsplash.com/200x200/?laptop",
        rating: { rate: 4.7 }
      }
    ];

    setProducts(dummy);
  }
};

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={container}>
      <h1>🛍️ E-commerce Store</h1>

      {/* SEARCH */}
      <input
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={inputStyle}
      />

      {/* CATEGORIES */}
      <div style={categoryBox}>
        {["all", "electronics", "jewelery", "men's clothing", "women's clothing"].map((c) => (
          <button key={c} onClick={() => setCategory(c)} style={btn}>
            {c}
          </button>
        ))}
      </div>

      {/* PRODUCTS */}
      <div style={grid}>
        {filteredProducts.map((p) => (
          <div key={p.id} style={card}>
            <img src={p.image} alt="" style={img} />
            <h4>{p.title.substring(0, 40)}...</h4>
            <p>💰 ₹{(p.price * 80).toFixed(0)}</p>
            <p>⭐ {p.rating.rate}</p>

            <button onClick={() => setCart([...cart, p])} style={cartBtn}>
              Add to Cart 🛒
            </button>

            <button onClick={() => setWishlist([...wishlist, p])} style={wishBtn}>
              ❤️ Wishlist
            </button>
          </div>
        ))}
      </div>

      {/* CART COUNT */}
      <h3>🛒 Cart Items: {cart.length}</h3>
      <h3>❤️ Wishlist: {wishlist.length}</h3>
    </div>
  );
}

// styles
const container = {
  background: "#0f172a",
  color: "white",
  minHeight: "100vh",
  padding: "20px"
};

const inputStyle = {
  padding: "10px",
  width: "300px",
  borderRadius: "10px",
  border: "none"
};

const categoryBox = {
  margin: "20px 0",
  display: "flex",
  gap: "10px",
  flexWrap: "wrap"
};

const btn = {
  padding: "8px 15px",
  background: "#6366f1",
  border: "none",
  borderRadius: "10px",
  color: "white",
  cursor: "pointer"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "20px"
};

const card = {
  background: "#1e293b",
  padding: "10px",
  borderRadius: "10px"
};

const img = {
  width: "100%",
  height: "150px",
  objectFit: "contain"
};

const cartBtn = {
  marginTop: "5px",
  padding: "5px",
  background: "green",
  border: "none",
  borderRadius: "5px",
  color: "white"
};

const wishBtn = {
  marginTop: "5px",
  padding: "5px",
  background: "pink",
  border: "none",
  borderRadius: "5px"
};