import "../css/ProductDetail.css";
import Header from "../component/Header";
import { useEffect, useState } from "react";
import cart from "../assest/shoppingCart.png";
import Footer from "../component/Footer";
import { useParams } from "react-router-dom";

type Product = {
  id: string;
  name: string;
  price: number;
  color: string;
  collection: string;
  bestSeller: boolean;
  newArrival: boolean;
  image: string;
};

const formatVND = (n: number) => `${n.toLocaleString("vi-VN")}`;

const ProductDetail = () => {
  const {productId} = useParams(); 
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(10);

  const increase = () => {
    if (quantity < stock) setQuantity(quantity + 1);
  };

  const decrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/products.json");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (e) {
        console.error("Fetch products failed:", e);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <div className="header-container">
        <Header />
      </div>
      <div className="product-detail-container">
        <div className="img-left-container">
          <img
            src="https://picsum.photos/seed/clip01/600/600"
            alt=""
            className="img-left"
          />
          <img
            src="https://picsum.photos/seed/clip02/600/600"
            alt=""
            className="img-left"
          />
          <img
            src="https://picsum.photos/seed/clip03/600/600"
            alt=""
            className="img-left"
          />
          <img
            src="https://picsum.photos/seed/clip04/600/600"
            alt=""
            className="img-left"
          />
          <img
            src="https://picsum.photos/seed/clip05/600/600"
            alt=""
            className="img-left"
          />
        </div>
        <div className="img-main-container">
          <img
            src="https://picsum.photos/seed/clip01/600/600"
            alt=""
            className="img-main"
          />
        </div>
        <div className="product-info-container">
          <h2 className="product-title">Sea Whisper</h2>
          <p className="produc-description">
            Dark green clip decorated with shells, star and mermaid tail charms
            - Dark green clip decorated with shells, star and mermaid tail
            charms - Dark green clip decorated with shells, star and mermaid
            tail charms
          </p>
          <div className="product-detail-info-container">
            <div className="product-demention-container">
              <p className="product-demention-title">Demention:</p>
              <p className="product-demention">12 cm</p>
            </div>
            <div className="product-color-container">
              <p className="product-color-title">Color:</p>
              <p className="product-color">dark green</p>
            </div>

            <h2 className="product-price">85.000 vnd</h2>
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
          {products.map((p) => (
            <article key={p.id} className="you-may-also-like-products">
              <div className="you-may-also-like-products-thumb">
                <img src={p.image} alt={p.name} />
              </div>
              <div className="you-may-also-like-products-sub">
                <p className="you-may-also-like-products-title">
                  <a className="you-may-also-like-products-collection">
                    {p.collection}
                  </a>
                  <a className="you-may-also-like-products-name"> - {p.name}</a>
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
