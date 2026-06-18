export interface Product {
  id: string | number;
  name: string;
  price: number;
  qty: number;
}

export interface ProductInput {
  name: string;
  price: number;
  qty: number;
}
