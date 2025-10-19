import "../css/Sidebar.css";
import { useEffect, useState } from "react";
import iconRight from "../assest/IconRightWhile.png";
import iconDown from "../assest/IconRightDown.png";
import BackgroundNavbar from "../assest/backgroundNavbar.png";
import {
  fetchCollections,
  CollectionSummary,
} from "../services/collectionService";

type TopFilter = "best" | "new" | null;

export type ProductFilterQuery = {
  top: TopFilter;
  collectionId: number | null;
  color: string | null;
  price: string | null;
};

interface SidebarProps {
  onChange?: (query: ProductFilterQuery) => void;
}

const colorOptions = [
  "Trắng",
  "Hồng",
  "Xanh nhạt",
  "Xanh đậm",
  "Xanh lá nhạt",
  "Xanh lá đậm",
  "Đỏ",
  "Vàng",
  "Tím",
];

const priceOptions = [
  { value: "under-100k", label: "Dưới 100.000 VND" },
  { value: "100k-200k", label: "100.000 - 200.000 VND" },
  { value: ">=200k", label: "Từ 200.000 VND" },
];

const Sidebar = ({ onChange }: SidebarProps) => {
  const [showCollection, setShowCollection] = useState(true);
  const [showColor, setShowColor] = useState(true);
  const [showPrice, setShowPrice] = useState(true);

  const [top, setTop] = useState<TopFilter>(null);
  const [collectionId, setCollectionId] = useState<number | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [price, setPrice] = useState<string | null>(null);

  const [collections, setCollections] = useState<CollectionSummary[]>([]);
  const [isLoadingCollections, setIsLoadingCollections] = useState(false);
  const [collectionsError, setCollectionsError] = useState<string | null>(null);

  useEffect(() => {
    onChange?.({ top, collectionId, color, price });
  }, [top, collectionId, color, price, onChange]);

  useEffect(() => {
    let isMounted = true;
    const loadCollections = async () => {
      setIsLoadingCollections(true);
      setCollectionsError(null);
      try {
        const data = await fetchCollections();
        if (isMounted) {
          setCollections(data);
        }
      } catch (err) {
        if (isMounted) {
          const message =
            err instanceof Error
              ? err.message
              : "Không thể tải danh sách bộ sưu tập.";
          setCollectionsError(message);
        }
      } finally {
        if (isMounted) {
          setIsLoadingCollections(false);
        }
      }
    };

    loadCollections();
    return () => {
      isMounted = false;
    };
  }, []);

  const toggleCollection = (id: number | null) => {
    setCollectionId((current) => (current === id ? null : id));
  };

  return (
    <aside className="sidebar">
      <img className="background-sidebar" src={BackgroundNavbar} alt="" />

      <nav className="sidebar-menu">
        <button
          type="button"
          className={`top-filter best-seller ${top === "best" ? "active" : ""}`}
          onClick={() => setTop(top === "best" ? null : "best")}
        >
          Bán chạy
        </button>

        <button
          type="button"
          className={`top-filter new-arrival ${top === "new" ? "active" : ""}`}
          onClick={() => setTop(top === "new" ? null : "new")}
        >
          Sản phẩm mới
        </button>

        <button
          className="category-toggle"
          onClick={() => setShowCollection((prev) => !prev)}
        >
          <img
            className="arrow-icon"
            src={showCollection ? iconDown : iconRight}
            alt=""
          />
          <span className="title">Bộ sưu tập</span>
        </button>
        {showCollection && (
          <div className="submenu">
            <button
              type="button"
              className={`submenu-item ${collectionId === null ? "active" : ""}`}
              onClick={() => toggleCollection(null)}
            >
              Tất cả
            </button>
            {isLoadingCollections && (
              <div className="submenu-info">Đang tải...</div>
            )}
            {collectionsError && (
              <div className="submenu-info error">{collectionsError}</div>
            )}
            {collections.map((collection) => (
              <button
                key={collection.id}
                type="button"
                className={`submenu-item ${
                  collectionId === collection.id ? "active" : ""
                }`}
                onClick={() => toggleCollection(collection.id)}
              >
                {collection.name}
              </button>
            ))}
          </div>
        )}

        <button
          className="category-toggle"
          onClick={() => setShowPrice((prev) => !prev)}
        >
          <img
            className="arrow-icon"
            src={showPrice ? iconDown : iconRight}
            alt=""
          />
          <span className="title">Giá</span>
        </button>
        {showPrice && (
          <div className="submenu">
            {priceOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`submenu-item ${price === option.value ? "active" : ""}`}
                onClick={() =>
                  setPrice(price === option.value ? null : option.value)
                }
              >
                {option.label}
              </button>
            ))}
            <button
              type="button"
              className="submenu-item deselect"
              onClick={() => setPrice(null)}
            >
              Bỏ chọn
            </button>
          </div>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
