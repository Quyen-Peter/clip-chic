import { useEffect, useState } from "react";
import "../css/Sidebar.css";
import BackgroundNavbar from "../assest/backgroundNavbar.png";
import iconRight from "../assest/IconRightWhile.png";
import iconDown from "../assest/IconRightDown.png";
import {
  fetchCollections,
  CollectionSummary,
} from "../services/collectionService";

type TopFilter = "best" | "new" | null;

export type BlindboxFilterQuery = {
  top: TopFilter;
  collectionId: number | null;
};

interface SidebarBlindboxProps {
  onChange?: (query: BlindboxFilterQuery) => void;
}

const SidebarBlindbox = ({ onChange }: SidebarBlindboxProps) => {
  const [showCollection, setShowCollection] = useState(true);
  const [top, setTop] = useState<TopFilter>(null);
  const [selectedCollectionId, setSelectedCollectionId] = useState<number | null>(null);
  const [collections, setCollections] = useState<CollectionSummary[]>([]);
  const [isLoadingCollections, setIsLoadingCollections] = useState(false);
  const [collectionsError, setCollectionsError] = useState<string | null>(null);

  useEffect(() => {
    onChange?.({ top, collectionId: selectedCollectionId });
  }, [top, selectedCollectionId, onChange]);

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
    setSelectedCollectionId((current) => (current === id ? null : id));
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
              className={`submenu-item ${selectedCollectionId === null ? "active" : ""}`}
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
                  selectedCollectionId === collection.id ? "active" : ""
                }`}
                onClick={() => toggleCollection(collection.id)}
              >
                {collection.name}
              </button>
            ))}
          </div>
        )}
      </nav>
    </aside>
  );
};

export default SidebarBlindbox;
