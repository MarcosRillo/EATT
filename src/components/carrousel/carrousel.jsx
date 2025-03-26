// src/components/ImageCarousel.jsx
"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, useTheme } from "@mui/material";

const ImageCarousel = () => {
  const theme = useTheme();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Cambia la imagen cada 3 segundos
    arrows: true,
    // Puedes personalizar los dots aquí si es necesario usando el tema
    // dotClass: "slick-dots",
    // customPaging: (i) => <button style={{ color: theme.palette.primary.main }}>{i + 1}</button>,
  };

  const images = [
    "/carrouselEvents/evento1.webp",
    "/carrouselEvents/evento2.webp",
    "/carrouselEvents/evento3.webp",
    "/carrouselEvents/evento4.webp",
    "/carrouselEvents/evento1.webp",
    "/carrouselEvents/evento2.webp",
    "/carrouselEvents/evento3.webp",
    "/carrouselEvents/evento4.webp",
    "/carrouselEvents/evento1.webp",
    "/carrouselEvents/evento2.webp",
    "/carrouselEvents/evento3.webp",
    "/carrouselEvents/evento4.webp",
  ];

  return (
    <Box sx={{ mb: 3 }}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Flyer ${index + 1}`}
              style={{
                width: "100%",
                maxHeight: "400px",
                objectFit: "contain",
              }}
            />
          </div>
        ))}
      </Slider>
    </Box>
  );
};

export default ImageCarousel;
