import Sidebar, { ProductFilterQuery } from "../component/Sidebar";
import Header from "../component/Header";
import Footer from "../component/Footer";
import "../css/Productions.css";
import { useMemo, useState, useEffect, useCallback } from "react";
import cart from "../assest/shoppingCart.png";
import { Link, useNavigate } from "react-router-dom";
import { fetchProducts, ProductListItem } from "../services/productService";
import { fetchTopProducts, TopSalesItem } from "../services/orderService";
import { flyToCart } from "../services/flyToCart";

const API_URL = process.env.REACT_APP_HOST_API;

type Query = {
  top: "best" | "new" | null;
  collectionId: number | null;
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
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [topProducts, setTopProducts] = useState<TopSalesItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [productsData, topProductsData] = await Promise.all([
          fetchProducts(),
          fetchTopProducts().catch(() => [])
        ]);
        if (isMounted) {
          setProducts(productsData);
          setTopProducts(topProductsData);
        }
      } catch (err) {
        if (isMounted) {
          const message =
            err instanceof Error ? err.message : "Unable to load products.";
          setError(message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const [query, setQuery] = useState<Query>({
    top: null,
    collectionId: null,
    color: null,
    price: null,
    search: null,
  });

  const handleChange = useCallback((q: ProductFilterQuery) => {
    setQuery((prev) => ({
      ...prev,
      top: q.top,
      collectionId: q.collectionId,
      color: q.color,
      price: q.price,
    }));
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (query.top === "best") {
        if (!topProducts.some(tp => tp.id === p.id)) return false;
      }
      if (
        query.collectionId !== null &&
        p.collectionId !== query.collectionId
      ) {
        return false;
      }
      if (query.price && !matchPrice(p.price, query.price)) return false;
      if (
        query.search &&
        !p.title.toLowerCase().includes(query.search.toLowerCase())
      )
        return false;
      return true;
    });
  }, [query, products, topProducts]);

  const handleAddOrderDetail = async (
    e: React.MouseEvent<HTMLButtonElement>,
    productId: number,
    quantity: number,
    price: number,
    img: string
  ) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        navigate("/Account/Login");
        return;
      }

      const url = `${API_URL}/api/Order/add-detail?productId=${productId}&quantity=${quantity}&price=${price}`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error(`Lỗi HTTP: ${res.status}`);
      const data = await res.json();
      flyToCart(e.nativeEvent as MouseEvent, img);
    } catch (error) {
      console.error("❌ Lỗi khi thêm chi tiết đơn hàng:", error);
    }
  };

  const isTopProduct = useCallback((productId: number) => {
    return topProducts.some(tp => tp.id === productId);
  }, [topProducts]);

  console.log("Product", products)

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
            <a className="products-count">{filtered.length} Sản phẩm</a>

            <div className="products-grid">
              {filtered.map((p) => (
                <article key={p.id} className={`production ${isTopProduct(p.id) ? 'top-seller' : ''}`}>
                  {isTopProduct(p.id) && (
                    <div className="top-seller-badge">🔥</div>
                  )}
                  <Link
                    to={`/productdetail/${p.id}`}
                    key={p.id}
                    className="link-product"
                  >
                    <div className="production-thumb">
                      <img src={p.image} alt={p.title} />
                    </div>
                    <div className="production-sub">
                      <p className="production-title">
                        <a className="collection">{p.collectionName}</a>
                        <a className="name-product"> - {p.title}</a>
                      </p>
                    </div>
                    <div className="buttom-production">
                      <div className="production-price">
                        {formatVND(p.price)}{" "}
                        <span className="currency">vnd</span>
                      </div>
                      <button
                        className="production-cart"
                        aria-label="Add to cart"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAddOrderDetail(
                            e,
                            p.id,
                            1,
                            p.price,
                            p.image ?? ""
                          );
                        }}
                      >
                        <img src={cart} alt="Add to cart" />
                      </button>
                    </div>
                  </Link>
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

      {/* <footer className="site-footer">
        <Footer />
      </footer> */}
    </div>
  );
};

export default Productions;
