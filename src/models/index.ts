export interface IProduct {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}

export interface IMyProduct extends IProduct {
  year: string;
  author: string;
}

export interface IMyProductStates {
  title: string;
  category: string;
  description: string;
  year: string;
  author: string;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  id: string;
}

export type modalType = "" | "editing" | "sorting" | "filters";

export enum Icons {
  Search = "search.svg",
}

export enum Sort {
  NameAZ = "Name (A-Z)",
  NameZA = "Name (Z-A)",
  CategoryAZ = "Category (A-Z)",
  CategoryZA = "Category (Z-A)",
  PriceInc = "Price (Low to Hight)",
  PriceDecr = "Price (Hight to Low)",
  StockInc = "Stock (Low to Hight)",
  StockDecr = "Stock (Hight to Low)",
  RatingInc = "Rating (Low to Hight)",
  RatingDecr = "Rating (Hight to Low)",
}
