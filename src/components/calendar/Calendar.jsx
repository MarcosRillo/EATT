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
import styles from "@/components/calendar/Calendar.modules.css";
import theme from "@/theme";

const localizer = momentLocalizer(moment);

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

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedEvent(null);
  };

  return (
    <div style={{ height: "85vh", marginBottom: "300px" }}>
      <Calendar
        localizer={localizer}
        events={events.map((event) => ({
          start: new Date(event.date + "T" + event.timeStart),
          end: new Date(event.date + "T" + event.timeEnd),
          title: event.title,
          ...event,
        }))}
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
      />
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
        sx={{
          "& .MuiPaper-root": {
            // Target the underlying Paper component
            backgroundColor: theme.palette.background.paper, // Color de fondo del tema
            color: theme.palette.text.primary, // Color de texto primario del tema
            borderRadius: "4px", // Opcional: Añadir un radio a los bordes del diálogo
            boxShadow: theme.shadows[3], // Opcional: Añadir una sombra
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
                backgroundColor: theme.palette.primary.main, // Color primario para el título
                color: theme.palette.background.default, // Texto blanco para el título
                padding: "16px 24px",
              }}
            >
              {selectedEvent.title}
              <IconButton
                onClick={handleCloseModal}
                sx={{ color: theme.palette.background.default }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ minHeight: "400px", padding: 3 }}>
              <Typography
                variant="h3"
                component="h3"
                gutterBottom
                color={theme.palette.primary.main}
              >
                {selectedEvent.title}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <CalendarTodayIcon
                  sx={{ mr: 1, color: theme.palette.secondary.main }}
                />
                <Typography variant="subtitle1">
                  {moment(selectedEvent.date).format(
                    "dddd, DD [de] MMMM [de]YYYY" // Corrección del año
                  )}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <ScheduleIcon
                  sx={{ mr: 1, color: theme.palette.secondary.main }}
                />
                <Typography variant="subtitle1">{`${selectedEvent.timeStart} - ${selectedEvent.timeEnd}`}</Typography>
              </Box>

              <Typography
                variant="h6"
                component="h3"
                sx={{ mt: 2, mb: 1, color: theme.palette.primary.main }}
              >
                Descripción
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedEvent.description}
              </Typography>

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

              {selectedEvent.organizador && (
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{ mb: 1, color: theme.palette.primary.main }}
                  >
                    Organización Responsable
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <AccountCircleIcon
                      sx={{ mr: 1, color: theme.palette.secondary.main }}
                    />
                    {selectedEvent.organizador}
                  </Typography>
                </Box>
              )}

              {selectedEvent.tipo && (
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
                    {selectedEvent.tipo}
                  </Typography>
                </Box>
              )}

              {selectedEvent.webEvento && (
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
                      href={selectedEvent.webEvento}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Sitio Web
                    </MuiLink>
                  </Typography>
                </Box>
              )}
            </DialogContent>
          </>
        )}
      </Dialog>
    </div>
  );
}

export default PublicCalendar;
