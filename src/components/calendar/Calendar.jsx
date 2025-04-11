"use client";

import React, { useState, useEffect } from "react";
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
import theme from "@/theme";
import EventDetailsModal from "@/components/eventDetailModal/eventDetailModal.jsx";
import styles from "@/components/calendar/Calendar.modules.css";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

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
  const [selectedType, setSelectedType] = useState("Todos"); // Estado para el tipo seleccionado
  const [availableTypes, setAvailableTypes] = useState([]);

  useEffect(() => {
    // Obtener todos los tipos de eventos únicos al cargar el componente
    const types = [...new Set(events.map((event) => event.type))];
    setAvailableTypes(types);
  }, [events]);

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

  const handleFilterChange = (event) => {
    setSelectedType(event.target.value);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const backgroundColor = eventColors[event.type] || theme.palette.grey[500];
    const style = {
      backgroundColor: backgroundColor,
      borderRadius: "4px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block",
    };
    return {
      style: style,
    };
  };

  const filteredEvents =
    selectedType === "Todos"
      ? events
      : events.filter((event) => event.type === selectedType);

  return (
    <div>
      <FormControl sx={{ m: 3, minWidth: 120 }}>
        <InputLabel id="event-type-filter-label">Tipo de Evento</InputLabel>
        <Select
          labelId="event-type-filter-label"
          id="event-type-filter"
          value={selectedType}
          label="Filtrar por Tipo"
          onChange={handleFilterChange}
        >
          <MenuItem value="Todos">Todos los eventos</MenuItem>
          {availableTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div style={{ height: "85vh" }}>
        <Calendar
          localizer={localizer}
          events={filteredEvents.reduce((acc, event) => {
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
          eventPropGetter={eventStyleGetter}
        />
        <EventDetailsModal
          open={openModal}
          onClose={handleCloseModal}
          selectedEvent={selectedEvent}
        />
      </div>
    </div>
  );
}

export default PublicCalendar;
