import { useState } from "react";
import { apiPosts } from "../../api/posts";

// function generateSlug(title) {
//   return title
//     .toLowerCase()
//     .normalize("NFD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/^-+|-+$/g, "");
// }

export default function PostManager({ initialPosts }) {
  const [posts, setPosts] = useState(initialPosts || []);
  const [isOpen, setIsOpen] = useState(false);
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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOpenCreate = () => {
    setForm({
      title: "",
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
      // const postData = {
      //   ...form,
      //   slug: generateSlug(form.title),
      // };
      const newPost = await apiPosts.createPost(form);
      setPosts([newPost, ...posts]);
      setMensaje({ text: "¡Post creado con éxito!", type: "green" });

      setTimeout(() => {
        setIsOpen(false);
        setForm({
          title: "",
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
                  Contenido (Markdown):
                </label>
                <textarea
                  name="content"
                  rows="6"
                  value={form.content}
                  onChange={handleChange}
                  required
                  placeholder="Contenido"
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
