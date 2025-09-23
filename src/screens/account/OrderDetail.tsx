import { useParams } from "react-router-dom";
import "../../css/OrderDetail.css";
import { useEffect, useState } from "react";
import OrderSteps from "../../component/OrderSteps";


interface Order {
  orderId: number;
  status: string;
  products: {
    id: number;
    title: string;
    name: string;
    qty: number;
    price: number;
    image: string;
  }[];
}


const OrderDetail = () => {
  const { OrderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetch("/orderDetail.json")
      .then((res) => res.json())
      .then((data) => setOrder(data));
  }, [OrderId]);



  return (
    <div className="order-detail-container">
      <h3 className="order-id">ORDER ID: 12345</h3>
      <p className="thank-confirmed">Thank you. Your order has been confirmed!</p>
      <div>
        <OrderSteps status={order?.status as "ToPay" | "ToShip" | "Shipping" | "Delivered"} />
      </div>

      <div className="order-detail-content">
        <h3 className="product-list">Product listing</h3>
        <div className="product-items">
          {order?.products.map((product) => (
            <div className="product-item" key={product.id}>
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-info">
                    <div className="product-name-title">
                        <h4 className="product-title">{product.title}</h4>
                        <p className="product-name">{product.name}</p>
                    </div>
                    
                    <p className="product-quantity">Quantity: {product.qty}</p>
                    <p className="product-price">{product.price} vnd</p>
                </div>
            </div>
          ))}  
        </div> 
      </div>

        <div className="shipping-address">
            <h3 className="shipping-address-title">Shipping address</h3>
            <div className="address-info-border">
                <div className="name-phone">
                    <p>Name:</p>
                    <p className="content-name-info">Nguyen Van A |</p>
                    <p> (+84) 0123456789</p>
                </div>
                <div className="address-detail">
                    <p>Address: </p>
                    <p className="content-address-info"> 123 ABC, Ward 1, District 1, HCM City</p>
                </div>
            </div>
        </div>

        <div className="payment-method-container">
            <h3 className="payment-method">Total</h3>
            <div className="total-info-border">
                <div className="subtotal">
                    <p>Subtotal:</p>
                    <p>235.000 vnd</p>
                </div>
                <div className="shipping-charge">
                    <p>Shipping Charge:</p>
                    <p>10.000 vnd</p>
                </div>
                <div className="line-order-detail-payment"></div>
                <div className="total">
                    <p>Total</p>
                    <p>245.000 vnd</p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default OrderDetail;
