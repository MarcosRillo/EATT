"use client";

import React, { useState } from "react";
import {
  Calendar,
  Views,
  DateLocalizer,
  momentLocalizer,
} from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
moment.locale("es");
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEvents } from "@/app/context/EventContext";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Link as MuiLink,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GoogleMap from "@/components/googleMap/GoogleMap";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ScheduleIcon from "@mui/icons-material/Schedule";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RoomIcon from "@mui/icons-material/Room";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CategoryIcon from "@mui/icons-material/Category";
import LinkIcon from "@mui/icons-material/Link";
import PublicIcon from "@mui/icons-material/Public";
import styles from "@/components/calendar/Calendar.modules.css";
import theme from "@/theme";

const localizer = momentLocalizer(moment);

// Define un objeto para mapear tipos de eventos a colores
const eventColors = {
  Asociativos: theme.palette.primary.light,
  Corporativos: theme.palette.success.light,
  Gubernamentales: theme.palette.warning.light,
  Deporte: theme.palette.info.light,
  Cultura: theme.palette.secondary.light,
  Académico: theme.palette.error.light,
  Otros: theme.palette.grey[300],
};

function PublicCalendar() {
  const { events } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const mensajesEnEspanol = {
    allDay: "Todo el día",
    previous: "Anterior",
    next: "Siguiente",
    today: "Hoy",
    month: "Mes",
    week: "Semana",
    day: "Día",
    agenda: "Agenda",
    date: "Fecha",
    time: "Hora",
    event: "Evento",
    showMore: (total) => `+(${total}) más`,
  };

  const handleEventClick = (calendarEvent) => {
    setSelectedEvent(calendarEvent);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedEvent(null);
  };

  const formatDate = (dateString) => {
    return moment(dateString).format("dddd, DD [de] MMMM [de]YYYY");
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const backgroundColor = eventColors[event.type] || theme.palette.grey[500]; // Usa un color por defecto si el tipo no está en el mapa
    const style = {
      backgroundColor: backgroundColor,
      borderRadius: "4px",
      opacity: 0.8,
      color: "white", // Puedes ajustar el color del texto según el fondo
      border: "0px",
      display: "block",
    };
    return {
      style: style,
    };
  };

  return (
    <div style={{ height: "85vh", marginBottom: "300px" }}>
      <Calendar
        localizer={localizer}
        events={events.reduce((acc, event) => {
          event.dateTimes.forEach((dateTime) => {
            acc.push({
              start: new Date(dateTime.fechaDesde + "T" + dateTime.horaDesde),
              end: new Date(dateTime.fechaHasta + "T" + dateTime.horaHasta),
              title: event.nombre,
              ...event,
            });
          });
          return acc;
        }, [])}
        defaultView={Views.MONTH}
        views={{
          month: true,
          week: true,
          day: true,
          agenda: true,
        }}
        onSelectEvent={handleEventClick}
        style={{ width: "100%", height: "100%" }}
        messages={mensajesEnEspanol}
        eventPropGetter={eventStyleGetter} // Pasa la función para personalizar los estilos
      />
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            borderRadius: "4px",
            boxShadow: theme.shadows[3],
          },
        }}
      >
        {selectedEvent && (
          <>
            <DialogTitle
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.background.default,
                padding: "16px 24px",
              }}
            >
              {selectedEvent.nombre} {/* Usamos el nombre del evento */}
              <IconButton
                onClick={handleCloseModal}
                sx={{ color: theme.palette.background.default }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ minHeight: "400px", padding: 0 }}>
              <img
                src="/banners/evento1.png" // Reemplaza con la ruta correcta y quizás una lógica para elegir un banner diferente
                alt="Banner del Evento"
                style={{
                  width: "100%",
                  display: "block",
                }}
              />
              <Box sx={{ padding: 3 }}>
                <Typography
                  variant="h3"
                  component="h3"
                  gutterBottom
                  color={theme.palette.primary.main}
                >
                  {selectedEvent.nombre} {/* Usamos el nombre del evento */}
                </Typography>
                {selectedEvent.dateTimes &&
                  selectedEvent.dateTimes.map((dt, index) => (
                    <Box key={index}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <CalendarTodayIcon
                          sx={{ mr: 1, color: theme.palette.secondary.main }}
                        />
                        <Typography variant="subtitle1">
                          {formatDate(dt.fechaDesde)}
                          {dt.fechaDesde !== dt.fechaHasta &&
                            ` - ${formatDate(dt.fechaHasta)}`}
                        </Typography>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <ScheduleIcon
                          sx={{ mr: 1, color: theme.palette.secondary.main }}
                        />
                        <Typography variant="subtitle1">{`${dt.horaDesde} - ${dt.horaHasta}`}</Typography>
                      </Box>
                      {selectedEvent.dateTimes.length > 1 &&
                        index < selectedEvent.dateTimes.length - 1 && (
                          <Box
                            sx={{ my: 1, borderBottom: "1px dashed grey" }}
                          />
                        )}
                    </Box>
                  ))}
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{ mt: 2, mb: 1, color: theme.palette.primary.main }}
                >
                  Descripción
                </Typography>
                <Typography variant="body1" paragraph>
                  {selectedEvent.descripcion}
                </Typography>
                {selectedEvent.estimatedAttendance && (
                  <>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{ mt: 2, mb: 1, color: theme.palette.primary.main }}
                    >
                      Asistencia Estimada
                    </Typography>
                    <Typography
                      variant="body2"
                      color="primary"
                      sx={{ mb: 1.5, fontWeight: "bold" }}
                    >
                      Total:{" "}
                      {Object.values(selectedEvent.estimatedAttendance).reduce(
                        (a, b) => parseInt(a) + parseInt(b), // Asegúrate de parsear a número
                        0
                      )}{" "}
                      personas
                    </Typography>
                    <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <LocationOnIcon
                          sx={{ mr: 1, color: theme.palette.success.main }}
                        />
                        <Typography variant="body2">
                          Locales: {selectedEvent.estimatedAttendance.local}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <RoomIcon
                          sx={{ mr: 1, color: theme.palette.info.main }}
                        />
                        <Typography variant="body2">
                          Nacionales:{" "}
                          {selectedEvent.estimatedAttendance.national}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <PublicIcon
                          sx={{ mr: 1, color: theme.palette.warning.main }}
                        />
                        <Typography variant="body2">
                          Internacionales:{" "}
                          {selectedEvent.estimatedAttendance.foreign}
                        </Typography>
                      </Box>
                    </Box>
                  </>
                )}
                {(selectedEvent.sede ||
                  selectedEvent.ciudad ||
                  selectedEvent.mapsUrl) && (
                  <>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{ mt: 2, mb: 1, color: theme.palette.primary.main }}
                    >
                      Lugar
                    </Typography>
                    {selectedEvent.sede && (
                      <Typography
                        variant="body2"
                        sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
                      >
                        <LocationOnIcon
                          sx={{ mr: 1, color: theme.palette.secondary.main }}
                        />
                        {selectedEvent.sede}
                      </Typography>
                    )}
                    {selectedEvent.ciudad && (
                      <Typography
                        variant="body2"
                        sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
                      >
                        <RoomIcon
                          sx={{ mr: 1, color: theme.palette.secondary.main }}
                        />{" "}
                        {/* Otro icono de ubicación */}
                        {selectedEvent.ciudad}
                      </Typography>
                    )}
                    {selectedEvent.mapsUrl && (
                      <Box sx={{ mt: 1 }}>
                        <GoogleMap url={selectedEvent.mapsUrl} />
                      </Box>
                    )}
                  </>
                )}
                {selectedEvent.productor && ( // Usamos 'productor' en lugar de 'organizador'
                  <Box sx={{ mt: 2 }}>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{ mb: 1, color: theme.palette.primary.main }}
                    >
                      Productor
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <AccountCircleIcon
                        sx={{ mr: 1, color: theme.palette.secondary.main }}
                      />
                      {selectedEvent.productor}
                    </Typography>
                  </Box>
                )}
                {selectedEvent.type && ( // Usamos 'type' en lugar de 'tipo'
                  <Box sx={{ mt: 2 }}>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{ mb: 1, color: theme.palette.primary.main }}
                    >
                      Categoría del Evento
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <CategoryIcon
                        sx={{ mr: 1, color: theme.palette.secondary.main }}
                      />
                      {selectedEvent.type}
                    </Typography>
                  </Box>
                )}
                {selectedEvent.website && ( // Usamos 'website' en lugar de 'webEvento'
                  <Box sx={{ mt: 2 }}>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{ mb: 1, color: theme.palette.primary.main }}
                    >
                      Enlaces
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <LinkIcon
                        sx={{ mr: 1, color: theme.palette.secondary.main }}
                      />
                      <MuiLink
                        href={selectedEvent.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Sitio Web
                      </MuiLink>
                    </Typography>
                  </Box>
                )}
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>
    </div>
  );
}

export default PublicCalendar;
