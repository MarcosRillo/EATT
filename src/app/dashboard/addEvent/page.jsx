"use client";

import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Grid,
  Divider,
  Container,
} from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEvents } from "@/app/context/EventContext"; // Importa el hook
const eventTypes = [
  "Asociativos",
  "Corporativos",
  "Gubernamentales",
  "Deporte",
  "Cultura",
  "Académico",
  "Otros",
];

function AddEventPage() {
  const { addEvent } = useEvents(); // Accede a la función addEvent desde el contexto

  // State para los campos del formulario
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [sede, setSede] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [mapsUrl, setMapsUrl] = useState("");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [horaDesde, setHoraDesde] = useState("");
  const [horaHasta, setHoraHasta] = useState("");
  const [tipo, setTipo] = useState("");
  const [logo, setLogo] = useState(null);
  const [imagen, setImagen] = useState(null);
  const [asistenciaLocales, setAsistenciaLocales] = useState("");
  const [asistenciaNacionales, setAsistenciaNacionales] = useState("");
  const [asistenciaExtranjeros, setAsistenciaExtranjeros] = useState("");
  const [trasmisionVirtual, setTrasmisionVirtual] = useState(false);
  const [organizador, setOrganizador] = useState(
    "Nombre de la Empresa (por defecto)"
  );
  const [productor, setProductor] = useState("");
  const [webEvento, setWebEvento] = useState("");
  const [imagenResponsive, setImagenResponsive] = useState(null);

  const handleAddEventSubmit = () => {
    const newEvent = {
      nombre,
      descripcion,
      sede,
      ciudad,
      mapsUrl,
      date: fechaDesde, // Usando fechaDesde como una fecha simple por ahora
      timeStart: horaDesde,
      timeEnd: horaHasta,
      type: tipo,
      logo: logo ? logo.name : null,
      image: imagen ? imagen.name : null,
      estimatedAttendance: {
        local: asistenciaLocales,
        national: asistenciaNacionales,
        foreign: asistenciaExtranjeros,
      },
      virtualTransmission: trasmisionVirtual,
      organizador,
      producer: productor || organizador,
      website: webEvento,
      responsiveImage: imagenResponsive ? imagenResponsive.name : null,
      // Podrías querer incluir fechaHasta en tu objeto de evento también
    };
    addEvent(newEvent); // Usa la función addEvent del contexto
    console.log("Evento agregado:", newEvent);
    // Opcionalmente, podrías redirigir de vuelta al dashboard después de agregar el evento
  };

  const handleLogoChange = (event) => {
    setLogo(event.target.files[0]);
  };

  const handleImagenChange = (event) => {
    setImagen(event.target.files[0]);
  };

  const handleImagenResponsiveChange = (event) => {
    setImagenResponsive(event.target.files[0]);
  };

  const backButtonStyle = {
    position: "absolute",
    top: "16px",
    left: "16px",
    zIndex: 3,
    backgroundColor: "#2a48a2",
    color: "white",
    cursor: "pointer",
    fontSize: "1.5rem",
    borderRadius: "8px",
    padding: "6px",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#f3faff",
    },
  };

  return (
    <Box sx={{ position: "relative", minHeight: "100vh" }}>
      <Link href="/dashboard" style={backButtonStyle}>
        <ArrowBackIcon />
      </Link>
      <Container maxWidth="md" sx={{ mt: 4, paddingBottom: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Agregar Nuevo Evento
        </Typography>

        <Typography variant="h6" gutterBottom>
          Información Básica
        </Typography>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre del Evento"
              variant="outlined"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descripción"
              variant="outlined"
              multiline
              rows={3}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </Grid>
        </Grid>
        <Divider sx={{ mb: 3 }} />

        <Typography variant="h6" gutterBottom>
          Ubicación
        </Typography>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Sede"
              variant="outlined"
              value={sede}
              onChange={(e) => setSede(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Ciudad"
              variant="outlined"
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Maps (URL o Embed)"
              variant="outlined"
              value={mapsUrl}
              onChange={(e) => setMapsUrl(e.target.value)}
            />
          </Grid>
        </Grid>
        <Divider sx={{ mb: 3 }} />

        <Typography variant="h6" gutterBottom>
          Fecha y Hora
        </Typography>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Fecha Desde"
              type="date"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={fechaDesde}
              onChange={(e) => setFechaDesde(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Fecha Hasta"
              type="date"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={fechaHasta}
              onChange={(e) => setFechaHasta(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Horario Desde"
              type="time"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={horaDesde}
              onChange={(e) => setHoraDesde(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Horario Hasta"
              type="time"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={horaHasta}
              onChange={(e) => setHoraHasta(e.target.value)}
            />
          </Grid>
        </Grid>
        <Divider sx={{ mb: 3 }} />

        <Typography variant="h6" gutterBottom>
          Identidad
        </Typography>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Logo"
              variant="outlined"
              type="file"
              onChange={handleLogoChange}
              InputLabelProps={{ shrink: true }}
            />
            {logo && (
              <Typography variant="caption">
                Logo seleccionado: {logo.name}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Imagen"
              variant="outlined"
              type="file"
              onChange={handleImagenChange}
              InputLabelProps={{ shrink: true }}
            />
            {imagen && (
              <Typography variant="caption">
                Imagen seleccionada: {imagen.name}
              </Typography>
            )}
          </Grid>
        </Grid>
        <Divider sx={{ mb: 3 }} />

        <Typography variant="h6" gutterBottom>
          Asistencia
        </Typography>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Asistencia Estimada (Locales)"
              variant="outlined"
              type="number"
              value={asistenciaLocales}
              onChange={(e) => setAsistenciaLocales(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Asistencia Estimada (Nacionales)"
              variant="outlined"
              type="number"
              value={asistenciaNacionales}
              onChange={(e) => setAsistenciaNacionales(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Asistencia Estimada (Extranjeros)"
              variant="outlined"
              type="number"
              value={asistenciaExtranjeros}
              onChange={(e) => setAsistenciaExtranjeros(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={trasmisionVirtual}
                  onChange={(e) => setTrasmisionVirtual(e.target.checked)}
                />
              }
              label="Trasmisión Virtual"
            />
          </Grid>
        </Grid>
        <Divider sx={{ mb: 3 }} />

        <Typography variant="h6" gutterBottom>
          Información Adicional
        </Typography>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Productor (Dejar vacío si es el mismo que el organizador)"
              variant="outlined"
              value={productor}
              onChange={(e) => setProductor(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Web del Evento"
              variant="outlined"
              type="url"
              value={webEvento}
              onChange={(e) => setWebEvento(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Imagen Responsive (Medidas recomendadas: [aquí las medidas])"
              variant="outlined"
              type="file"
              onChange={handleImagenResponsiveChange}
              InputLabelProps={{ shrink: true }}
            />
            {imagenResponsive && (
              <Typography variant="caption">
                Imagen responsive seleccionada: {imagenResponsive.name}
              </Typography>
            )}
          </Grid>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddEventSubmit}
          >
            Agregar Evento
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default AddEventPage;
