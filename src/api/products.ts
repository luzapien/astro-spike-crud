import type {  LandingHeader, Product, ProductInput } from "../interfaces/generalData";

export const apiProducts = {
  getProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    return data;
  },

  postProducts: async (productData: ProductInput) => {
    const response = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });
    const data = await response.json();
    return data.product;
  },

  editPtoduct: async ( productData: Product) => {
    const response = await fetch("/api/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...productData }),
    });
    const data = await response.json();
    return data.product;
  },

  editLanding: async (header: LandingHeader) => {
    const response = await fetch("/api/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        landing: {
          header: header,
        },
      }),
    });
    const data = await response.json();
    return data;
  },
};
