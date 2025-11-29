import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Button,
  Modal,
  Box,
  TextField,
  Typography
} from "@mui/material";

const TablaVideos = ({ videos, setVideos }) => {
  const [open, setOpen] = useState(false);
  const [nuevoTitulo, setNuevoTitulo] = useState("");
  const [nuevoURL, setNuevoURL] = useState("");

  const handleAgregar = () => {
    if (!nuevoTitulo || !nuevoURL) return alert("Completa los campos");
    setVideos([...videos, { titulo: nuevoTitulo, url: nuevoURL }]);
    setNuevoTitulo("");
    setNuevoURL("");
    setOpen(false);
  };

  const handleEliminar = (index) => {
    const nuevaLista = videos.filter((_, i) => i !== index);
    setVideos(nuevaLista);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ width: "100%", marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Título</b></TableCell>
              <TableCell><b>URL</b></TableCell>
              <TableCell><b>Eliminar</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {videos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} style={{ textAlign: "center" }}>
                  No hay videos agregados
                </TableCell>
              </TableRow>
            ) : (
              videos.map((video, index) => (
                <TableRow key={index}>
                  <TableCell>{video.titulo}</TableCell>
                  <TableCell>{video.url}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleEliminar(index)}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Button variant="contained" sx={{ marginTop: "10px" }} onClick={() => setOpen(true)}>
        + Agregar Video
      </Button>

      {/* MODAL */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          background: "white",
          padding: "20px",
          width: "400px",
          borderRadius: "8px"
        }}>
          <Typography variant="h6">Agregar nuevo video</Typography>
          <TextField
            label="Título"
            fullWidth
            margin="normal"
            value={nuevoTitulo}
            onChange={(e) => setNuevoTitulo(e.target.value)}
          />
          <TextField
            label="URL del video"
            fullWidth
            margin="normal"
            value={nuevoURL}
            onChange={(e) => setNuevoURL(e.target.value)}
          />
          <Button variant="contained" fullWidth sx={{ marginTop: "10px" }} onClick={handleAgregar}>
            Guardar
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default TablaVideos;
