import React, { useEffect, useState } from "react";

function App() {
  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔗 Replace with your Render backend URL
  const API_BASE = "https://YOUR-BACKEND-NAME.onrender.com/api";

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/vendors`).then((res) => res.json()),
      fetch(`${API_BASE}/products`).then((res) => res.json()),
    ])
      .then(([vendorsData, productsData]) => {
        setVendors(vendorsData);
        setProducts(productsData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🛍️ Multivendor Store</h1>

      <h2>🏪 Vendors</h2>
      <ul>
        {vendors.map((v, i) => (
          <li key={i}>
            <b>{v.name}</b> — {v.description || "No description"}
          </li>
        ))}
      </ul>

      <h2>🔥 Products</h2>
      <ul>
        {products.map((p, i) => (
          <li key={i}>
            <b>{p.name}</b> — ₹{p.price}{" "}
            {p.vendor?.name ? `by ${p.vendor.name}` : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
