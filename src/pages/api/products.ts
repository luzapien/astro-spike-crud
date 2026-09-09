let mockDatabase = {
  products: [
    {
      id: 1,
      title: "Producto Inicial 1",
      price: 100,
      description: "Desc 1",
      thumbnail: "https://via.placeholder.com/150",
    },
  ],
  posts: [
    {
      id: "first-post",
      title: "Astro, Vite and MDX test",
      description: "Lorem ipsum dolor sit amet",
      author: "Iniubong Obonguko",
      pubDate: "20 Aug, 2022",
      image: "https://images.unsplash.com/photo-1664380619395-a25d867b5fb9?...",
      content: "## Story about Old days\nIn the olden days, Lorem ipsum...",
    },
  ],
  landing: {
    header: {
      logo: "https://unsplash.com/photos/laptop-with-text-ready-for-work-ECTrlp0tkkA",
      heroImage:
        "https://unsplash.com/photos/laptop-with-text-ready-for-work-ECTrlp0tkkA",
      title: "Mi landing page",
    },
  },
};

export async function GET() {
  return new Response(JSON.stringify(mockDatabase), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function PUT({ request }) {
  try {
    const data = await request.json();
    let updatedProduct = null;

    // 1. Si viene la landing
    if (data.landing) {
      mockDatabase.landing = {
        ...mockDatabase.landing,
        ...data.landing,
      };
    }

    if (data.id) {
      mockDatabase.products = mockDatabase.products.map((p) => {
        if (p.id === Number(data.id)) {
          updatedProduct = { ...p, ...data };
          return updatedProduct;
        }
        return p;
      });
    }

    // 3. Si viene una lista completa de productos
    if (data.products) {
      mockDatabase.products = data.products;
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Actualizado con éxito",
        product: updatedProduct, // Devuelve el producto individual editado
        data: mockDatabase,
      }),
      { status: 200 },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: "Error al actualizar" }),
      { status: 500 },
    );
  }
}
// CREAR (POST)
export async function POST({ request }) {
  try {
    const data = await request.json();
    const newProduct = {
      id: Date.now(), // ID único basado en tiempo
      ...data,
    };

    if (data.type === "post") {
      const newPost = {
        id: data.slug || Date.now().toString(),
        ...data,
      };
      mockDatabase.posts.unshift(newPost);
      return new Response(JSON.stringify({ success: true, post: newPost }), {
        status: 200,
      });
    }

    mockDatabase.products.unshift(newProduct); // Lo agregamos al inicio

    return new Response(
      JSON.stringify({
        success: true,
        message: "Producto creado con éxito",
        product: newProduct,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: "Error al crear" }),
      { status: 500 },
    );
  }
}
