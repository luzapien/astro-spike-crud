import { useState } from "react";
import { apiProducts } from "../../api/products";

export default function HeaderEditor({ initialHeader }) {
  const [header, setHeader] = useState(initialHeader);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Manejar cambio de imagen local para el header
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setHeader({ ...header, heroImage: objectUrl });
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await apiProducts.editLanding(header);
      setIsEditing(false);
    } catch (error) {
      console.error("Error al actualizar el header:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <header
      style={{
        position: "relative",
        backgroundImage: `url(${header.heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "300px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        textShadow: "0 2px 4px rgba(0,0,0,0.5)",
      }}
    >
      <h1>{header.title}</h1>

      <button
        onClick={() => setIsEditing(!isEditing)}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          background: "#fff",
          color: "#333",
          padding: "0.5rem 1rem",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          zIndex: 10,
        }}
      >
        {isEditing ? "Cerrar Edición" : "✏️ Editar Header"}
      </button>

      {isEditing && (
        <div
          style={{
            position: "absolute",
            top: "70px",
            right: "20px",
            background: "#fff",
            color: "#333",
            padding: "1rem",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
            zIndex: 10,
          }}
        >
          <h4 style={{ margin: "0 0 0.5rem 0" }}>Cambiar Imagen de Header</h4>
          <div>
            <label>Editar titulo</label>
            <input
              type="text"
              value={header.title}
              onChange={(e) => setHeader({ ...header, title: e.target.value })}
            />
          </div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          <button
            onClick={handleSave}
            disabled={loading}
            style={{
              display: "block",
              width: "100%",
              marginTop: "0.5rem",
              background: "#28a745",
              color: "#fff",
              border: "none",
              padding: "0.5rem",
              borderRadius: "4px",
              cursor: "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      )}
    </header>
  );
}
