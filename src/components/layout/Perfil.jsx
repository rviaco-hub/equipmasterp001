import React, { useState, useEffect } from "react";

const PerfilUsuario = ({ userData,setUserData, idUser, API_BASE_URL }) => {
    const [loading, setLoading] = useState(true)
    const [mensaje, setMensaje] = useState("");

    // 1️⃣ CONSULTAR
    useEffect(() => {
        if (!idUser) return;
    
        const fetchUserData = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/perfil/${idUser}`);
                const data = await res.json();

                setUserData({
                    idUser: data.cedula || 0,
                    user: data.nombre || "",
                    cargo: data.cargo || "",
                    ciudad: data.ciudad || "",
                    rolUser: data.rol || false,
                });
                
                

                setLoading(false);

            } catch (error) {
                console.error("Error consultando usuario:", error);
                setLoading(false);
            }
        };

        fetchUserData();
    }, [idUser]);

    // 2️⃣ INPUT
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
        console.log(userData);
        
    };

    // 3️⃣ GUARDAR
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje("");

        try {
            const res = await fetch(`${API_BASE_URL}/api/perfil/${userData.idUser}`, {
                method: "POST",   // tú usas POST en router
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const data = await res.json();

            if (res.ok) {
                setMensaje("Perfil actualizado correctamente ✔️");
                setUserData({
                    ...userData,
                    user: userData.nombre,
                    cargo: userData.cargo,
                    ciudad: userData.ciudad,
                });
            } else {
                setMensaje("Error al actualizar ❌ " + data.message);
            }

        } catch (error) {
            console.error(error);
            setMensaje("Error en el servidor ❗");
        }
    };

    if (loading) return <p>Cargando datos ...</p>;

    return (
        <div style={{ padding: "20px", maxWidth: "500px" }}>
            <h2>Perfil de Usuario</h2>

            {mensaje && <p><strong>{mensaje}</strong></p>}

            <form onSubmit={handleSubmit}>

                <label>Cédula</label>
                <input
                    type="text"
                    value={userData.idUser}
                    disabled
                    style={{ width: "100%", marginBottom: "10px" }}
                />

                <label>Nombre completo</label>
                <input
                    type="text"
                    name="nombre"
                    value={userData.user}
                    onChange={handleChange}
                    style={{ width: "100%", marginBottom: "10px" }}
                />

                <label>Cargo</label>
                <input
                    type="text"
                    name="cargo"
                    value={userData.cargo}
                    onChange={handleChange}
                    style={{ width: "100%", marginBottom: "10px" }}
                />

                <label>Ciudad</label>
                <input
                    type="text"
                    name="ciudad"
                    value={userData.ciudad}
                    onChange={handleChange}
                    style={{ width: "100%", marginBottom: "10px" }}
                />

                <button type="submit">Guardar cambios</button>
            </form>
        </div>
    );
};

export default PerfilUsuario;
