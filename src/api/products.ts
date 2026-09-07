export const apiProducts = {
  getProducts: async () => {
    const res = await fetch("https://dummyjson.com/products?limit=6");
    const data = await res.json();
    const products = data.products;

    return products
  },

  postProducts: async ({title,price,thumbnail}) => {
    const response = await fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, price, thumbnail }),
    });

    const data = await response.json();
    return data
  },
};
