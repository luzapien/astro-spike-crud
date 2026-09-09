// export const apiProducts = {
//   getProducts: async () => {
//     const res = await fetch("https://dummyjson.com/products?limit=6");
//     const data = await res.json();
//     const products = data.products;

//     return products;
//   },
// }
// //   postProducts: async ({ title, price, description, thumbnail }) => {
//     const response = await fetch("https://dummyjson.com/products/add", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ title, price, description, thumbnail }),
//     });

//     const data = await response.json();
//     return data;
//   },

//   editPtoduct: async (id, product) => {
//     const response = await fetch(`https://dummyjson.com/products/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(product),
//     });

//     const data = await response.json();
//     return data;
//   },
// };

export const apiProducts = {
  getProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    return data;
  },

  postProducts: async (productData) => {
    const response = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });
    const data = await response.json();
    return data.product;
  },

  editPtoduct: async (id, productData) => {
    const response = await fetch("/api/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...productData }),
    });
    const data = await response.json();
    return data.product;
  },

  editLanding: async (header) => {
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
postPost: async (postData) => {
    const response = await fetch("/api/posts", { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });
    const data = await response.json();
    return data.post;
  },

};
