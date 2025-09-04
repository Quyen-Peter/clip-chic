import "../css/Cart.css";
import Footer from "../component/Footer";
import RightBackgrount from "../assest/RightBackgrount.png";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  desc: string;
  price: number;
  img: string;
  qty: number;
};

const Cart = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const mockData: Product[] = [
      {
        id: 1,
        name: "Flutterbelle",
        desc: "Hair Clips",
        price: 85000,
        img: "https://via.placeholder.com/60x60.png?text=Hair",
        qty: 1,
      },
      {
        id: 2,
        name: "Summer Box",
        desc: "Blind box",
        price: 150000,
        img: "https://via.placeholder.com/60x60.png?text=Box",
        qty: 1,
      },
      {
        id: 3,
        name: "Back To School Box",
        desc: "Blind box",
        price: 150000,
        img: "https://via.placeholder.com/60x60.png?text=School",
        qty: 1,
      },
    ];
    setProducts(mockData);
  }, []);

  const subtotal = products.reduce((sum, p) => sum + p.price * p.qty, 0);
  const shipping = 10000;
  const total = subtotal + shipping;

  return (
    <div className="cart-page">

      {/* 2 cột */}
      <main className="cart-main">
        <img src={RightBackgrount} className="card-bg" alt="" />

        <section className="panel cart-left">
          <h3>Shopping cart</h3>
          <p>You have {products.length} item in your cart</p>

          {products.map((p) => (
            <div className="cart-item" key={p.id}>
              <img src={p.img} className="thumb" />
              <div className="item-info">
                <div className="title">{p.name}</div>
                <div className="sub">{p.desc}</div>
              </div>
              <div className="qty">
                <span>{p.qty}</span>
              </div>
              <div className="price">{p.price.toLocaleString()} vnd</div>
              <button className="trash">🗑</button>
            </div>
          ))}
        </section>

        <aside className="panel card-right">
          <div className="card-inner">
            <h3>Card Details</h3>

            <div className="field">
              <label>Name on card</label>
              <input placeholder="Name" />
            </div>

            <div className="field">
              <label>Card Number</label>
              <input placeholder="1111 2222 3333 4444" />
            </div>

            <div className="row-2">
              <input placeholder="mm/yy" />
              <input placeholder="123" />
            </div>

            <div className="summary">
              <div>
                <span>Subtotal</span>
                <b>{subtotal.toLocaleString()} vnd</b>
              </div>
              <div>
                <span>Shipping</span>
                <b>{shipping.toLocaleString()} vnd</b>
              </div>
              <div>
                <span>Total</span>
                <b>{total.toLocaleString()} vnd</b>
              </div>
            </div>

            <button className="btn-primary">
              {total.toLocaleString()} vnd — Checkout →
            </button>
          </div>
        </aside>
      </main>

      <div className="cart-footer">
        <Footer />  
</div>
    </div>
  );
};

export default Cart;
