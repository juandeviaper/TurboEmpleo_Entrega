import React from "react";

const DashboardAspirante = () => {
  // Intenta obtener los datos del usuario desde localStorage
  let nombre = "Aspirante";
  let apellido = "";
  try {
    const userData = JSON.parse(localStorage.getItem("user_data"));
    if (userData && userData.asp_nombre) {
      nombre = userData.asp_nombre;
      apellido = userData.asp_apellido || "";
    }
  } catch (e) {}

  return (
    <div>
      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", textAlign: "center", marginTop: "2rem" }}>
        ¡Bienvenido, {nombre} {apellido}!
      </h1>
      {/* Aquí puedes agregar más widgets, estadísticas o información relevante para el aspirante */}
    </div>
  );
};

export default DashboardAspirante;
