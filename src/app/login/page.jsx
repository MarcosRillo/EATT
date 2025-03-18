"use client";

import React, { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { Box } from "@mui/material";
import Link from "next/link"; // Importa el componente Link
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Importa el icono de flecha

function LoginPage() {
  const [isLoginOption, setIsLoginOption] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  const toggleLoginOption = () => {
    setIsLoginOption(!isLoginOption);
    setCurrentStep(1); // Resetear el paso al cambiar de opción
  };

  const handleLogin = () => {
    console.log("Intentando acceder con:", loginEmail, loginPassword);
    router.push('/dashboard');
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    height: "100vh",
    width: "50vw",
    backgroundColor: "rgba(200, 200, 200, 0.8)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    zIndex: 1,
    transition: "left 0.5s ease-in-out, right 0.5s ease-in-out",
  };

  const formContainerStyle = {
    position: "fixed",
    top: 0,
    height: "100vh",
    width: "50vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    overflowY: "auto",
    padding: "20px",
  };

  const backButtonStyle = {
    position: "absolute",
    top: "16px",
    left: "16px",
    zIndex: 3,
    backgroundColor: "#2a48a2", // Fondo negro semi-transparente
    color: "white",
    cursor: "pointer",
    fontSize: "1.5rem", // Un poco más pequeño
    borderRadius: "8px", // Bordes ligeramente redondeados
    padding: "6px", // Un poco menos de padding
    transition: "background-color 0.3s ease", // Transición suave al pasar el mouse
    "&:hover": {
      backgroundColor: "#f3faff", // Oscurecer un poco al pasar el mouse
    },
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        minHeight: "100vh",
      }}
    >
      {" "}
      {/* Añade position: 'relative' al Box principal */}
      <Link href="/" style={backButtonStyle}>
        <ArrowBackIcon />
      </Link>
      {/* Panel Izquierdo */}
      {isLoginOption ? (
        <Box sx={{ ...overlayStyle, left: 0 }}>
          <Typography variant="h5" gutterBottom>
            ¡Bienvenido!
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Accede con tu cuenta de organización para publicar eventos.
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={toggleLoginOption}
          >
            ¿Desea una cuenta? Solicitar cuenta de acceso
          </Button>
        </Box>
      ) : (
        <Box sx={{ ...formContainerStyle, left: 0, justifyContent: "center" }}>
          <Container maxWidth="xs">
            <Typography variant="h5" component="h2" gutterBottom>
              Solicitar Cuenta
            </Typography>
            {currentStep === 1 && (
              <div>
                <TextField
                  fullWidth
                  label="Foto de perfil"
                  variant="outlined"
                  margin="dense"
                  type="file"
                />
                <TextField
                  fullWidth
                  label="DNI"
                  variant="outlined"
                  margin="dense"
                />
                <TextField
                  fullWidth
                  label="Apellido"
                  variant="outlined"
                  margin="dense"
                />
                <TextField
                  fullWidth
                  label="Nombre"
                  variant="outlined"
                  margin="dense"
                />
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  margin="dense"
                  type="email"
                />
                <TextField
                  fullWidth
                  label="WhatsApp"
                  variant="outlined"
                  margin="dense"
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={nextStep}
                >
                  Siguiente
                </Button>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <TextField
                  fullWidth
                  label="Nombre de la Organización"
                  variant="outlined"
                  margin="dense"
                />
                <TextField
                  fullWidth
                  label="Rubro"
                  variant="outlined"
                  margin="dense"
                />
                <TextField
                  fullWidth
                  label="Tipo de Organización (asociación, grupo independiente, etc.)"
                  variant="outlined"
                  margin="dense"
                />
                <TextField
                  fullWidth
                  label="CUIT/CUIL"
                  variant="outlined"
                  margin="dense"
                />
                <TextField
                  fullWidth
                  label="Logo"
                  variant="outlined"
                  margin="dense"
                  type="file"
                />
                <TextField
                  fullWidth
                  label="Sitio Web"
                  variant="outlined"
                  margin="dense"
                  type="url"
                />
                <TextField
                  fullWidth
                  label="Motivación para solicitar la cuenta (por qué quieren publicar eventos en la plataforma)"
                  variant="outlined"
                  margin="dense"
                  multiline
                  rows={4}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Button onClick={prevStep}>Anterior</Button>
                  <Button variant="contained" color="primary">
                    Solicitar Acceso
                  </Button>
                </Box>
              </div>
            )}
          </Container>
        </Box>
      )}
      {/* Panel Derecho */}
      {isLoginOption ? (
        <Box sx={{ ...formContainerStyle, right: 0, justifyContent: "center" }}>
          <Container maxWidth="xs">
            <Typography variant="h5" component="h2" gutterBottom>
              Acceder
            </Typography>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <TextField
              fullWidth
              label="Contraseña"
              variant="outlined"
              margin="normal"
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleLogin}
            >
              Acceder
            </Button>
          </Container>
        </Box>
      ) : (
        <Box sx={{ ...overlayStyle, right: 0 }}>
          <Typography variant="h5" gutterBottom>
            ¿Ya tienes una cuenta?
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Inicia sesión para acceder al panel de control de tu organización.
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={toggleLoginOption}
          >
            ¿Ya tiene usuario? Iniciar Sesión
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default LoginPage;
