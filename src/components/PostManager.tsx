import { useState } from "react";
import { apiProducts } from "../api/products";
export default function PostManager({ initialPosts }) {
  const [posts, setPosts] = useState(initialPosts || []);
  const [selectedPost, setSelectedPost] = useState(null); // <-- Tracks which post is open
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState({ text: "", type: "" });

  const [form, setForm] = useState({
    title: "",
    slug: "",
    author: "",
    description: "",
    pubDate: "",
    image: "",
    content: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOpenCreate = () => {
    setForm({
      title: "",
      slug: "",
      author: "",
      description: "",
      pubDate: "",
      image: "",
      content: "",
    });
    setIsOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje({ text: "Guardando post...", type: "blue" });

    try {
      const newPost = await apiProducts.postPost(form);
      setPosts([newPost, ...posts]);
      setMensaje({ text: "¡Post creado con éxito!", type: "green" });

      setTimeout(() => {
        setIsOpen(false);
        setForm({
          title: "",
          slug: "",
          author: "",
          description: "",
          pubDate: "",
          image: "",
          content: "",
        });
        setMensaje({ text: "", type: "" });
      }, 1000);
    } catch (error) {
      setMensaje({ text: "Hubo un error al crear el post.", type: "red" });
    } finally {
      setLoading(false);
    }
  };

  // IF A POST IS SELECTED, RENDER THE FULL BLOG VIEW INLINE
  if (selectedPost) {
    return (
      <div
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "8px",
          border: "1px solid #ddd",
        }}
      >
        <button
          onClick={() => setSelectedPost(null)}
          style={{
            background: "#6c757d",
            color: "white",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginBottom: "1.5rem",
          }}
        >
          &larr; Volver a la lista de posts
        </button>

        <article>
          <h1>{selectedPost.title}</h1>
          <p style={{ color: "#666", fontStyle: "italic" }}>
            Escrito por: {selectedPost.author} | Publicado el:{" "}
            {selectedPost.pubDate}
          </p>

          {selectedPost.image && (
            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              style={{
                width: "100%",
                maxHeight: "400px",
                objectFit: "cover",
                borderRadius: "6px",
                margin: "1rem 0",
              }}
            />
          )}

          <hr
            style={{
              margin: "1.5rem 0",
              border: "0",
              borderTop: "1px solid #ddd",
            }}
          />
          <p>{selectedPost.content}</p>
        </article>
      </div>
    );
  }

  // DEFAULT VIEW: LIST + CREATE BUTTON
  return (
    <main style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <h2>Gestor de Blogs / Posts</h2>
        <button
          onClick={handleOpenCreate}
          style={{
            background: "#28a745",
            color: "white",
            padding: "0.75rem 1rem",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          + Crear Nuevo Post
        </button>
      </div>

      {/* Lista de Posts Actuales */}
      <ul
        style={{ listStyle: "none", padding: 0, display: "grid", gap: "1rem" }}
      >
        {posts.map((post) => (
          <li
            key={post.id || post.slug}
            style={{
              background: "#f9f9f9",
              padding: "1.25rem",
              borderRadius: "6px",
              border: "1px solid #ddd",
            }}
          >
            {/* Clickable link pointing to the individual Astro MDX page route */}
            <a
              href={`/post/${post.slug}`}
              style={{ textDecoration: "none", color: "#0070f3" }}
            >
              <h3 style={{ margin: "0 0 0.5rem 0" }}>{post.title} &rarr;</h3>
            </a>

            <p style={{ margin: "0 0 0.5rem 0", color: "#666" }}>
              {post.description}
            </p>
            <small style={{ color: "#888" }}>
              Autor: {post.author} | Fecha: {post.pubDate}
            </small>
          </li>
        ))}
      </ul>

      {/* Modal para Crear Post */}
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
              maxHeight: "90vh",
              overflowY: "auto",
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
              <h2 style={{ margin: 0 }}>Nuevo Post</h2>
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

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.3rem",
                    fontWeight: 500,
                  }}
                >
                  Slug:
                </label>
                <input
                  type="text"
                  name="slug"
                  value={form.slug}
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
                  rows="6"
                  value={form.content}
                  onChange={handleChange}
                  required
                  placeholder="## Título de sección..."
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    boxSizing: "border-box",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              </div>

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
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    boxSizing: "border-box",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              </div>

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
                  type="text"
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

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.3rem",
                    fontWeight: 500,
                  }}
                >
                  URL de Imagen:
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

              <button
                type="submit"
                disabled={loading}
                style={{
                  background: "#0070f3",
                  color: "white",
                  padding: "0.75rem",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                {loading ? "Guardando..." : "Crear Post"}
              </button>
            </form>

            {mensaje.text && (
              <p
                style={{
                  marginTop: "1rem",
                  textAlign: "center",
                  color: mensaje.type === "green" ? "green" : "red",
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
