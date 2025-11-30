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
  const [openPlayer, setOpenPlayer] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(null);


  useEffect(() => {
    console.log(videos)
  }, [videos]);


  const API_BASE_URL = import.meta.env.VITE_API_URL // "http://localhost:5000";

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
      .catch((error) => {
        console.log(error);
        setVideos([])
      });
  };


  return (
    <section className="container">
      {/* ========== TABLA VIDEOS ========== */}

      <h3 style={{ margin: "30px 0" }}>Videos de capacitación</h3>


      <TableContainer component={Paper} sx={{ width: "100%", overflowX: "auto" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell><b>Título</b></TableCell>
              <TableCell><b>Enlace</b></TableCell>
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
                  <TableCell>{v.title}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        setVideoPlaying(v);
                        setOpenPlayer(true);
                      }}
                    >
                      Ver video
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

      <Dialog
        open={openPlayer}
        onClose={() => setOpenPlayer(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{videoPlaying?.title}</DialogTitle>

        <DialogContent>
          {videoPlaying && (
            <video
              style={{
                width: "80vw",
                maxWidth: "80vw",
                height: "80vh",
                maxHeight: "80vh",
                objectFit: "contain",
                backgroundColor: "black",
              }}
              controls
              autoPlay
              src={
                videoPlaying.url
                  ? videoPlaying.url
                  : `https://servervvdeofree.onrender.com/videos/${videoPlaying.id}/file`
              }
              type="video/mp4"
            />
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenPlayer(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>


    </section>
  );
};

export default Dashboard;
