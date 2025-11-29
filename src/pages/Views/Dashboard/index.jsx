import React, { useMemo, useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const Dashboard = ({ trabajadores = [] }) => {

  // ============================
  //   SECTION DATOS TRABAJADORES
  // ============================

  const totalTrabajadores = trabajadores.length;

  const cobertura = useMemo(() => {
    if (totalTrabajadores === 0) return 0;
    return (50 / totalTrabajadores).toFixed(2);
  }, [totalTrabajadores]);

  const eficiencia = useMemo(() => {
    if (totalTrabajadores === 0) return 0;
    const suma = trabajadores.reduce(
      (acc, t) => acc + (Number(t.puntaje) || 0),
      0
    );
    return (suma / totalTrabajadores).toFixed(2);
  }, [trabajadores, totalTrabajadores]);

  const promedioCapacitacion = eficiencia;

  // ============================
  //   SECTION VIDEOS
  // ============================

  const [videos, setVideos] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [videoTitulo, setVideoTitulo] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [videoFile, setVideoFile] = useState(null);

  const API_BASE_URL = "http://localhost:5000";

  // ============================
  // GET videos
  // ============================
  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    fetch(`${API_BASE_URL}/api/videos/capacitacion`)
      .then((response) => response.json())
      .then((data) => setVideos(data))
      .catch(() => setVideos([]));
  };

  const resetDialog = () => {
    setVideoTitulo("");
    setVideoURL("");
    setVideoFile(null);
    setOpenDialog(false);
  };

  // ============================
  // ADD video -> URL
  // ============================
  const handleAddVideoURL = async () => {
    if (!videoTitulo.trim()) {
      alert("Debe ingresar un título");
      return;
    }
    if (!videoURL.trim()) {
      alert("Debe ingresar una URL");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/videos/capacitacion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: videoTitulo.trim(),
          url: videoURL.trim(),
        }),
      });

      if (!res.ok) {
        alert("Error al guardar el video en el servidor");
        return;
      }

      alert("Video agregado correctamente");
    } catch (error) {
      console.error(error);
      alert("No se pudo conectar con el servidor");
    }

    refreshData();
    resetDialog();
  };

  // ============================
  // ADD video -> archivo local
  // ============================
  const handleAddVideoFile = async () => {
    if (!videoTitulo.trim()) {
      alert("Debe ingresar un título");
      return;
    }
    if (!videoFile) {
      alert("Debe seleccionar un archivo de video");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", videoFile);
      formData.append("titulo", videoTitulo.trim());

      const res = await fetch(`${API_BASE_URL}/api/videos/capacitacion`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        alert("Error al subir el video en el servidor");
        return;
      }

      alert("Video subido correctamente");
    } catch (error) {
      console.error(error);
      alert("No se pudo conectar con el servidor");
    }

    refreshData();
    resetDialog();
  };

  // ============================
  // DELETE video
  // ============================
  const handleDeleteVideo = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este video?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/videos/capacitacion/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        alert("Error al eliminar el video");
        return;
      }

      alert("Video eliminado correctamente");
    } catch (error) {
      console.log(error);
      alert("No se pudo conectar con el servidor");
    }

    refreshData();
  };

  return (
    <section className="container">
      <h2 className="section-title">Dashboard</h2>
      <p className="section-subtitle">
        Explora nuestras capacitaciones disponibles en Seguridad y Salud en el Trabajo
      </p>

      {/* ========== TABLA TRABAJADORES ========== */}
      <TableContainer component={Paper} sx={{ width: "100%", overflowX: "auto" }}>
        <Table aria-label="tabla de trabajadores" size="small">
          <TableHead>
            <TableRow>
              <TableCell><b>Nombre completo</b></TableCell>
              <TableCell><b>Cédula</b></TableCell>
              <TableCell><b>Cargo</b></TableCell>
              <TableCell><b>Ciudad</b></TableCell>
              <TableCell><b>Puntaje de capacitación</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trabajadores.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} style={{ textAlign: "center" }}>
                  No hay datos registrados aún
                </TableCell>
              </TableRow>
            ) : (
              trabajadores.map((t, index) => (
                <TableRow key={index}>
                  <TableCell>{t.nombreCompleto || "-"}</TableCell>
                  <TableCell>{t.cedula || "-"}</TableCell>
                  <TableCell>{t.cargo || "-"}</TableCell>
                  <TableCell>{t.ciudad || "-"}</TableCell>
                  <TableCell>{t.puntaje || 0}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ========== CARDS CALCULOS ========== */}
      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Cobertura</Typography>
              <Typography variant="body1">{cobertura}%</Typography>
              <Typography variant="caption">(50 / cantidad de trabajadores)</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Eficiencia</Typography>
              <Typography variant="body1">{eficiencia}</Typography>
              <Typography variant="caption">Promedio del puntaje general</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Capacitación</Typography>
              <Typography variant="body1">{promedioCapacitacion}</Typography>
              <Typography variant="caption">Promedio similar a la eficiencia</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ========== TABLA VIDEOS ========== */}

      <h3 style={{ marginTop: "30px" }}>Videos de capacitación</h3>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenDialog(true)}
        sx={{ marginBottom: "10px" }}
      >
        + Agregar video
      </Button>

      <TableContainer component={Paper} sx={{ width: "100%", overflowX: "auto" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell><b>Título</b></TableCell>
              <TableCell><b>Enlace</b></TableCell>
              <TableCell><b>Acciones</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {videos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} style={{ textAlign: "center" }}>
                  No hay videos aún
                </TableCell>
              </TableRow>
            ) : (
              videos.map((v, i) => (
                <TableRow key={i}>
                  <TableCell>{v.titulo}</TableCell>
                  <TableCell>
                    {v.url ? (
                      <a href={v.url} target="_blank" rel="noopener noreferrer">Ver video</a>
                    ) : (
                      <a href={`/data/videos/${v.filename}`} target="_blank" rel="noopener noreferrer">Ver video</a>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button color="error" onClick={() => handleDeleteVideo(v.id)} size="small">
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ============================
       MODAL
      ============================ */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Agregar nuevo video</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            fullWidth
            label="Titulo del video"
            variant="outlined"
            value={videoTitulo}
            onChange={(e) => setVideoTitulo(e.target.value)}
          />

          <p>🔹 O pega una URL:</p>
          <TextField
            margin="dense"
            fullWidth
            label="URL (Youtube o otra)"
            variant="outlined"
            value={videoURL}
            onChange={(e) => setVideoURL(e.target.value)}
          />

          <p>🔹 O selecciona archivo de video local:</p>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files[0])}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={resetDialog}>Cancelar</Button>

          {videoFile && (
            <Button variant="contained" onClick={handleAddVideoFile}>
              Subir archivo
            </Button>
          )}

          {videoURL && !videoFile && (
            <Button variant="contained" onClick={handleAddVideoURL}>
              Guardar URL
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </section>
  );
};

export default Dashboard;
