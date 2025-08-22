import Sidebar from "../component/Sidebar";
import Header from "../component/Header";
import Footer from "../component/Footer";
import "../css/Productions.css";
import { useMemo, useState } from "react";
import cart from "../assest/shoppingCart.png";

const products = [
  {
    id: "P001",
    name: "Cherry Cream - Light blue clip decorated with cream and red cherry charmsCherry Cream - Light blue clip decorated with cream and red cherry charms",
    price: 99000,
    color: "Pink",
    collection: "Best Sellers",
    bestSeller: true,
    newArrival: false,
    image: "https://picsum.photos/seed/clip01/600/600",
  },
  {
    id: "P002",
    name: "Chic Claw Clip — Deep Blue",
    price: 109000,
    color: "Blue",
    collection: "Best Sellers",
    bestSeller: true,
    newArrival: false,
    image: "https://picsum.photos/seed/clip02/600/600",
  },
  {
    id: "P003",
    name: "Chic Mini — Mint Green",
    price: 79000,
    color: "Green",
    collection: "New Arrivals",
    bestSeller: false,
    newArrival: true,
    image: "https://picsum.photos/seed/clip03/600/600",
  },
  {
    id: "P004",
    name: "Twist Banana — Lavender",
    price: 129000,
    color: "Lavender",
    collection: "Classic",
    bestSeller: false,
    newArrival: false,
    image: "https://picsum.photos/seed/clip04/600/600",
  },
  {
    id: "P005",
    name: "Glossy Claw — Sunshine",
    price: 119000,
    color: "Yellow",
    collection: "Summer",
    bestSeller: false,
    newArrival: false,
    image: "https://picsum.photos/seed/clip05/600/600",
  },
  {
    id: "P006",
    name: "Marble Claw — Ocean Teal",
    price: 139000,
    color: "Teal",
    collection: "Best Sellers",
    bestSeller: true,
    newArrival: false,
    image: "https://picsum.photos/seed/clip06/600/600",
  },
  {
    id: "P007",
    name: "Mini Duo Pack — Coral & Pink",
    price: 129000,
    color: "Coral",
    collection: "New Arrivals",
    bestSeller: false,
    newArrival: true,
    image: "https://picsum.photos/seed/clip07/600/600",
  },
  {
    id: "P008",
    name: "Slim Hairpin — Pearl White",
    price: 59000,
    color: "White",
    collection: "Classic",
    bestSeller: false,
    newArrival: false,
    image: "https://picsum.photos/seed/clip08/600/600",
  },
  {
    id: "P009",
    name: "Oversize Claw — Midnight",
    price: 149000,
    color: "Black",
    collection: "Best Sellers",
    bestSeller: true,
    newArrival: false,
    image: "https://picsum.photos/seed/clip09/600/600",
  },
  {
    id: "P010",
    name: "Curved Claw — Grape Purple",
    price: 99000,
    color: "Purple",
    collection: "Summer",
    bestSeller: false,
    newArrival: false,
    image: "https://picsum.photos/seed/clip10/600/600",
  },
  {
    id: "P011",
    name: "Pearl Chain Hairpin",
    price: 89000,
    color: "White",
    collection: "Classic",
    bestSeller: false,
    newArrival: false,
    image: "https://picsum.photos/seed/clip11/600/600",
  },
  {
    id: "P012",
    name: "Matte Mini — Forest",
    price: 79000,
    color: "Green",
    collection: "New Arrivals",
    bestSeller: false,
    newArrival: true,
    image: "https://picsum.photos/seed/clip12/600/600",
  },
  {
    id: "P013",
    name: "Crystal Claw — Sky Blue",
    price: 119000,
    color: "Blue",
    collection: "Summer",
    bestSeller: false,
    newArrival: false,
    image: "https://picsum.photos/seed/clip13/600/600",
  },
  {
    id: "P014",
    name: "Ribbon Scrunchie — Coral",
    price: 69000,
    color: "Coral",
    collection: "Classic",
    bestSeller: false,
    newArrival: false,
    image: "https://picsum.photos/seed/clip14/600/600",
  },
  {
    id: "P015",
    name: "Arc Clip — Pearl Pink",
    price: 109000,
    color: "Pink",
    collection: "Best Sellers",
    bestSeller: true,
    newArrival: false,
    image: "https://picsum.photos/seed/clip15/600/600",
  },
  {
    id: "P016",
    name: "Wave Claw — Teal",
    price: 129000,
    color: "Teal",
    collection: "New Arrivals",
    bestSeller: false,
    newArrival: true,
    image: "https://picsum.photos/seed/clip16/600/600",
  },
  {
    id: "P017",
    name: "Matte Banana — Black",
    price: 99000,
    color: "Black",
    collection: "Classic",
    bestSeller: false,
    newArrival: false,
    image: "https://picsum.photos/seed/clip17/600/600",
  },
  {
    id: "P018",
    name: "Mini Set — Pastel 4pcs",
    price: 149000,
    color: "Lavender",
    collection: "Summer",
    bestSeller: false,
    newArrival: false,
    image: "https://picsum.photos/seed/clip18/600/600",
  },
  {
    id: "P019",
    name: "Gem Hairpin — Royal Blue",
    price: 89000,
    color: "Blue",
    collection: "Classic",
    bestSeller: false,
    newArrival: false,
    image: "https://picsum.photos/seed/clip19/600/600",
  },
  {
    id: "P020",
    name: "Floral Claw — Pink Blossom",
    price: 119000,
    color: "Pink",
    collection: "New Arrivals",
    bestSeller: false,
    newArrival: true,
    image: "https://picsum.photos/seed/clip20/600/600",
  },
];

// Sidebar sẽ gọi onChange với object dạng này:
type Query = {
  top: "best" | "new" | null;
  collection: string | null;
  color: string | null;
  price: string | null; // ví dụ "<=100k", "100-150k", ">=150k", "150+"
};

const formatVND = (n: number) => `${n.toLocaleString("vi-VN")}`;

// Parser đơn giản cho filter giá
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

  return true; // không nhận ra filter => pass
}

const Productions = () => {

  
  const [query, setQuery] = useState<Query>({
    top: null,
    collection: null,
    color: null,
    price: null,
  });

  const handleChange = (q: Query) => {
    setQuery(q); // cập nhật UI
    console.log("query:", q); // log ra console để test
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
      return true;
    });
  }, [query]);

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
        {/* <main className="content"></main> */}

        <div>
          <main className="content">
            <div className="products-grid">
              {filtered.map((p) => (
                <article key={p.id} className="card">
                  <div className="card-thumb">
                    <img src={p.image} alt={p.name} />
                  </div>
                  <div className="card-sub">
                      {/* <h4> · {p.color}</h4> */} 
                      <p className="card-title"><a className="collection">{p.collection}</a> <a>- {p.name}</a></p>
                  </div>
                  <div className="buttom-cart">
                    <div className="card-price">
                      {formatVND(p.price)} <span className="currency">vnd</span>
                    </div>
                    <button className="card-cart" aria-label="Add to cart">
                      <img src={cart} />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="empty">Không có sản phẩm phù hợp.</div>
            )}

            <div className="view-more">
              <button>View more</button>
            </div>
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
