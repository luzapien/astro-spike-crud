import { useState } from "react";
import { apiProducts } from "../../api/products";
import ProductCard from "./ProductCard";
import type { Product } from "../../interfaces/generalData";

interface ProductManagerProps {
  initialProducts: Product[];
}

export default function ProductManager({ initialProducts }: ProductManagerProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState({ text: "", type: "" });

  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState({
    title: "",
    price: "" as string | number,
    description: "",
    thumbnail: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setForm({ ...form, thumbnail: objectUrl });
    }
  };

  // Open modal to CREATE
  const handleOpenCreate = () => {
    setEditingId(null);
    setForm({ title: "", price: "", description: "", thumbnail: "" });
    setIsOpen(true);
  };

  // Open modal to EDIT (Preload data)
  const handleOpenEdit = (product: Product) => {
    setEditingId(product.id);
    setForm({
      title: product.title,
      price: product.price,
      description: product.description || "",
      thumbnail: product.thumbnail || "",
    });
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensaje({
      text: editingId ? "Actualizando producto..." : "Guardando producto...",
      type: "blue",
    });

    try {
      if (editingId) {
        const updatedProduct = await apiProducts.editPtoduct({
          id: editingId,
          title: form.title,
          price: Number(form.price),
          description: form.description,
          thumbnail: form.thumbnail,
        });
        
        setProducts(
          products.map((p) =>
            p.id === editingId ? { ...p, ...updatedProduct } : p
          )
        );

        setMensaje({ text: "¡Producto actualizado con éxito!", type: "green" });
      } else {
        const newProduct = await apiProducts.postProducts({
          title: form.title,
          price: Number(form.price),
          description: form.description,
          thumbnail: form.thumbnail,
        });

        setProducts([newProduct, ...products]);
        setMensaje({ text: "¡Producto creado con éxito!", type: "green" });
      }

      setTimeout(() => {
        setIsOpen(false);
        setEditingId(null);
        setForm({ title: "", price: "", description: "", thumbnail: "" });
        setMensaje({ text: "", type: "" });
      }, 1000);
    } catch (error) {
      setMensaje({
        text: "Hubo un error al procesar la solicitud.",
        type: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      <h1>Catálogo de Productos (Demo CRUD con React)</h1>

      <button
        onClick={handleOpenCreate}
        style={{
          background: "#0070f3",
          color: "white",
          padding: "0.75rem 1rem",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "2rem",
          fontSize: "1rem",
        }}
      >
        + Crear Nuevo Producto
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={handleOpenEdit}
          />
        ))}
      </div>

      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "8px",
              width: "100%",
              maxWidth: "500px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <h2 style={{ margin: 0 }}>
                {editingId ? "Editar Producto" : "Nuevo Producto"}
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                }}
              >
                &times;
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div>
                <label style={{ display: "block", marginBottom: "0.3rem", fontWeight: 500 }}>
                  Título del Producto:
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  style={{ width: "100%", padding: "0.5rem", boxSizing: "border-box", border: "1px solid #ccc", borderRadius: "4px" }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.3rem", fontWeight: 500 }}>
                  Precio ($):
                </label>
                <input
                  type="number"
                  name="price"
                  step="0.01"
                  value={form.price}
                  onChange={handleChange}
                  required
                  style={{ width: "100%", padding: "0.5rem", boxSizing: "border-box", border: "1px solid #ccc", borderRadius: "4px" }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.3rem", fontWeight: 500 }}>
                  Descripción
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  style={{ width: "100%", padding: "0.5rem", boxSizing: "border-box", border: "1px solid #ccc", borderRadius: "4px" }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.3rem", fontWeight: 500 }}>
                  Imagen desde tu Computadora:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ width: "100%", padding: "0.5rem", boxSizing: "border-box", border: "1px solid #ccc", borderRadius: "4px", background: "#f9f9f9" }}
                />
                <small style={{ color: "#666", fontSize: "0.8rem" }}>
                  * Sube una nueva imagen si deseas reemplazarla.
                </small>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  background: "#28a745",
                  color: "white",
                  padding: "0.75rem",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  marginTop: "1rem",
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? "Guardando..." : editingId ? "Actualizar Producto" : "Guardar Producto"}
              </button>
            </form>

            {mensaje.text && (
              <p
                style={{
                  marginTop: "1rem",
                  textAlign: "center",
                  fontSize: "0.9rem",
                  color: mensaje.type === "green" ? "green" : mensaje.type === "red" ? "red" : "#0070f3",
                }}
              >
                {mensaje.text}
              </p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
