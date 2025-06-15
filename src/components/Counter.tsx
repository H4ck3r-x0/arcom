import { useState } from "react";

interface CounterProps {
  initialCount?: number;
}

export default function Counter({ initialCount = 0 }: CounterProps) {
  const [count, setCount] = useState(initialCount);

  return (
    <div
      className="counter-container"
      style={{
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        textAlign: "center",
        maxWidth: "300px",
        margin: "1rem auto",
      }}
    >
      <h3>React Counter</h3>
      <p style={{ fontSize: "2rem", margin: "1rem 0" }}>{count}</p>
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
        <button
          onClick={() => setCount(count - 1)}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#f87171",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          -
        </button>
        <button
          onClick={() => setCount(count + 1)}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#34d399",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          +
        </button>
      </div>
      <button
        onClick={() => setCount(0)}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#6b7280",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginTop: "1rem",
        }}
      >
        Reset
      </button>
    </div>
  );
}
