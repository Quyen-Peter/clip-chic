import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../component/Header";
import Footer from "../component/Footer";
import "../css/ProductDetail.css";
import cart from "../assest/shoppingCart.png";
import {
  fetchBlindBoxById,
  fetchBlindBoxes,
  BlindBoxDetail as BlindBoxDetailType,
  BlindBoxListItem,
} from "../services/blindBoxService";

const formatVND = (n: number) => `${n.toLocaleString("vi-VN")}`;

const BlindboxDetail = () => {
  const { blindboxId } = useParams<{ blindboxId: string }>();
  const [blindbox, setBlindbox] = useState<BlindBoxDetailType | null>(null);
  const [relatedBoxes, setRelatedBoxes] = useState<BlindBoxListItem[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!blindboxId) {
      setError("Không tìm thấy mã blindbox.");
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    const id = Number(blindboxId);
    if (Number.isNaN(id)) {
      setError("Mã blindbox không hợp lệ.");
      setIsLoading(false);
      return;
    }

    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [detail, list] = await Promise.all([
          fetchBlindBoxById(id),
          fetchBlindBoxes(),
        ]);

        if (!isMounted) return;
        setBlindbox(detail);
        setStock(detail.stock);
        setSelectedImage(detail.images?.[0]?.url || null);
        setRelatedBoxes(
          list.filter((item) => item.id !== detail.id).slice(0, 4)
        );
      } catch (e) {
        if (!isMounted) return;
        const message =
          e instanceof Error ? e.message : "Không thể tải dữ liệu blindbox.";
        setError(message);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [blindboxId]);

  const increase = () => {
    setQuantity((prev) => (stock > 0 ? Math.min(prev + 1, stock) : prev + 1));
  };

  const decrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const sideImages = useMemo(() => blindbox?.images ?? [], [blindbox?.images]);

  return (
    <div>
      <div className="header-container">
        <Header />
      </div>

      <div className="product-detail-container">
        {isLoading && (
          <div className="product-feedback">Đang tải thông tin blindbox...</div>
        )}

        {error && <div className="product-feedback error">{error}</div>}

        {!isLoading && !error && blindbox && (
          <>
            {/* Ảnh nhỏ bên trái */}
            <div className="img-left-container">
              {sideImages.length > 0 ? (
                sideImages.map((img) => (
                  <img
                    key={img.id}
                    src={img.url}
                    alt={img.name || blindbox.name || "Blindbox image"}
                    className={`img-left ${
                      selectedImage === img.url ? "active-thumbnail" : ""
                    }`}
                    onClick={() => setSelectedImage(img.url)}
                  />
                ))
              ) : (
                <img
                  src="https://via.placeholder.com/600"
                  alt="Placeholder"
                  className="img-left"
                />
              )}
            </div>

            {/* Ảnh chính */}
            <div className="img-main-container">
              <img
                src={selectedImage || "https://via.placeholder.com/600"}
                alt={blindbox.name || "Main blindbox image"}
                className="img-main"
              />
            </div>

            {/* Thông tin Blindbox */}
            <div className="product-info-container">
              <div className="product-collection-container">
                <p className="product-collection-title">Collection:</p>
                <p className="product-collection">
                  {blindbox.collectionName || "Unknown"}
                </p>
                <p className="product-collection-description">
                  {blindbox.collectionDescription || "No description"}
                </p>
              </div>

              <h2 className="product-title">{blindbox.name}</h2>
              <p className="product-description">
                {blindbox.description || "Updating..."}
              </p>

              <div className="product-detail-info-container">
                <h2 className="product-price">
                  {blindbox.price
                    ? `${formatVND(blindbox.price)} vnd`
                    : "Updating"}
                </h2>

                <div className="availability-and-quantity-container">
                  <div className="availability-container">
                    <p className="availability-title">Còn:</p>
                    <p className="availability"> {stock} sản phẩm trong kho</p>
                  </div>
                  <div className="quantity-container">
                    <button className="quantity-button" onClick={decrease}>
                      -
                    </button>
                    <span className="quantity">{quantity}</span>
                    <button className="quantity-button" onClick={increase}>
                      +
                    </button>
                  </div>
                </div>

                <button className="add-to-cart-button">Add to Cart</button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Gợi ý Blindbox */}
      <div className="you-may-also-like-container">
        <h2>Có thể bạn sẽ thích</h2>
        <div className="you-may-also-like-products-container">
          {relatedBoxes.map((p) => (
            <article key={p.id} className="you-may-also-like-products">
              <Link
                to={`/blindboxDetail/${p.id}`}
                className="link-product"
              >
                <div className="you-may-also-like-products-thumb">
                  <img
                    src={p.image || "https://via.placeholder.com/300"}
                    alt={p.name}
                  />
                </div>
                <div className="you-may-also-like-products-sub-blindbox">
                  <p className="you-may-also-like-products-collection-blindbox">
                    {p.collectionName}
                  </p>
                  <p className="you-may-also-like-products-name-blindbox you-may-also-like-products-title">
                    {p.name}
                  </p>
                </div>
                <div className="you-may-also-like-products-buttom">
                  <div className="you-may-also-like-products-price">
                    {formatVND(p.price)}{" "}
                    <span className="you-may-also-like-products-currency">
                      vnd
                    </span>
                  </div>
                  <div className="you-may-also-like-products-actions">
                    <button
                      className="you-may-also-like-products-buttom-cart"
                      aria-label="Add to cart"
                    >
                      <img src={cart} alt="Add to cart" />
                    </button>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {relatedBoxes.length > 0 && (
          <div className="view-more-button-container">
            <button className="view-more-button">view More</button>
          </div>
        )}
      </div>

      <div className="footer-product-detail-container">
        <Footer />
      </div>
    </div>
  );
};

export default BlindboxDetail;
