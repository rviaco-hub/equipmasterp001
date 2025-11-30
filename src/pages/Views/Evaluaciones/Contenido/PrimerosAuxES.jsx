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

const preguntas = [
  {
    id: 1,
    pregunta:
      "1. ¿Cuál es el principio primordial y la primera acción que debe tomar un socorrista al llegar a la escena de una emergencia, según el video? (0:09)",
    opciones: {
      A: "A. Acercarse de inmediato a la víctima para verificar su consciencia.",
      B: "B. Yo seguro, tú seguro, evaluando el entorno por peligros.",
      C: "C. Llamar inmediatamente al 123 y pedir asistencia médica.",
      D: "D. Ninguna de las anteriores",
    },
    correcta: "B",
  },
  {
    id: 2,
    pregunta:
      "2. ¿Qué peligros específicos menciona el video que deben evaluarse en el entorno antes de acercarse a la víctima? (0:13)",
    opciones: {
      A: "A. Caídas de objetos o presencia de gases tóxicos.",
      B: "B. Fuego o cables sueltos.",
      C: "C. Vehículos en movimiento o superficies resbaladizas.",
      D: "D. Ninguna de las anteriores",
    },
    correcta: "B",
  },
  {
    id: 3,
    pregunta:
      "3. Una vez asegurada la escena, ¿cuál es el método recomendado para verificar la consciencia de la víctima? (0:27)",
    opciones: {
      A: "A. Hablarle en voz alta y pellizcar su brazo.",
      B: "B. Tocar sus hombros y preguntarle: \"¿Está bien, señor?\"",
      C: "C. Revisar su pulso y su respiración inmediatamente.",
      D: "D. Ninguna de las anteriores",
    },
    correcta: "B",
  },
  {
    id: 4,
    pregunta:
      "4. En caso de que la víctima no responda, ¿cuál es el número de emergencia unificado que se debe marcar en Colombia? (0:36)",
    opciones: {
      A: "A. 911",
      B: "B. 119",
      C: "C. 123",
      D: "D. Ninguna de las anteriores",
    },
    correcta: "C",
  },
  {
    id: 5,
    pregunta:
      "5. Si hay personas cerca y la víctima no responde, ¿qué debe hacer el socorrista antes de iniciar otras acciones? (0:40)",
    opciones: {
      A: "A. Iniciar la Reanimación Cardiopulmonar (RCP).",
      B: "B. Señalar a una persona y pedirle que llame al 123, dando ubicación y situación.",
      C: "C. Buscar un botiquín de primeros auxilios.",
      D: "D. Ninguna de las anteriores",
    },
    correcta: "B",
  },
];

const PrimerosAuxES = () => {
  const [respuestas, setRespuestas] = useState({}); // { [id]: 'A'|'B'|'C'|'D' }
  const [enviado, setEnviado] = useState(false);
  const [puntaje, setPuntaje] = useState(0);

  const manejarCambio = (id, valor) => {
    setRespuestas((prev) => ({ ...prev, [id]: valor }));
  };

  const handleSubmit = () => {
    let correctas = 0;
    preguntas.forEach((p) => {
      if (respuestas[p.id] === p.correcta) correctas += 1;
    });
    setPuntaje(correctas);
    setEnviado(true);
    // Si necesitas enviar resultados a un servidor, hacerlo aquí (fetch/axios).
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
      <Typography variant="h5" sx={{ mb: 2 }}>
        Cuestionario de capacitación
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
    </Box>
  );
};

export default PrimerosAuxES;
