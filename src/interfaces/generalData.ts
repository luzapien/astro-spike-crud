export interface GeneralData {
  products: Product[];
  landing: Landing;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
}

export type ProductInput = Omit<Product, "id">;

export interface Landing {
  header: LandingHeader;
}

export interface LandingHeader {
  logo: string;
  heroImage: string;
  title: string;
}
