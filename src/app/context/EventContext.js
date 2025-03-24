"use client";

import React, { createContext, useState, useContext } from "react";

const EventsContext = createContext();

export const useEvents = () => useContext(EventsContext);

export const EventsProvider = ({ children }) => {
  const initialEvents = [
    {
      title: "Concierto de Rock en el Teatro",
      description:
        "Disfruta de una noche de rock con bandas locales. ¡No te lo pierdas!",
      sede: "Teatro Municipal",
      ciudad: "San Miguel de Tucumán",
      mapsUrl: "https://www.google.com/maps/embed?...", // Reemplaza con una URL real
      date: "2025-03-20",
      endDate: "2025-03-20", // Agregando fecha de fin (puede ser igual a la de inicio para eventos de un día)
      timeStart: "20:00",
      timeEnd: "22:00",
      tipo: "Música",
      logo: "logo_concierto.png", // Nombre de archivo placeholder
      image: "imagen_concierto.jpg", // Nombre de archivo placeholder
      estimatedAttendance: {
        local: 200,
        national: 50,
        foreign: 10,
      },
      virtualTransmission: false,
      organizador: "Organización Musical Tucumana",
      productor: "Productora Local",
      webEvento: "https://www.ejemplo.com/concierto",
      responsiveImage: "imagen_responsive_concierto.jpg", // Nombre de archivo placeholder
    },
    {
      title: "Taller de Arte para Principiantes",
      description:
        "Aprende técnicas básicas de pintura y dibujo en un ambiente relajado y creativo.",
      sede: "Centro Cultural Alberdi",
      ciudad: "San Miguel de Tucumán",
      mapsUrl: "https://www.google.com/maps/embed?...", // Reemplaza con una URL real
      date: "2025-03-25",
      endDate: "2025-03-25",
      timeStart: "10:00",
      timeEnd: "12:00",
      tipo: "Cultura",
      logo: "logo_taller.png", // Nombre de archivo placeholder
      image: "imagen_taller.jpg", // Nombre de archivo placeholder
      estimatedAttendance: {
        local: 30,
        national: 0,
        foreign: 0,
      },
      virtualTransmission: false,
      organizador: "Asociación de Artistas Plásticos",
      productor: "Asociación de Artistas Plásticos",
      webEvento: "https://www.ejemplo.com/taller-arte",
      responsiveImage: "imagen_responsive_taller.jpg", // Nombre de archivo placeholder
    },
    {
      title: "Evento de Networking para Emprendedores",
      description:
        "Conecta con otros emprendedores locales, comparte ideas y crea nuevas oportunidades de negocio.",
      sede: "Hotel Catalinas Park",
      ciudad: "San Miguel de Tucumán",
      mapsUrl: "https://www.google.com/maps/embed?...", // Reemplaza con una URL real
      date: "2025-03-20",
      endDate: "2025-03-20",
      timeStart: "15:00",
      timeEnd: "17:00",
      tipo: "Asociativos",
      logo: "logo_networking.png", // Nombre de archivo placeholder
      image: "/carrouselEvents/arte-para-principiantes.webp", // Nombre de archivo placeholder
      estimatedAttendance: {
        local: 100,
        national: 10,
        foreign: 5,
      },
      virtualTransmission: true,
      organizador: "Cámara de Emprendedores de Tucumán",
      productor: "Cámara de Emprendedores de Tucumán",
      webEvento: "https://www.ejemplo.com/networking",
      responsiveImage: "imagen_responsive_networking.jpg", // Nombre de archivo placeholder
    },
    {
      title: "Función de Teatro Independiente",
      description:
        "Obra de teatro experimental que explora temas de la vida moderna.",
      sede: "Sala Teatral La Gloriosa",
      ciudad: "San Miguel de Tucumán",
      mapsUrl: "https://www.google.com/maps/embed?...", // Reemplaza con una URL real
      date: "2025-03-20",
      endDate: "2025-03-20",
      timeStart: "21:00",
      timeEnd: "23:00",
      tipo: "Teatro",
      logo: "logo_teatro.png", // Nombre de archivo placeholder
      image: "imagen_teatro.jpg", // Nombre de archivo placeholder
      estimatedAttendance: {
        local: 40,
        national: 0,
        foreign: 0,
      },
      virtualTransmission: false,
      organizador: "Grupo Teatral Independiente",
      productor: "Grupo Teatral Independiente",
      webEvento: "https://www.ejemplo.com/teatro",
      responsiveImage: "imagen_responsive_teatro.jpg", // Nombre de archivo placeholder
    },
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
