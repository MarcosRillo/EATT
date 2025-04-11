// src/components/ImageCarousel.jsx
"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, useTheme, Typography } from "@mui/material";
import { useEvents } from "@/app/context/EventContext";
import moment from "moment";
import Image from "next/image"; // Importa el componente Image

const ImageCarousel = () => {
  const theme = useTheme();
  const { events } = useEvents();
  const [upcomingFlyers, setUpcomingFlyers] = useState([]);

  useEffect(() => {
    const getUpcomingFlyers = () => {
      const currentDate = moment();
      const validFlyers = []; // Cambiamos el nombre a validFlyers para mayor claridad

      events.forEach((event) => {
        event.dateTimes.forEach((dateTime) => {
          const startDate = moment(dateTime.fechaDesde);
          if (startDate.isSameOrAfter(currentDate, "day")) {
            if (event.image && event.image.startsWith("/")) {
              validFlyers.push(event.image);
            } else if (event.image) {
              console.error(
                `Ruta de imagen inválida encontrada: ${event.image} para el evento: ${event.nombre}. Asegúrate de que la ruta comience con '/carrouselEvents/'.`
              );
            }
          }
        });
      });

      // Eliminar duplicados si un evento tiene múltiples fechas futuras
      const uniqueValidFlyers = [...new Set(validFlyers)];

      // Ordenar por la fecha de inicio más próxima (opcional)
      const sortedEvents = events
        .filter((event) =>
          event.dateTimes.some((dt) =>
            moment(dt.fechaDesde).isSameOrAfter(currentDate, "day")
          )
        )
        .sort((a, b) => {
          const nextA = a.dateTimes.find((dt) =>
            moment(dt.fechaDesde).isSameOrAfter(currentDate, "day")
          );
          const nextB = b.dateTimes.find((dt) =>
            moment(dt.fechaDesde).isSameOrAfter(currentDate, "day")
          );
          if (nextA && nextB) {
            return moment(nextA.fechaDesde).diff(moment(nextB.fechaDesde));
          }
          return 0;
        });

      const sortedUniqueValidFlyers = sortedEvents
        .map((event) => event.image)
        .filter((imagePath) => imagePath && imagePath.startsWith("/")); // Filtrar solo las rutas válidas
      const uniqueSortedValidFlyers = [...new Set(sortedUniqueValidFlyers)];

      setUpcomingFlyers(uniqueSortedValidFlyers);
    };

    getUpcomingFlyers();
  }, [events]);

  const settings = {
    dots: true,
    infinite: upcomingFlyers.length > 4, // Solo mostrar infinito si hay suficientes imágenes válidas
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: upcomingFlyers.length > 4, // Solo autoplay si hay suficientes imágenes válidas
    autoplaySpeed: 3000, // Cambia la imagen cada 3 segundos
    arrows: upcomingFlyers.length > 4, // Solo mostrar flechas si hay suficientes imágenes válidas
  };

  return (
    <Box sx={{ mb: 3, position: "relative", height: "400px" }}>
      {upcomingFlyers.length > 0 ? (
        <Slider {...settings}>
          {upcomingFlyers.map((image, index) => (
            <div key={index} style={{ position: "relative", height: "400px" }}>
              <Image
                src={image}
                alt={`Flyer Evento ${index + 1}`}
                layout="cover"
                width={200}
                height={300}
                objectFit="contain"
                onError={(e) => {
                  console.error(`Error al cargar la imagen: ${image}`, e);
                  // Puedes optar por no renderizar nada aquí si prefieres omitir la imagen con error
                }}
              />
            </div>
          ))}
        </Slider>
      ) : (
        <Typography variant="body1" color="textSecondary">
          No hay eventos próximos con flyers disponibles.
        </Typography>
      )}
    </Box>
  );
};

export default ImageCarousel;
