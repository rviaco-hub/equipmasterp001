import React, { useEffect, useState } from "react";
import PrimerosAuxES from "./Contenido/PrimerosAuxES";
import ControlIncendios from "./Contenido/ControlIncendios";
import BrigadistaSI from "./Contenido/BrigadistaSI";
import { Box, Button, Typography } from "@mui/material";



const Evaluaciones = ({ userData, API_BASE_URL }) => {
  const [visibleFormPrimerosAuxES, setVisibleFormPrimerosAuxES] = useState("block")
  const preguntasFormPrimerosAuxES = [
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
  const [visibleFormControlIncendios, setVisibleFormControlIncendios] = useState("none")
  const preguntasFormControlIncendios = [
    {
      id: 1,
      pregunta:
        "1. ¿Cuáles son los tres elementos esenciales representados en el Triángulo del Fuego? (0:05)",
      opciones: {
        A: "A. Nitrógeno, Calor y Combustible.",
        B: "B. Fuego, Humo y Calor.",
        C: "C. Calor, Combustible y Oxígeno.",
        D: "D. Ninguna de las anteriores",
      },
      correcta: "C",
    },
    {
      id: 2,
      pregunta:
        "2. ¿Qué ocurre si se elimina uno de los tres elementos esenciales del Triángulo del Fuego? (0:17)",
      opciones: {
        A: "A. El fuego se controla, pero no se extingue.",
        B: "B. El fuego no puede mantenerse.",
        C: "C. Solo se reduce la velocidad de la combustión.",
        D: "D. Ninguna de las anteriores",
      },
      correcta: "B",
    },
    {
      id: 3,
      pregunta:
        "3. En la técnica T.A.P.E. para usar un extintor, ¿qué significa la \"T\"? (0:26)",
      opciones: {
        A: "A. Talar el área alrededor del fuego.",
        B: "B. Tirar (retirar) el pasador de seguridad del extintor.",
        C: "C. Taponar la base del fuego.",
        D: "D. Ninguna de las anteriores",
      },
      correcta: "B",
    },
    {
      id: 4,
      pregunta:
        "4. ¿Hacia dónde debe dirigirse la boquilla del extintor al momento de aplicar el agente extintor, según la técnica T.A.P.E. (\"A\" de Apuntar)? (0:33)",
      opciones: {
        A: "A. Hacia la parte superior de las llamas.",
        B: "B. Hacia la base del fuego.",
        C: "C. Hacia el centro exacto del foco del incendio.",
        D: "D. Ninguna de las anteriores",
      },
      correcta: "B",
    },
    {
      id: 5,
      pregunta:
        "5. ¿Qué indica la \"E\" (Esparcir) en la técnica T.A.P.E.? (0:43)",
      opciones: {
        A: "A. Espere a que el fuego se apague por sí solo antes de retirarse.",
        B: "B. Mueva la boquilla de lado a lado, cubriendo toda la base del fuego hasta que se apague.",
        C: "C. Esparza el agente extintor únicamente sobre las llamas más altas.",
        D: "D. Ninguna de las anteriores",
      },
      correcta: "B",
    },
  ];
  const [visibleFormBrigadistaSI, setVisibleFormBrigadistaSI] = useState("none")
  const preguntasFormBrigadistaSI = [
    {
      id: 1,
      pregunta:
        "1. Según el video, ¿en qué se fundamenta el programa de formación integral de brigadistas en el entorno laboral colombiano? (0:09)",
      opciones: {
        A: "A. En el cumplimiento de los estándares de la OIT y la ARL.",
        B: "B. En la normativa legal vigente, incluyendo la Resolución 0312 y el Decreto 1072.",
        C: "C. En manuales internacionales de respuesta a emergencias y rescate.",
        D: "D. Ninguna de las anteriores",
      },
      correcta: "B",
    },
    {
      id: 2,
      pregunta:
        "2. ¿Cuáles son los tres módulos clave que abarca el entrenamiento esencial de brigadistas? (0:24)",
      opciones: {
        A: "A. Soporte Básico de Vida, Manejo de Extintores y Evacuación.",
        B: "B. Primeros Auxilios, Control de Incendios y Evacuación y Rescate.",
        C: "C. Medicina, Seguridad Industrial e Higiene Ocupacional.",
        D: "D. Ninguna de las anteriores",
      },
      correcta: "B",
    },
    {
      id: 3,
      pregunta:
        "3. ¿Qué técnicas vitales se aprenderán en el módulo de Primeros Auxilios? (0:33)",
      opciones: {
        A: "A. Manejo de fracturas, inmovilización y el protocolo de bioseguridad.",
        B: "B. Técnicas vitales como RCP, cuidado de heridas y el protocolo ABC.",
        C: "C. Control de hemorragias masivas y uso de desfibriladores (DEA).",
        D: "D. Ninguna de las anteriores",
      },
      correcta: "B",
    },
    {
      id: 4,
      pregunta:
        "4. ¿Cuál es la función principal del módulo de Control de Incendios para el brigadista? (0:43)",
      opciones: {
        A: "A. Dirigir la evacuación total del personal en caso de incendio.",
        B: "B. Capacitar en el uso correcto de extintores y la comprensión del triángulo del fuego.",
        C: "C. Identificar y eliminar las fuentes de calor y combustible.",
        D: "D. Ninguna de las anteriores",
      },
      correcta: "B",
    },
    {
      id: 5,
      pregunta:
        "5. ¿Qué enseña el módulo de Evacuación y Rescate? (0:52)",
      opciones: {
        A: "A. La clasificación y el uso de todos los equipos de salvamento disponibles.",
        B: "B. Establecer rutas seguras, puntos de reunión y técnicas de rescate.",
        C: "C. La normativa para el reporte de emergencias ante las autoridades.",
        D: "D. Ninguna de las anteriores",
      },
      correcta: "B",
    },
  ];

  const mostrarForm = (form) => {
    setVisibleFormPrimerosAuxES("none");
    setVisibleFormControlIncendios("none");
    setVisibleFormBrigadistaSI("none");

    if (form === "primeros") setVisibleFormPrimerosAuxES("block");
    if (form === "incendios") setVisibleFormControlIncendios("block");
    if (form === "brigadista") setVisibleFormBrigadistaSI("block");
  };


  return (
    <section style={{ margin: "100px 0" }}>

      {/* 📌 ÍNDICE DE SECCIONES */}
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",   // móviles → 1 columna
            sm: "1fr 1fr", // tablets → 2 columnas (opcional)
            md: "1fr 1fr 1fr", // escritorio → 3 columnas
          },
          gap: 0.5,
        }}
      >
        <Button style={{ color: "red", backgroundColor: "#ddd" }} onClick={() => mostrarForm("primeros")}>Primeros Auxilios</Button>
        <Button style={{ color: "red", backgroundColor: "#ddd" }} onClick={() => mostrarForm("incendios")}>Control de Incendios</Button>
        <Button style={{ color: "red", backgroundColor: "#ddd" }} onClick={() => mostrarForm("brigadista")}>Brigadista</Button>
      </Box>
      
      <Typography>{userData.user}</Typography>
      <Typography> {userData.cargo}</Typography>



      <div style={{ display: visibleFormPrimerosAuxES }} >
        <PrimerosAuxES API_BASE_URL={API_BASE_URL} userData={userData} preguntas={preguntasFormPrimerosAuxES} />
      </div>
      <div style={{ display: visibleFormControlIncendios }} >
        <ControlIncendios API_BASE_URL={API_BASE_URL} userData={userData} preguntas={preguntasFormControlIncendios} />
      </div>
      <div style={{ display: visibleFormBrigadistaSI }} >
        <BrigadistaSI API_BASE_URL={API_BASE_URL} userData={userData} preguntas={preguntasFormBrigadistaSI} />
      </div>

    </section>
  );
};

export default Evaluaciones;
