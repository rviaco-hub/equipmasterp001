import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
  Grid,
  Divider,
  Chip,
  Dialog, DialogTitle, DialogContent, DialogActions
} from "@mui/material";

/**
 * Componente: CuestionarioCapacitacion
 * - Preguntas tal cual fueron provistas (no se modificó ningún texto de las preguntas).
 * - Selección única (A / B / C / D) por pregunta.
 * - Responsive usando MUI Grid y sx responsivo.
 * - Al enviar muestra aciertos/errores y la respuesta correcta.
 *
 * Usa este componente directamente en tu aplicación. No depende de código externo.
 */



const ControlIncendios = ({userData, preguntas }) => {
  const [respuestas, setRespuestas] = useState({}); // { [id]: 'A'|'B'|'C'|'D' }
  const [enviado, setEnviado] = useState(false);
  const [puntaje, setPuntaje] = useState(0);

  const [openModal, setOpenModal] = useState(false);
  const [preguntasMalas, setPreguntasMalas] = useState([]);
  const [porcentaje, setPorcentaje] = useState(0);
  const [nota, setNota] = useState(0);


  const manejarCambio = (id, valor) => {
    setRespuestas((prev) => ({ ...prev, [id]: valor }));
  };

  const handleSubmit = () => {

  const isInvalid = (value) =>
    !value ||                     // null, undefined, vacío
    typeof value !== "string" ||  // no es string
    !value.trim() ||              // contiene solo espacios
    /\d/.test(value);             // contiene números

  if (isInvalid(userData?.cargo) || isInvalid(userData?.ciudad)) {
    alert("Los datos deben actualizarse para continuar");
    return;
  }


    let correctas = 0;
    let malas = [];

    preguntas.forEach((p) => {
      const r = respuestas[p.id];
      if (r === p.correcta) {
        correctas += 1;
      } else {
        malas.push(p);
      }
    });

    setPuntaje(correctas);
    setPreguntasMalas(malas);

    const pct = Math.round((correctas / preguntas.length) * 100);
    const notaFinal = (correctas / preguntas.length) * 5;

    setPorcentaje(pct);
    setNota(notaFinal.toFixed(1));

    setEnviado(true);
    setOpenModal(true);
  };

  const handleReset = () => {
    setRespuestas({});
    setEnviado(false);
    setPuntaje(0);
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "95%", md: "900px" },
        mx: "auto",
        my: 3,
        px: { xs: 1, sm: 2, md: 0 },
      }}
    >
      <Typography variant="h5" sx={{ mb: 2, padding: "30px 0" }}>
        Cuestionario control de incendios
      </Typography>

      <Grid container spacing={2}>
        {preguntas.map((p) => {
          const seleccion = respuestas[p.id] || "";
          const esCorrecta = enviado && seleccion === p.correcta;
          const esIncorrecta = enviado && seleccion && seleccion !== p.correcta;

          return (
            <Grid item xs={12} key={p.id}>
              <Card variant="outlined" sx={{ p: 0 }}>
                <CardContent>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={12} sm={10}>
                      <Typography variant="subtitle1" sx={{ mb: 1 }}>
                        {p.pregunta}
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sm={2}
                      sx={{
                        display: "flex",
                        justifyContent: { xs: "flex-start", sm: "flex-end" },
                      }}
                    >
                      {enviado && (
                        <Chip
                          label={
                            esCorrecta
                              ? `Correcto`
                              : seleccion
                                ? `Incorrecto`
                                : `Sin respuesta`
                          }
                          color={esCorrecta ? "success" : esIncorrecta ? "error" : "default"}
                          size="small"
                        />
                      )}
                    </Grid>

                    <Grid item xs={12}>
                      <Divider sx={{ my: 1 }} />
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl component="fieldset" fullWidth>
                        <RadioGroup
                          value={seleccion}
                          onChange={(e) => manejarCambio(p.id, e.target.value)}
                        >
                          <Grid container spacing={1}>
                            {Object.entries(p.opciones).map(([key, text]) => {
                              const resaltadoRespuestaCorrecta =
                                enviado && key === p.correcta;
                              return (
                                <Grid item xs={12} sm={6} key={key}>
                                  <FormControlLabel
                                    value={key}
                                    control={<Radio />}
                                    label={
                                      <Typography
                                        variant="body2"
                                        sx={{
                                          fontWeight:
                                            resaltadoRespuestaCorrecta && enviado ? 700 : 400,
                                        }}
                                      >
                                        {text}
                                      </Typography>
                                    }
                                    sx={{
                                      border:
                                        enviado && key === p.correcta
                                          ? "1px solid rgba(0,0,0,0.08)"
                                          : "none",
                                      borderRadius: 1,
                                      p: 1,
                                      bgcolor:
                                        enviado && key === p.correcta
                                          ? "rgba(0,255,0,0.06)"
                                          : (enviado &&
                                            respuestas[p.id] === key &&
                                            respuestas[p.id] !== p.correcta) ||
                                            false
                                            ? "rgba(255,0,0,0.04)"
                                            : "transparent",
                                    }}
                                  />
                                </Grid>
                              );
                            })}
                          </Grid>
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          justifyContent: "flex-end",
          mt: 3,
        }}
      >
        <Button variant="outlined" onClick={handleReset}>
          Reiniciar
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={enviado}
        >
          Enviar respuestas
        </Button>
      </Box>

      {enviado && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">
            Resultado: {puntaje} / {preguntas.length}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {puntaje === preguntas.length
              ? "Excelente — todas las respuestas son correctas."
              : "Revisa las preguntas marcadas como incorrectas y consulta el material."}
          </Typography>
        </Box>
      )}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="md" fullWidth>
        <DialogTitle>Resultados del cuestionario</DialogTitle>

        <DialogContent>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {porcentaje}% de las preguntas se han respondido correctamente
          </Typography>

          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Tu puntaje es: {nota} sobre 5.0
          </Typography>

          {preguntasMalas.length > 0 && (
            <>
              <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                Preguntas incorrectas:
              </Typography>

              {preguntasMalas.map((p) => (
                <Box key={p.id} sx={{ mb: 2 }}>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {p.pregunta}
                  </Typography>
                  <Divider sx={{ mt: 1 }} />
                </Box>
              ))}
            </>
          )}

          {preguntasMalas.length === 0 && (
            <Typography variant="body1" sx={{ mt: 1 }}>
              🎉 ¡Excelente! No cometiste errores.
            </Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default ControlIncendios;
