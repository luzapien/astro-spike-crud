import type { APIContext } from "astro";


let mockDatabase = {
  products: [
    {
      id: 1,
      title: "Perfumes otoñal",
      price: 100,
      description: "Delicioso set otoñal",
      thumbnail: "src/images/perfume.jpg",
    },
  ],
  landing: {
    header: {
      logo: "src/images/fall.jpg",
      heroImage:
        "src/images/fall.jpg",
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

export async function PUT({ request }: APIContext) {
  try {
    const data = await request.json();
    let updatedProduct = null;

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

    if (data.products) {
      mockDatabase.products = data.products;
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Actualizado con éxito",
        product: updatedProduct,
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
