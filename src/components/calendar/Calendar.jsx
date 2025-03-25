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
import { useEvents } from "@/app/context/EventContext"; // Ajusta la ruta si es necesario
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
import GoogleMap from "@/components/googleMap/GoogleMap"; // Componente opcional para el mapa

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ScheduleIcon from "@mui/icons-material/Schedule";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RoomIcon from "@mui/icons-material/Room"; // O el icono de ubicación que prefieras
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CategoryIcon from "@mui/icons-material/Category";
import LinkIcon from "@mui/icons-material/Link";

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
    <div style={{ height: "600px" }}>
      {" "}
      {/* Ajusta la altura según necesites */}
      <Calendar
        localizer={localizer}
        events={events.map((event) => ({
          // Formatea los eventos para react-big-calendar
          start: new Date(event.date + "T" + event.timeStart),
          end: new Date(event.date + "T" + event.timeEnd),
          title: event.title,
          ...event, // Pasa las otras propiedades del evento
        }))}
        defaultView={Views.MONTH}
        views={{
          month: true,
          week: true,
          day: true,
          agenda: true, // La vista de agenda puede servir como vista anual en formato de lista
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
      >
        {selectedEvent && (
          <>
            <DialogTitle
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {selectedEvent.title}
              <IconButton onClick={handleCloseModal}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ minHeight: "400px", padding: 3 }}>
              <Typography variant="h3" component="h3" gutterBottom>
                {selectedEvent.title}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <CalendarTodayIcon sx={{ mr: 1 }} />
                <Typography variant="subtitle1">
                  {moment(selectedEvent.date).format(
                    "dddd, DD [de] MMMM [de] YYYY"
                  )}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <ScheduleIcon sx={{ mr: 1 }} />
                <Typography variant="subtitle1">{`${selectedEvent.timeStart} - ${selectedEvent.timeEnd}`}</Typography>
              </Box>

              <Typography variant="h6" component="h3" sx={{ mt: 2, mb: 1 }}>
                Descripción
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedEvent.description}
              </Typography>

              {(selectedEvent.sede ||
                selectedEvent.ciudad ||
                selectedEvent.mapsUrl) && (
                <>
                  <Typography variant="h6" component="h3" sx={{ mt: 2, mb: 1 }}>
                    Lugar
                  </Typography>
                  {selectedEvent.sede && (
                    <Typography
                      variant="body2"
                      sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
                    >
                      <LocationOnIcon sx={{ mr: 1 }} />
                      {selectedEvent.sede}
                    </Typography>
                  )}
                  {selectedEvent.ciudad && (
                    <Typography
                      variant="body2"
                      sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
                    >
                      <RoomIcon sx={{ mr: 1 }} />{" "}
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
                  <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
                    Organización Responsable
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <AccountCircleIcon sx={{ mr: 1 }} />
                    {selectedEvent.organizador}
                  </Typography>
                </Box>
              )}

              {selectedEvent.tipo && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
                    Categoría del Evento
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <CategoryIcon sx={{ mr: 1 }} />
                    {selectedEvent.tipo}
                  </Typography>
                </Box>
              )}

              {selectedEvent.webEvento && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
                    Enlaces
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <LinkIcon sx={{ mr: 1 }} />
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

              {/* Aquí podrías agregar lógica para mostrar imágenes, videos y otros enlaces opcionales */}
            </DialogContent>
          </>
        )}
      </Dialog>
    </div>
  );
}

export default PublicCalendar;
