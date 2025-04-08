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
import { useEvents } from "@/app/context/EventContext";
import { useTheme } from "@mui/material/styles";

function AddEventPage() {
  const theme = useTheme();
  const { addEvent } = useEvents();

  const [nombre, setNombre] = useState("");
  const [numeroEdicion, setNumeroEdicion] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tipo, setTipo] = useState("");
  const [subtipo, setSubtipo] = useState("");
  const [subtiposDisponibles, setSubtiposDisponibles] = useState([]);
  const [tipoRotacion, setTipoRotacion] = useState("");
  const [sede, setSede] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [mapsUrl, setMapsUrl] = useState("");
  const [logo, setLogo] = useState(null);
  const [imagen, setImagen] = useState(null);
  const [frecuencia, setFrecuencia] = useState("");
  const [asistenciaLocales, setAsistenciaLocales] = useState("");
  const [asistenciaNacionales, setAsistenciaNacionales] = useState("");
  const [asistenciaExtranjeros, setAsistenciaExtranjeros] = useState("");
  const [trasmisionVirtual, setTrasmisionVirtual] = useState(false);
  const [linkTransmisionVirtual, setLinkTransmisionVirtual] = useState("");
  const [organizador, setOrganizador] = useState(
    "Nombre de la Empresa (por defecto)"
  );
  const [productor, setProductor] = useState("");
  const [webEvento, setWebEvento] = useState("");
  const [imagenResponsive, setImagenResponsive] = useState(null);
  const [dateTimes, setDateTimes] = useState([
    { fechaDesde: "", fechaHasta: "", horaDesde: "", horaHasta: "" },
  ]);

  const handleAddEventSubmit = () => {
    const newEvent = {
      nombre,
      numeroEdicion: numeroEdicion,
      descripcion,
      type: tipo,
      subtype: subtipo,
      sede,
      ciudad,
      mapsUrl,
      dateTimes: dateTimes.map((dt) => ({
        fechaDesde: dt.fechaDesde,
        fechaHasta: dt.fechaHasta,
        horaDesde: dt.horaDesde,
        horaHasta: dt.horaHasta,
      })),
      logo: logo ? logo.name : null,
      image: imagen ? imagen.name : null,
      estimatedAttendance: {
        local: asistenciaLocales,
        national: asistenciaNacionales,
        foreign: asistenciaExtranjeros,
      },
      frecuencia: frecuencia,
      tipoRotacion: tipoRotacion,
      virtualTransmission: trasmisionVirtual,
      transmissionLink: trasmisionVirtual ? linkTransmisionVirtual : null,
      organizador,
      producer: productor || organizador,
      website: webEvento,
      responsiveImage: imagenResponsive ? imagenResponsive.name : null,
    };
    addEvent(newEvent);
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

  const handleAddDateTime = () => {
    setDateTimes([
      ...dateTimes,
      { fechaDesde: "", fechaHasta: "", horaDesde: "", horaHasta: "" },
    ]);
  };

  const eventTypes = [
    "Asociativos",
    "Corporativos",
    "Gubernamentales",
    "Deporte",
    "Cultura",
    "Académico",
    "Otros",
  ];

  const eventSubtypes = {
    Asociativos: [
      "Congreso",
      "Convención",
      "Seminario",
      "Taller",
      "Simposio",
      "Foro",
      "Mesa Redonda",
      "Networking",
    ],
    Corporativos: [
      "Conferencia",
      "Reunión de Negocios",
      "Lanzamiento de Producto",
      "Evento de Team Building",
      "Incentivo",
      "Capacitación",
      "Junta Directiva",
      "Evento de Fin de Año",
    ],
    Gubernamentales: [
      "Acto Oficial",
      "Ceremonia",
      "Rueda de Prensa",
      "Foro Público",
      "Audiencia Pública",
      "Debate",
      "Conferencia de Prensa",
      "Evento Protocolario",
    ],
    Deporte: [
      "Partido",
      "Competencia",
      "Torneo",
      "Maratón",
      "Carrera",
      "Exhibición",
      "Clase Magistral",
      "Evento de Premiación",
    ],
    Cultura: [
      "Concierto",
      "Obra de Teatro",
      "Exposición de Arte",
      "Festival",
      "Proyección de Cine",
      "Danza",
      "Presentación de Libro",
      "Feria Artesanal",
    ],
    Académico: [
      "Clase",
      "Seminario",
      "Taller",
      "Conferencia",
      "Simposio",
      "Congreso",
      "Panel de Discusión",
      "Entrega de Diplomas",
    ],
    Otros: [
      "Evento Benéfico",
      "Subasta",
      "Feria",
      "Mercado",
      "Celebración Privada",
      "Evento Religioso",
      "Evento Gastronómico",
      "Otro",
    ],
  };

  const frequencyOptions = [
    "Unico",
    "Trismestral",
    "Cuatrimestral",
    "Semestral",
    "Anual",
    "Bienal",
    "Trienal",
    "Cuatrianual",
    "Irregular",
    "No sabe no contesta NS/NC",
  ];

  const rotationTypeOptions = [
    "Local",
    "Provincial",
    "Regional",
    "Nacional",
    "Internacional - Mercosur",
    "Internacional - Sudamerica",
    "Internacional - Latinoamerica",
    "Internacional - Panamerica",
    "Internacional - Global",
  ];

  const handleRemoveDateTime = (index) => {
    if (dateTimes.length > 1) {
      const newDateTimes = [...dateTimes];
      newDateTimes.splice(index, 1);
      setDateTimes(newDateTimes);
    }
  };

  const handleDateTimeChange = (index, name, value) => {
    const newDateTimes = [...dateTimes];
    newDateTimes[index][name] = value;
    setDateTimes(newDateTimes);
  };

  const handleTipoEventoChange = (event) => {
    setTipo(event.target.value);
    setSubtipo("");
    setSubtiposDisponibles(eventSubtypes[event.target.value] || []);
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Link
        href="/dashboard"
        style={{
          position: "absolute",
          top: "16px",
          left: "16px",
          zIndex: 3,
          backgroundColor: theme.palette.primary.main, // Usando el color primario del tema
          color: theme.palette.background.default, // Texto blanco
          cursor: "pointer",
          fontSize: "1.2rem", // Reduciendo un poco el tamaño
          borderRadius: "4px", // Haciendo los bordes más acordes al tema
          padding: "8px", // Aumentando un poco el padding
          transition: "background-color 0.3s ease",
          "&:hover": {
            backgroundColor: theme.palette.primary.dark, // Un tono más oscuro al pasar el ratón
          },
        }}
      >
        <ArrowBackIcon />
      </Link>
      <Container maxWidth="md" sx={{ mt: 6, paddingBottom: 4 }}>
        <Typography variant="h4" component="h1" color="primary" gutterBottom>
          Agregar Nuevo Evento
        </Typography>
        <Typography variant="h6" color="primary" gutterBottom sx={{ mt: 3 }}>
          Información Básica
        </Typography>
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} sm={9}>
            <TextField
              label="Nombre del Evento"
              variant="outlined"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Número de Edición"
              variant="outlined"
              type="number"
              value={numeroEdicion}
              onChange={(e) => setNumeroEdicion(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Descripción"
              variant="outlined"
              multiline
              rows={4}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" margin="dense">
              <InputLabel id="tipo-evento-label">Tipo de Evento</InputLabel>
              <Select
                labelId="tipo-evento-label"
                id="tipo-evento"
                value={tipo}
                onChange={handleTipoEventoChange} // Asegúrate de usar esta función
                label="Tipo de Evento"
              >
                {eventTypes.map((eventType) => (
                  <MenuItem key={eventType} value={eventType}>
                    {eventType}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" margin="dense">
              <InputLabel id="subtipo-evento-label">
                Subtipo de Evento
              </InputLabel>
              <Select
                labelId="subtipo-evento-label"
                id="subtipo-evento"
                value={subtipo}
                onChange={(e) => setSubtipo(e.target.value)}
                label="Subtipo de Evento"
              >
                {subtiposDisponibles.map((subtype) => (
                  <MenuItem key={subtype} value={subtype}>
                    {subtype}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" margin="dense">
              <InputLabel id="frecuencia-label">Frecuencia</InputLabel>
              <Select
                labelId="frecuencia-label"
                id="frecuencia"
                value={frecuencia}
                onChange={(e) => setFrecuencia(e.target.value)}
                label="Frecuencia"
              >
                {frequencyOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" margin="dense">
              <InputLabel id="tipo-rotacion-label">Tipo de Rotación</InputLabel>
              <Select
                labelId="tipo-rotacion-label"
                id="tipo-rotacion"
                value={tipoRotacion}
                onChange={(e) => setTipoRotacion(e.target.value)}
                label="Tipo de Rotación"
              >
                {rotationTypeOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Divider sx={{ mb: 4 }} />
        <Typography variant="h6" color="primary" gutterBottom sx={{ mt: 3 }}>
          Ubicación
        </Typography>
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Sede"
              variant="outlined"
              value={sede}
              onChange={(e) => setSede(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Ciudad"
              variant="outlined"
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Maps (URL o Embed)"
              variant="outlined"
              value={mapsUrl}
              onChange={(e) => setMapsUrl(e.target.value)}
            />
          </Grid>
        </Grid>
        <Divider sx={{ mb: 4 }} />
        <Typography variant="h6" color="primary" gutterBottom sx={{ mt: 3 }}>
          Fecha y Hora
        </Typography>
        {dateTimes.map((dateTime, index) => (
          <Grid container spacing={3} mb={2} key={index}>
            <Grid item xs={12} sm={6}>
              <TextField
                label={`Fecha Desde ${dateTimes.length > 1 ? index + 1 : ""}`}
                type="date"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={dateTime.fechaDesde}
                onChange={(e) =>
                  handleDateTimeChange(index, "fechaDesde", e.target.value)
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label={`Fecha Hasta ${dateTimes.length > 1 ? index + 1 : ""}`}
                type="date"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={dateTime.fechaHasta}
                onChange={(e) =>
                  handleDateTimeChange(index, "fechaHasta", e.target.value)
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label={`Horario Desde ${dateTimes.length > 1 ? index + 1 : ""}`}
                type="time"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={dateTime.horaDesde}
                onChange={(e) =>
                  handleDateTimeChange(index, "horaDesde", e.target.value)
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label={`Horario Hasta ${dateTimes.length > 1 ? index + 1 : ""}`}
                type="time"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={dateTime.horaHasta}
                onChange={(e) =>
                  handleDateTimeChange(index, "horaHasta", e.target.value)
                }
                fullWidth
              />
            </Grid>
            {dateTimes.length > 1 && (
              <Grid item xs={12}>
                <Button
                  onClick={() => handleRemoveDateTime(index)}
                  color="secondary"
                >
                  - Eliminar
                </Button>
              </Grid>
            )}
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button onClick={handleAddDateTime} color="primary">
            + Agregar otro día y hora
          </Button>
        </Grid>
        <Divider sx={{ mb: 4 }} />
        <Typography variant="h6" color="primary" gutterBottom sx={{ mt: 3 }}>
          Asistencia Estimada
        </Typography>
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Asistencia Locales"
              variant="outlined"
              type="number"
              value={asistenciaLocales}
              onChange={(e) => setAsistenciaLocales(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Asistencia Nacionales"
              variant="outlined"
              type="number"
              value={asistenciaNacionales}
              onChange={(e) => setAsistenciaNacionales(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Asistencia Extranjeros"
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
                  color="secondary"
                />
              }
              label="Trasmisión Virtual"
            />
          </Grid>
          {trasmisionVirtual && (
            <Grid item xs={12}>
              <TextField
                label="Link de la Transmisión Virtual"
                variant="outlined"
                type="url"
                value={linkTransmisionVirtual}
                onChange={(e) => setLinkTransmisionVirtual(e.target.value)}
                margin="dense"
              />
            </Grid>
          )}
        </Grid>
        <Divider sx={{ mb: 4 }} />
        <Typography variant="h6" color="primary" gutterBottom sx={{ mt: 3 }}>
          Información Adicional
        </Typography>
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Productor (Dejar vacío si es el mismo que el organizador)"
              variant="outlined"
              value={productor}
              onChange={(e) => setProductor(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Web del Evento"
              variant="outlined"
              type="url"
              value={webEvento}
              onChange={(e) => setWebEvento(e.target.value)}
            />
          </Grid>
        </Grid>
        <Divider sx={{ mb: 4 }} />
        <Typography variant="h6" color="primary" gutterBottom sx={{ mt: 3 }}>
          Imágenes
        </Typography>
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Logo"
              variant="outlined"
              type="file"
              onChange={handleLogoChange}
              InputLabelProps={{ shrink: true }}
            />
            {logo && (
              <Typography variant="caption" color="text.secondary">
                Logo seleccionado: {logo.name}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Imagen"
              variant="outlined"
              type="file"
              onChange={handleImagenChange}
              InputLabelProps={{ shrink: true }}
            />
            {imagen && (
              <Typography variant="caption" color="text.secondary">
                Imagen seleccionada: {imagen.name}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Imagen Responsive (Medidas recomendadas: [aquí las medidas])"
              variant="outlined"
              type="file"
              onChange={handleImagenResponsiveChange}
              InputLabelProps={{ shrink: true }}
            />
            {imagenResponsive && (
              <Typography variant="caption" color="text.secondary">
                Imagen responsive seleccionada: {imagenResponsive.name}
              </Typography>
            )}
          </Grid>
        </Grid>
        <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleAddEventSubmit}
            sx={{ padding: "10px 24px", fontSize: "1rem" }}
          >
            Agregar Evento
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default AddEventPage;
