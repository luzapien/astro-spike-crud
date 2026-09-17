import { useState } from "react";
import { apiPosts } from "../../api/posts";

export default function BlogForm() {
  const [loading, setLoading] = useState(false);

  const [mensaje, setMensaje] = useState({
    text: "",
    type: "",
  });

  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    pubDate: "",
    image: "",
    content: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMensaje({
      text: "Guardando post...",
      type: "blue",
    });

    try {
      await apiPosts.createPost(form);

      setMensaje({
        text: "¡Post creado con éxito!",
        type: "green",
      });

      // Navigate to the blog after successfully creating the post
      window.location.href = "/blog";
    } catch (error) {
      console.error(error);

      setMensaje({
        text: "Hubo un error al crear el post.",
        type: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2>Crear nuevo blog</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {/* Título */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.3rem",
              fontWeight: 500,
            }}
          >
            Título:
          </label>

          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              boxSizing: "border-box",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>

        {/* Autor */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.3rem",
              fontWeight: 500,
            }}
          >
            Autor:
          </label>

          <input
            type="text"
            name="author"
            value={form.author}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              boxSizing: "border-box",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>

        {/* Descripción */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.3rem",
              fontWeight: 500,
            }}
          >
            Descripción:
          </label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={3}
            style={{
              width: "100%",
              padding: "0.5rem",
              boxSizing: "border-box",
              border: "1px solid #ccc",
              borderRadius: "4px",
              resize: "vertical",
            }}
          />
        </div>

        {/* Fecha */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.3rem",
              fontWeight: 500,
            }}
          >
            Fecha:
          </label>

          <input
            type="date"
            name="pubDate"
            value={form.pubDate}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              boxSizing: "border-box",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>

        {/* Imagen */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.3rem",
              fontWeight: 500,
            }}
          >
            URL de imagen:
          </label>

          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.5rem",
              boxSizing: "border-box",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>

        {/* Contenido */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.3rem",
              fontWeight: 500,
            }}
          >
            Contenido (Markdown):
          </label>

          <textarea
            name="content"
            rows={12}
            value={form.content}
            onChange={handleChange}
            required
            placeholder="# Mi nuevo blog

Escribe aquí el contenido de tu artículo..."
            style={{
              width: "100%",
              padding: "0.5rem",
              boxSizing: "border-box",
              border: "1px solid #ccc",
              borderRadius: "4px",
              resize: "vertical",
              fontFamily: "monospace",
            }}
          />
        </div>

        {/* Botón */}
        <button
          type="submit"
          disabled={loading}
          style={{
            background: "#0070f3",
            color: "white",
            padding: "0.75rem",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "bold",
          }}
        >
          {loading ? "Guardando..." : "Publicar blog"}
        </button>
      </form>

      {/* Mensaje */}
      {mensaje.text && (
        <p
          style={{
            marginTop: "1rem",
            textAlign: "center",
            color:
              mensaje.type === "green"
                ? "green"
                : mensaje.type === "red"
                  ? "red"
                  : "blue",
          }}
        >
          {mensaje.text}
        </p>
      )}
    </main>
  );
}
