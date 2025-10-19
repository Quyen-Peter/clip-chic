import "../css/ProductDetail.css";
import Header from "../component/Header";
import { useEffect, useState } from "react";
import cart from "../assest/shoppingCart.png";
import Footer from "../component/Footer";
import { useParams } from "react-router-dom";
import {
  fetchProductById,
  fetchProducts,
  ProductDetail as ProductDetailType, // 👈 đổi tên kiểu dữ liệu
  ProductListItem,
} from "../services/productService";

const formatVND = (n: number) => `${n.toLocaleString("vi-VN")}`;

const ProductDetail = () => {
  const {productId} = useParams(); 

const [product, setProduct] = useState<ProductDetailType  | null>(null);
const [suggestions, setSuggestions] = useState<ProductListItem[]>([]);
const [quantity, setQuantity] = useState(1);
const [stock, setStock] = useState(0);

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
        setSuggestions(all.filter(p => p.id !== detail.id).slice(0, 5)); // gợi ý 5 sản phẩm khác
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

  return (
    <div>
      <div className="header-container">
        <Header />
      </div>
      <div className="product-detail-container">
        <div className="img-left-container">
          {product?.images?.slice(1).map((img) => (
            <img key={img.id} src={img.url} alt={img.name || "Product image"} className="img-left" />
          ))}
        </div>

        <div className="img-main-container">
          <img
            src={product?.images?.[0]?.url || "https://via.placeholder.com/600"}
            alt={product?.images?.[0]?.name || "Main product image"}
            className="img-main"
          />
        </div>
        <div className="product-info-container">
          <div className="product-collection-container">
            <p className="product-collection-title">Collection:</p>
            <p className="product-collection">{product?.collectionName || "Unknown"}</p>
            <p className="product-collection-description">{product?.collectionDescription || "No description"}</p>
          </div>
          <h2 className="product-title">{product?.title || "Loading..."}</h2>
          <p className="product-description">
            {product?.description || "Loading..."}
          </p>
          <div className="product-detail-info-container">
            <h2 className="product-price">{product?.price ? `${formatVND(product.price)} vnd` : "Updating"}</h2>
            <div className="availability-and-quantity-container">
              <div className="availability-container">
                <p className="availability-title">Availability:</p>
                <p className="availability"> {stock} in stock</p>
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
        <a className="you-may-also-like-products-name"> - {p.title}</a>
      </p>
    </div>
    <div className="you-may-also-like-products-buttom">
      <div className="you-may-also-like-products-price">
        {formatVND(p.price)} <span className="you-may-also-like-products-currency">vnd</span>
      </div>
      <button className="you-may-also-like-products-buttom-cart" aria-label="Add to cart">
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
