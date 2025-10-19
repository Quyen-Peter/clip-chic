import "../css/ProductDetail.css";
import Header from "../component/Header";
import { useEffect, useState } from "react";
import cart from "../assest/shoppingCart.png";
import Footer from "../component/Footer";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchProductById,
  fetchProducts,
  ProductDetail as ProductDetailType,
  ProductListItem,
} from "../services/productService";
const API_URL = process.env.REACT_APP_HOST_API;

const formatVND = (n: number) => `${n.toLocaleString("vi-VN")}`;

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductDetailType | null>(null);
  const [suggestions, setSuggestions] = useState<ProductListItem[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const increase = () => {
    if (quantity < stock) setQuantity(quantity + 1);
  };

  const decrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        if (!productId) return;

        const detail = await fetchProductById(Number(productId));
        const all = await fetchProducts();

        if (isMounted) {
          setProduct(detail);
          setStock(detail.stock);
          setSuggestions(all.filter((p) => p.id !== detail.id).slice(0, 5));
        }
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu:", err);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [productId]);

  const handleAddOrderDetail = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (token == null) {
        navigate("/Account/Login");
      }
      const url = `${API_URL}/api/Order/add-detail?productId=${productId}&quantity=${quantity}&price=${product?.price}`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!res.ok) {
        throw new Error(`Lỗi HTTP: ${res.status}`);
      }

      const data = await res.json();
      console.log("Kết quả thêm chi tiết đơn hàng:", data);
    } catch (error) {
      console.error("Lỗi khi thêm chi tiết đơn hàng:", error);
    }
  };

  const handleAddOrderDetailLike = async (
    productId: number,
    quantity: number,
    price: number
  ) => {
    try {
      const token = sessionStorage.getItem("token");
      if (token == null) {
        navigate("/Account/Login");
      }
      const url = `${API_URL}/api/Order/add-detail?productId=${productId}&quantity=${quantity}&price=${price}`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!res.ok) {
        throw new Error(`Lỗi HTTP: ${res.status}`);
      }

      const data = await res.json();
      console.log("Kết quả thêm chi tiết đơn hàng:", data);
    } catch (error) {
      console.error("Lỗi khi thêm chi tiết đơn hàng:", error);
    }
  };

  return (
    <div>
      <div className="header-container">
        <Header />
      </div>

      <div className="product-detail-container">
        <div className="img-left-container">
          {product?.images?.map((img) => (
            <img
              key={img.id}
              src={img.url}
              alt={img.name || "Product image"}
              className={`img-left ${
                selectedImage === img.url ? "active-thumbnail" : ""
              }`}
              onClick={() => setSelectedImage(img.url)}
            />
          ))}
        </div>

        <div className="img-main-container">
          <img
            src={
              selectedImage ||
              product?.images?.[0]?.url ||
              "https://via.placeholder.com/600"
            }
            alt={product?.images?.[0]?.name || "Main product image"}
            className="img-main"
          />
        </div>

        <div className="product-info-container">
          <h2 className="product-title">{product?.title || "Loading..."}</h2>
          <p className="product-description">
            {product?.description || "Loading..."}
          </p>

          <div className="product-detail-info-container">
            <h2 className="product-price">
              {product?.price ? `${formatVND(product.price)} vnd` : "Updating"}
            </h2>
            <div className="availability-and-quantity-container">
              <div className="availability-container">
                <p className="availability-title">Availability:</p>
                <p className="availability">{stock} in stock</p>
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
            <button
              className="add-to-cart-button"
              onClick={(e) => {
                e.preventDefault();
                handleAddOrderDetail();
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="you-may-also-like-container">
        <h2>You may also like</h2>
        <div className="you-may-also-like-products-container">
          {suggestions.map((p) => (
            <article key={p.id} className="you-may-also-like-products">
              <div className="you-may-also-like-products-thumb">
                <img src={p.image} alt={p.title} />
              </div>
              <div className="you-may-also-like-products-sub">
                <p className="you-may-also-like-products-title">
                  <a className="you-may-also-like-products-collection">
                    {p.collectionName}
                  </a>
                  <a className="you-may-also-like-products-name">
                    {" "}
                    - {p.title}
                  </a>
                </p>
              </div>
              <div className="you-may-also-like-products-buttom">
                <div className="you-may-also-like-products-price">
                  {formatVND(p.price)}{" "}
                  <span className="you-may-also-like-products-currency">
                    vnd
                  </span>
                </div>
                <button
                  className="you-may-also-like-products-buttom-cart"
                  aria-label="Add to cart"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddOrderDetailLike(p.id, 1, p.price);
                  }}
                >
                  <img src={cart} />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="view-more-button-container">
          <button className="view-more-button">view More</button>
        </div>
      </div>

      <div className="footer-product-detail-container">
        <Footer />
      </div>
    </div>
  );
};

export default ProductDetail;
