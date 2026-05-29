export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  images: string[];
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  soldCount: number;
  stock: number;
  tags: string[];
  sizes?: string[];
  colors?: string[];
  shipping: {
    type: string;
    cost: number;
  };
  estimatedDelivery: string;
  isTrending: boolean;
  isDeal: boolean;
  isLimited: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  categorySlug?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  address: string;
  coupon?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  wishlist: string[]; // Product IDs
  orders: string[]; // Order IDs
  addresses: string[];
}

export interface Review {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
}

export interface Coupon {
  code: string;
  discount: number;
  type: 'percent' | 'flat';
  minOrder: number;
}
