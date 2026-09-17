export default function ProductCard({ product, onEdit }) {
  return (
    <div
      style={{
        position: "relative",
        border: "1px solid #eaeaea",
        borderRadius: "8px",
        padding: "1rem",
        background: "#fff",
      }}
    >
      <button
        onClick={() => onEdit(product)}
        title="Editar producto"
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "white",
          border: "1px solid #ccc",
          borderRadius: "50%",
          width: "32px",
          height: "32px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        ✏️
      </button>

      <img
        src={product.thumbnail || "https://via.placeholder.com/150"}
        alt={product.title}
        style={{
          width: "100%",
          height: "150px",
          objectFit: "cover",
          borderRadius: "4px",
        }}
      />
      <h3 style={{ margin: "0.5rem 0", fontSize: "1.1rem" }}>
        {product.title}
      </h3>
      <p style={{ color: "#666", fontSize: "0.9rem" }}>
        {product.description
          ? product.description.slice(0, 60) + "..."
          : "Producto agregado desde la demo."}
      </p>
      <p style={{ fontWeight: "bold", color: "#0070f3" }}>
        ${product.price}
      </p>
    </div>
  );
}
