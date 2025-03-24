"use client";

import React, { useState } from "react";
import Container from "@mui/material/Container";
import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { Box } from "@mui/material";
import Link from "next/link"; // Importa el componente Link
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Importa el icono de flecha
import style from "@/app/css/login.module.css";

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
    router.push("/dashboard");
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
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
      <Link href="/" className={style.backButtonStyle}>
        <ArrowBackIcon />
      </Link>
      {/* Panel Izquierdo */}
      {isLoginOption ? (
        <Box className={style.overlayStyle} sx={{ left: 0 }}>
          <Typography variant="h5" gutterBottom>
            ¡Bienvenido!
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Accede con tu cuenta de organización para publicar eventos.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={toggleLoginOption}
          >
            ¿Desea una cuenta? Solicitar cuenta de acceso
          </Button>
        </Box>
      ) : (
        <Box
          className={style.formContainerStyle}
          sx={{ left: 0, justifyContent: "center" }}
        >
          <Container maxWidth="xs">
            <Typography variant="h5" component="h2" gutterBottom>
              Solicitar Cuenta
            </Typography>
            {currentStep === 1 && (
              <div>
                <TextField
                  label="Foto de perfil"
                  type="file"
                  sx={{
                    '& .MuiInputBase-input[type="file"]': {
                      paddingTop: "3em", // Ajusta este valor según sea necesario
                    },
                  }}
                />
                <TextField label="DNI" />
                <TextField label="Apellido" />
                <TextField label="Nombre" />
                <TextField label="Email" type="email" />
                <TextField label="WhatsApp" />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={nextStep}
                >
                  Siguiente
                </Button>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <TextField label="Nombre de la Organización" />
                <TextField label="Rubro" />
                <TextField label="Tipo de Organización (asociación, grupo independiente, etc.)" />
                <TextField label="CUIT/CUIL" />
                <TextField
                  label="Logo"
                  type="file"
                  sx={{
                    '& .MuiInputBase-input[type="file"]': {
                      paddingTop: "3em", // Ajusta este valor según sea necesario
                    },
                  }}
                />
                <TextField label="Sitio Web" type="url" />
                <TextField
                  label="Motivación para solicitar la cuenta (por qué quieren publicar eventos en la plataforma)"
                  multiline
                  rows={4}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    onClick={prevStep}
                    sx={{
                      mt: 2,
                    }}
                  >
                    Anterior
                  </Button>
                  <Button variant="contained" color="secondary">
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
        <Box
          className={style.formContainerStyle}
          sx={{ right: 0, justifyContent: "center" }}
        >
          <Container maxWidth="xs">
            <Typography variant="h5" component="h2" gutterBottom>
              Acceder
            </Typography>
            <TextField
              label="Email"
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <TextField
              label="Contraseña"
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <Button
              endIcon={<SendIcon />}
              variant="contained"
              color="secondary"
              onClick={handleLogin}
            >
              Acceder
            </Button>
          </Container>
        </Box>
      ) : (
        <Box className={style.overlayStyle} sx={{ right: 0 }}>
          <Typography variant="h5" gutterBottom>
            ¿Ya tienes una cuenta?
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Inicia sesión para acceder al panel de control de tu organización.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
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
