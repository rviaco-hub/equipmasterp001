import React, { useState } from "react";


const AuthModal = ({ SetVisibleApp, SetUser, SetIdUser, isOpen, onClose }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ cedula: "", nombre: "" });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const target = e.target;
    const { name, value } = target;
    // Validación directa: solo números permitidos para "cedula"
    if (name === "cedula") {
      // Evita caracteres que no sean dígitos (0-9)
      if (!/^\d*$/.test(value)) return;
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.cedula || !form.nombre) {
      alert("Por favor completa todos los campos.");
      return;
    }

    // Definimos endpoint según la acción (login / registro)
    const endpoint = isRegister ? "register" : "login";

    // Usa una URL base flexible para balanceo y despliegue
    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
        // Permite credenciales y CORS correcto para varios frontends
        mode: "cors",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error en la solicitud");
      }
      else {
        SetVisibleApp(true)
        SetUser(form.nombre)
        SetIdUser(form.cedula)
      }

      console.log("Respuesta del servidor:", data);

      alert(data.message || `${isRegister ? "Registro" : "Inicio de sesión"} exitoso`);
      onClose();
    } catch (error) {
      console.error("Error al conectar con el backend:", error);
      alert("No se pudo conectar con el servidor. Intenta nuevamente más tarde.");
    }
  };

  const testBackend = async () => {
    const response = await fetch("https://apiequipmaster.onrender.com/api/users/test", {
      method: "GET",
      mode: "cors",
    });
    console.log(response);
  }


  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close" onClick={onClose}>✖</button>

        <h2>{isRegister ? "Registro de Usuario" : "Inicio de Sesión"}</h2>
        <p>
          {isRegister
            ? "Crea tu cuenta para acceder al sistema de capacitaciones."
            : "Ingresa tus datos para continuar."}
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>Cédula</label>
          <input
            type="text"
            name="cedula"
            placeholder="Ingresa tu número de cédula"
            value={form.cedula}
            onChange={handleChange}
            maxLength={15}
            inputMode="numeric" // mejora la experiencia móvil
            pattern="\d*"
          />

          <label>Nombre Completo</label>
          <input
            type="text"
            name="nombre"
            placeholder="Ingresa tu nombre completo"
            value={form.nombre}
            onChange={handleChange}
          />

          <button type="submit" className="auth-btn">
            {isRegister ? "Registrarse" : "Ingresar"}
          </button>
        </form>

        <div className="auth-toggle">
          {isRegister ? (
            <p>
              ¿Ya tienes cuenta?{" "}
              <span onClick={() => setIsRegister(false)}>Inicia sesión</span>
            </p>
          ) : (
            <p>
              ¿No tienes cuenta?{" "}
              <span onClick={() => setIsRegister(true)}>Regístrate</span>
            </p>
          )}
        </div>
        <a onClick={() => testBackend()}>test backend</a>
      </div>
    </div>
  );
};

export default AuthModal;
