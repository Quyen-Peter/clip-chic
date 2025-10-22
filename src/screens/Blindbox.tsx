import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "../component/Header";
import SidebarBlindbox, {
  BlindboxFilterQuery,
} from "../component/SidebarBlindbox";
import Footer from "../component/Footer";
import { Link, useNavigate } from "react-router-dom";
import "../css/BlindBox.css";
import cart from "../assest/shoppingCart.png";
import { fetchBlindBoxes, BlindBoxListItem } from "../services/blindBoxService";
import { flyToCart } from "../services/flyToCart";
const API_URL = process.env.REACT_APP_HOST_API;

type QueryBlindbox = {
  top: "best" | "new" | null;
  collectionId: number | null;
  search?: string;
};
const formatVND = (n: number) => `${n.toLocaleString("vi-VN")}`;

const Blindbox = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState<QueryBlindbox>({
    top: null,
    collectionId: null,
    search: "",
  });

  const handleChange = useCallback((filters: BlindboxFilterQuery) => {
    setQuery((prev) => ({
      ...prev,
      top: filters.top,
      collectionId: filters.collectionId,
    }));
  }, []);

  const [blindBox, setBlindBox] = useState<BlindBoxListItem[]>([]);
  useEffect(() => {
    const loadBlindBoxes = async () => {
      try {
        const data = await fetchBlindBoxes();
        setBlindBox(data);
      } catch (e) {
        console.error("Fetch blindboxes failed:", e);
      }
    };
    loadBlindBoxes();
  }, []);

  const filterBlindbox = useMemo(() => {
    return blindBox.filter((p) => {
      if (
        query.collectionId !== null &&
        p.collectionId !== query.collectionId
      ) {
        return false;
      }
      if (
        query.search &&
        !p.name.toLowerCase().includes(query.search.toLowerCase())
      )
        return false;
      return true;
    });
  }, [query, blindBox]);

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
      const url = `${API_URL}/api/Order/add-blindbox-detail?blindBoxId=${productId}&quantity=${quantity}&price=${price}`;
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

  return (
    <div className="blindbox-page">
      <header className="blindbox-site-header">
        <Header />
      </header>

      <div className="blindbox-page-body">
        <div className="blindbox-sidebar-wrapper">
          <SidebarBlindbox onChange={handleChange} />
        </div>

        <main className="blindbox-content">
          <span className="blindbox-count">
            {filterBlindbox.length} Sản phẩm
          </span>
          <div className="blindbox-list">
            {filterBlindbox.map((item) => (
              <div key={item.id} className="blindbox-item">
                <Link
                  to={`/blindboxDetail/${item.id}`}
                  className="bindbox-link"
                >
                  <div className="img-blindbox-container">
                    <img
                      src={item.image || "https://via.placeholder.com/300"}
                      alt={item.name}
                      className="img-blindbox"
                    />
                  </div>

                  <div className="bindbox-info">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    {item.collectionName && (
                      <p className="blindbox-collection">
                        {item.collectionName}
                      </p>
                    )}
                    <h4>{formatVND(item.price)} VND</h4>
                  </div>
                </Link>

                <button
                  className="btn-buy-blindbox"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddOrderDetail(
                      e,
                      item.id,
                      1,
                      item.price,
                      item.image ?? ""
                    );
                  }}
                >
                  <img
                    src={cart}
                    className="btn-buy-blindbox-img"
                    alt="Add to cart"
                  />
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* <footer className="site-footer">
        <Footer />
      </footer> */}
    </div>
  );
};

export default Blindbox;
