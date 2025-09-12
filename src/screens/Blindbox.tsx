import { useEffect, useMemo, useState } from "react";
import Header from "../component/Header";
import SidebarBlindbox from "../component/SidebarBlindbox";
import { Link } from "react-router-dom";
import "../css/BlindBox.css";
import cart from "../assest/shoppingCart.png";

type blindBox = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  currency: string;
  coverImage: string;
  gallery: string[];
  stock: number;
  maxPerOrder: number;
  releaseDate: string;
  status: "active" | "inactive";
  bestSeller: boolean;
  newArrival: boolean;
  collection: string;
};



type QueryBlindbox = {
  top: "best" | "new" | null;
  collection: string | null;
  search?: string | null;
};

const formatVND = (n: number) => `${n.toLocaleString("vi-VN")}`;

const Blindbox = () => {
  const [query, setQuery] = useState<QueryBlindbox>({
    top: null,
    collection: null,
    search: null,
  });

  const handleChange = (q: QueryBlindbox) => {
    setQuery(q);
    console.log("query:", q);
  };

  const [blindBox, setBlindBox] = useState<blindBox[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/blindbox.json");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: blindBox[] = await res.json();
        setBlindBox(data);
      } catch (e) {
        console.error("Fetch products failed:", e);
      }
    };
    fetchProducts();
  }, []);

  const filterBlindbox = useMemo(() => {
    return blindBox.filter((p) => {
      if (query.top === "best" && !p.bestSeller) return false;
      if (query.top === "new" && !p.newArrival) return false;
      if (
        query.collection &&
        p.collection.toLowerCase() !== query.collection.toLowerCase()
      )
        return false;
      return true;
    });
  }, [query, blindBox]);

  return (
    <div>
      <div className="header-bindbox">
        <Header />
      </div>
      <div className="main-bindbox-container">
        <div className="sidebar-bindbox">
          <SidebarBlindbox onChange={handleChange} />
        </div>
        <div className="bindbox-container">
          <a className="blindbox-count">{filterBlindbox.length} products</a>
          
          {filterBlindbox.map((item) => (
            <div key={item.id} className="bindbox-item">
              <Link to={`/products/${item.id}`} className="bindbox-link">
                <div className="img-blindbox-container">
                  <img
                    src={item.coverImage}
                    alt={item.coverImage}
                    className="img-blindbox"
                  />
                </div>

                <div className="bindbox-info">
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                  <p>{item.description}</p>
                  <p>{item.slug}</p>
                  <h4>{formatVND(item.price)} VND</h4>
                </div>
                <button className="btn-buy-blindbox">
                  <img src={cart} className="btn-buy-blindbox-img"/>
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blindbox;
