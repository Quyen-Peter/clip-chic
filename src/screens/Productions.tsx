import Sidebar from "../component/Sidebar";
import Header from "../component/Header";
import Footer from "../component/Footer";
import "../css/Productions.css";
import { useMemo, useState, useEffect } from "react";
import cart from "../assest/shoppingCart.png";


type Product = {
  id: string;
  name: string;
  price: number;
  color: string;
  collection: string;
  bestSeller: boolean;
  newArrival: boolean;
  image: string;
};

type Query = {
  top: "best" | "new" | null;
  collection: string | null;
  color: string | null;
  price: string | null;
  search?: string | null;
};

const formatVND = (n: number) => `${n.toLocaleString("vi-VN")}`;


function matchPrice(price: number, filter: string) {
  const f = filter.replace(/\s/g, "").toLowerCase();
  // khoảng: 100k-150k
  const m = f.match(/^(\d+)\s*-\s*(\d+)k?$/);
  if (m) {
    const a = parseInt(m[1], 10) * 1000;
    const b = parseInt(m[2], 10) * 1000;
    return price >= a && price <= b;
  }
  // >=150k, >150k, 150+
  if (f.startsWith(">=") || f.endsWith("+")) {
    const n = parseInt(f.replace(/[^\d]/g, ""), 10) * 1000;
    return price >= n;
  }
  // <=100k, under100k
  if (f.startsWith("<=") || f.startsWith("under")) {
    const n = parseInt(f.replace(/[^\d]/g, ""), 10) * 1000;
    return price <= n;
  }
  // số đơn lẻ: 119k
  const exact = parseInt(f.replace(/[^\d]/g, ""), 10);
  if (!Number.isNaN(exact)) return price === exact * 1000;

  return true;
}

const Productions = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/products.json");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (e) {
        console.error("Fetch products failed:", e);
      }
    };
    fetchProducts();
  }, []);

  const [query, setQuery] = useState<Query>({
    top: null,
    collection: null,
    color: null,
    price: null,
    search: null,
  });

  const handleChange = (q: Query) => {
    setQuery(q);
    console.log("query:", q);
  };

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (query.top === "best" && !p.bestSeller) return false;
      if (query.top === "new" && !p.newArrival) return false;
      if (
        query.collection &&
        p.collection.toLowerCase() !== query.collection.toLowerCase()
      )
        return false;
      if (query.color && p.color.toLowerCase() !== query.color.toLowerCase())
        return false;
      if (query.price && !matchPrice(p.price, query.price)) return false;
      if (
        query.search &&
        !p.name.toLowerCase().includes(query.search.toLowerCase())
      )
        return false;
      return true;
    });
  }, [query, products]);

  return (
    <div className="page">
      <header className="site-header">
        <Header />
      </header>

      <div className="page-body">
        <div>
          <aside className="sidebar">
            <Sidebar onChange={handleChange} />
          </aside>
        </div>

        <div>
          <main className="content">
            <a className="products-count">{filtered.length} products</a>

            <div className="products-grid">
              {filtered.map((p) => (
                <article key={p.id} className="production">
                  <div className="production-thumb">
                    <img src={p.image} alt={p.name} />
                  </div>
                  <div className="production-sub">
                    <p className="production-title">
                      <a className="collection">{p.collection}</a>
                      <a className="name-product"> - {p.name}</a>
                    </p>
                  </div>
                  <div className="buttom-production">
                    <div className="production-price">
                      {formatVND(p.price)} <span className="currency">vnd</span>
                    </div>
                    <button className="production-cart" aria-label="Add to cart">
                      <img src={cart} />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="empty">No suitable products found!</div>
            )}

            {filtered.length > 0 && (
              <div className="view-more">
                <button>View more</button>
              </div>
            )}
          </main>
        </div>
      </div>

      <footer className="site-footer">
        <Footer />
      </footer>
    </div>
  );
};

export default Productions;
