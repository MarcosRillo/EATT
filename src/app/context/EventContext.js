"use client";

import React, { createContext, useState, useContext } from "react";

const EventsContext = createContext();

export const useEvents = () => useContext(EventsContext);

export const EventsProvider = ({ children }) => {
  const initialEvents = [
    {
      date: "2025-03-20",
      title: "Concierto de Rock en el Teatro",
      timeStart: "20:00",
      timeEnd: "22:00",
      description: "Disfruta de una noche de rock con bandas locales.",
    },
    {
      date: "2025-03-25",
      title: "Taller de Arte para Principiantes",
      timeStart: "10:00",
      timeEnd: "12:00",
      description: "Aprende técnicas básicas de pintura y dibujo.",
    },
    {
      date: "2025-03-18",
      title: "Evento de Networking para Emprendedores",
      timeStart: "15:00",
      timeEnd: "17:00",
      description: "Conecta con otros emprendedores locales.",
    },
    {
      date: "2025-03-28",
      title: "Función de Teatro Independiente",
      timeStart: "21:00",
      timeEnd: "23:00",
      description: "Obra de teatro experimental.",
    },
    // Agrega aquí todos los eventos que quieras hardcodear
  ];

  const [events, setEvents] = useState(initialEvents);

  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  return (
    <EventsContext.Provider value={{ events, addEvent }}>
      {children}
    </EventsContext.Provider>
  );
};
