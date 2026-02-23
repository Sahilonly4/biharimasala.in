export enum ProductCategory {
  all = "all",
  spices = "spices",
  masala = "masala",
  pickles = "pickles",
}
export interface ProductPriceOption {
  size: "250g" | "500g";
  price: number;
}
export interface Product {
  id: number;
  name: string;
  description: string;
  prices: ProductPriceOption[]; // 👈 NEW
  category: ProductCategory;
  image: {
    getDirectURL: () => string;
  };
}