import "../css/Sidebar.css";
import BSidebar from "../assest/Sidebar.png";
import { useEffect, useState } from "react";
import iconRight from "../assest/IconRightWhile.png";
import iconDown from "../assest/IconRightDown.png";
import BackgroundNavbar from "../assest/backgroundNavbar.png";


type TopFilter = "best" | "new" | null;

type Query = {
  top: TopFilter;
  collection: string | null;
  color: string | null;
  price: string | null;
};

export default function Sidebar({
  onChange,
}: {
  onChange?: (q: Query) => void;
}) {
  const [showCollection, setShowCollection] = useState(true);
  const [showColor, setShowColor] = useState(true);
  const [showPrice, setShowPrice] = useState(true);

  const [top, setTop] = useState<TopFilter>(null);
  const [collection, setCollection] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [price, setPrice] = useState<string | null>(null);

  // useEffect(() => {
  //   onChange?.({ top, collection, color, price });
  // }, []);

  useEffect(() => {
    onChange?.({ top, collection, color, price });
  }, [top, collection, color, price]);

  const collections = [
    "All",
    "New Year Collection",
    "Summer Collection",
  ];

  const colors = [
    "White",
    "Pink",
    "Light blue",
    "Dark blue",
    "Light green",
    "Dark green",
    "Red",
    "Orange",
    "Black",
  ];

  const prices = [
    { value: "under-100k", label: "Under 100,000vnd" },
    { value: "100k-200k", label: "100,000vnd - 200,000vnd" },
    { value: ">=200k", label: "Above 200,000vnd" },
  ];

  // helper: chọn collection, map "All" -> null
  const selectCollection = (c: string) => {
    const v = c === "All" ? null : c;
    setCollection(collection === v ? null : v);
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
          Best Sellers
        </button>

        <button
          type="button"
          className={`top-filter new-arrival ${top === "new" ? "active" : ""}`}
          onClick={() => setTop(top === "new" ? null : "new")}
        >
          New Arrivals
        </button>

        <button
          className="category-toggle"
          onClick={() => setShowCollection(!showCollection)}
        >
          <img
            className="arrow-icon"
            src={showCollection ? iconDown : iconRight}
            alt=""
          />
          <span className="title">Collection</span>
        </button>
        {showCollection && (
          <div className="submenu">
            {collections.map((c) => (
              <button
                key={c}
                type="button"
                className={`submenu-item ${
                  (collection ?? "All") === c ? "active" : ""
                }`}
                onClick={() => selectCollection(c)}
              >
                {c}
              </button>
            ))}
            <button
              type="button"
              className="submenu-item deselect"
              onClick={() => setCollection(null)}
            >
              deselect
            </button>
          </div>
        )}

        <button
          className="category-toggle"
          onClick={() => setShowColor(!showColor)}
        >
          <img
            className="arrow-icon"
            src={showColor ? iconDown : iconRight}
            alt=""
          />
          <span className="title">Color</span>
        </button>
        {showColor && (
          <div className="submenu">
            {colors.map((c) => (
              <button
                key={c}
                type="button"
                className={`submenu-item ${color === c ? "active" : ""}`}
                onClick={() => setColor(color === c ? null : c)}
              >
                {c}
              </button>
            ))}
            <button
              type="button"
              className="submenu-item deselect"
              onClick={() => setColor(null)}
            >
              deselect
            </button>
          </div>
        )}

        <button
          className="category-toggle"
          onClick={() => setShowPrice(!showPrice)}
        >
          <img
            className="arrow-icon"
            src={showPrice ? iconDown : iconRight}
            alt=""
          />
          <span className="title">Price</span>
        </button>
        {showPrice && (
          <div className="submenu">
            {prices.map((p) => (
              <button
                key={p.value}
                type="button"
                className={`submenu-item ${price === p.value ? "active" : ""}`}
                onClick={() => setPrice(price === p.value ? null : p.value)}
              >
                {p.label}
              </button>
            ))}
            <button
              type="button"
              className="submenu-item deselect"
              onClick={() => setPrice(null)}
            >
              deselect
            </button>
          </div>
        )}
      </nav>
    </aside>
  );
}
