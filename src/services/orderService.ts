const API_URL = process.env.REACT_APP_HOST_API;

export interface OrderImage {
  id: number;
  name: string;
  address: string;
}

export interface Product {
  id: number;
  title: string;
  descript: string;
  price: number;
  images?: OrderImage[];
}

export interface BlindBox {
  id: number;
  name: string;
  description: string;
  price: number;
  images?: OrderImage[];
}

export interface OrderDetail {
  id: number;
  orderId: number;
  productId?: number;
  blindBoxId?: number;
  quantity: number;
  price: number;
  product?: Product | null;
  blindBox?: BlindBox | null;
}

export interface Order {
  id: number;
  userId: number;
  phone: string;
  address: string;
  name: string;
  createDate: string;
  totalPrice: number;
  shipPrice: number;
  payPrice: number;
  status: string;
  payMethod: string;
  orderDetails: OrderDetail[];
}

export const fetchUserOrders = async (userId: number, token: string): Promise<Order[]> => {
  const res = await fetch(`${API_URL}/api/Order/user-orders/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
};

export const fetchOrderDetail = async (orderId: number, token: string) => {
  const res = await fetch(`${API_URL}/api/Order/${orderId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
};

export const cancelOrder = async (orderId: number, token: string) => {
  const res = await fetch(`${API_URL}/api/Order/update-status/${orderId}?status=cancelled`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
};
