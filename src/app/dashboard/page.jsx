"use client";

import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import Calendar from "@/components/calendar/Calendar";
import Link from "next/link";
import { useEvents } from "@/app/context/EventContext"; // Asegúrate de que la ruta sea correcta

function DashboardPage() {
  const { events } = useEvents();

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard de la Organización
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          href="/dashboard/addEvent"
        >
          Agregar Nuevo Evento
        </Button>
      </Box>
      <Calendar events={events} /> {/* Los eventos ahora vienen del contexto */}
    </Container>
  );
}

export default DashboardPage;
