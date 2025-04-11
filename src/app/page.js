"use client";
import PublicCalendar from "@/components/calendar/Calendar"; // Ajusta la ruta si es necesario
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button"; // Importa el componente Button
import Grid from "@mui/material/Grid"; // Importa el componente Grid
import { useRouter } from "next/navigation"; // Importa el hook useRouter desde 'next/navigation'
import { useEvents } from "@/app/context/EventContext";
import ImageCarousel from "@/components/carrousel/carrousel";

export default function Home() {
  const { events } = useEvents();
  const router = useRouter(); // Inicializa el router

  const handleAccederClick = () => {
    router.push("/login"); // Navega a la ruta /login
  };

  return (
    <>
      <Container sx={{ mt: 10 }}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          marginBottom="30px"
        >
          <Grid item>
            <Typography variant="h5" component="h5" gutterBottom>
              EATT & TCVB | Agenda de Eventos
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleAccederClick}
            >
              Acceder
            </Button>
          </Grid>
        </Grid>
        <PublicCalendar />
        <ImageCarousel />
      </Container>
    </>
  );
}
