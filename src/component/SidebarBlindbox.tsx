import { useEffect, useState } from "react";
import "../css/Sidebar.css";
import BackgroundNavbar from "../assest/backgroundNavbar.png";
import iconRight from "../assest/IconRightWhile.png";
import iconDown from "../assest/IconRightDown.png";


type TopFilter = "best" | "new" | null;

type QueryBlindbox = {
  top: TopFilter;
  collection: string | null;
};

const SidebarBlindbox = ({ onChange }: { onChange?: (q: QueryBlindbox) => void }) => {
  const [showCollection, setShowCollection] = useState(true);

  const [top, setTop] = useState<TopFilter>(null);
  const [collection, setCollection] = useState<string | null>(null);

//   useEffect(() => {
//     onChange?.({ top, collection });
//   }, []);

  useEffect(() => {
    onChange?.({ top, collection });
  }, [top, collection]);

  const collections = ["All", "New Year Collection", "Summer Collection"];

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
      </nav>
    </aside>
  );
};
export default SidebarBlindbox;
