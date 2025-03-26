"use client";

import React, { useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Modal,
  Box,
  TextField,
  IconButton,
  Grid,
} from "@mui/material";
import Calendar from "@/components/calendar/Calendar"; // Asegúrate de que la ruta a tu componente Calendar sea correcta
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles"; // Importa el hook para acceder al tema
import pendingEventsData from "@/data/pendingEvents";
import pendingUsersData from "@/data/pendingUsers";
import MetricsDashboard from "@/components/metrics/MetricsDashboard";
import Link from "next/link";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function SuperuserDashboard() {
  const theme = useTheme();
  // Estados para las solicitudes de eventos pendientes y usuarios pendientes (datos de ejemplo)
  const [pendingEvents, setPendingEvents] = useState(pendingEventsData);
  const [pendingUsers, setPendingUsers] = useState(pendingUsersData);

  // Estado para controlar la visibilidad del modal de vista previa del evento
  const [isEventPreviewOpen, setIsEventPreviewOpen] = useState(false);
  const [selectedEventForPreview, setSelectedEventForPreview] = useState(null);

  // Estado para controlar la visibilidad del modal de vista previa del usuario
  const [isUserPreviewOpen, setIsUserPreviewOpen] = useState(false);
  const [selectedUserForPreview, setSelectedUserForPreview] = useState(null);

  // Estado para controlar la visibilidad del campo de rechazo de usuario
  const [isRejectReasonVisible, setIsRejectReasonVisible] = useState(null); // Usar null para indicar que ningún campo está visible inicialmente
  const [rejectionReasons, setRejectionReasons] = useState({});

  const handleOpenEventPreview = (event) => {
    setSelectedEventForPreview(event);
    setIsEventPreviewOpen(true);
  };

  const handleCloseEventPreview = () => {
    setIsEventPreviewOpen(false);
    setSelectedEventForPreview(null);
  };

  const handleOpenUserPreview = (user) => {
    setSelectedUserForPreview(user);
    setIsUserPreviewOpen(true);
  };

  const handleCloseUserPreview = () => {
    setIsUserPreviewOpen(false);
    setSelectedUserForPreview(null);
  };

  const handleAcceptEvent = (eventId) => {
    console.log(`Evento ${eventId} aceptado.`);
    setPendingEvents(pendingEvents.filter((event) => event.id !== eventId));
  };

  const handleSendEventCorrections = (eventId) => {
    console.log(`Solicitar correcciones para el evento ${eventId}.`);
    // Aquí iría la lógica para solicitar correcciones (llamada a la API, notificación al usuario, etc.)
  };

  const handleAcceptUser = (userId) => {
    console.log(`Usuario ${userId} aceptado.`);
    setPendingUsers(pendingUsers.filter((user) => user.id !== userId));
  };

  const handleRejectUser = (userId) => {
    setIsRejectReasonVisible(userId);
  };

  const handleReasonChange = (event, userId) => {
    setRejectionReasons({ ...rejectionReasons, [userId]: event.target.value });
  };

  const handleConfirmRejectUser = (userId) => {
    const reason = rejectionReasons[userId] || "No se especificó un motivo.";
    console.log(`Usuario ${userId} rechazado con el motivo: ${reason}`);
    setPendingUsers(pendingUsers.filter((user) => user.id !== userId));
    setIsRejectReasonVisible(null);
    setRejectionReasons({ ...rejectionReasons, [userId]: "" });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Panel de Superusuario
      </Typography>

      <Typography variant="h6" gutterBottom>
        Calendario
      </Typography>
      <Calendar />

      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Solicitudes de Eventos Pendientes
          </Typography>
          {pendingEvents.length > 0 ? (
            <List>
              {pendingEvents.map((event) => (
                <ListItem
                  key={event.id}
                  sx={{ borderBottom: "1px solid #f0f0f0", padding: "16px" }}
                >
                  <ListItemText
                    primary={event.nombre}
                    secondary={`${event.fechaDesde} ${event.horaDesde} - ${event.fechaHasta} ${event.horaHasta}`}
                  />
                  <IconButton
                    onClick={() => handleOpenEventPreview(event)}
                    aria-label="ver"
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <Button
                    onClick={() => handleAcceptEvent(event.id)}
                    startIcon={<CheckCircleOutlineIcon />}
                    color="primary"
                    sx={{ ml: 2 }}
                  >
                    Aceptar
                  </Button>
                  <Button
                    onClick={() => handleSendEventCorrections(event.id)}
                    startIcon={<SendIcon />}
                    color="warning"
                    sx={{ ml: 1 }}
                  >
                    Pedir Correcciones
                  </Button>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body1">
              No hay solicitudes de eventos pendientes.
            </Typography>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Solicitudes de Cuentas de Usuario Pendientes
          </Typography>
          {pendingUsers.length > 0 ? (
            <List>
              {pendingUsers.map((user) => (
                <ListItem
                  key={user.id}
                  sx={{ borderBottom: "1px solid #f0f0f0", padding: "16px" }}
                >
                  <ListItemText primary={user.nombre} secondary={user.email} />
                  <IconButton
                    onClick={() => handleOpenUserPreview(user)}
                    aria-label="ver"
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <Button
                    onClick={() => handleAcceptUser(user.id)}
                    startIcon={<CheckCircleOutlineIcon />}
                    color="primary"
                    sx={{ ml: 2 }}
                  >
                    Aceptar
                  </Button>
                  {isRejectReasonVisible === user.id ? (
                    <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
                      <TextField
                        label="Motivo de Rechazo"
                        value={rejectionReasons[user.id] || ""}
                        onChange={(e) => handleReasonChange(e, user.id)}
                        size="small"
                      />
                      <IconButton
                        onClick={() => handleConfirmRejectUser(user.id)}
                        color="error"
                        sx={{ ml: 1 }}
                      >
                        <ErrorOutlineIcon />
                      </IconButton>
                    </Box>
                  ) : (
                    <Button
                      onClick={() => handleRejectUser(user.id)}
                      startIcon={<ErrorOutlineIcon />}
                      color="error"
                      sx={{ ml: 1 }}
                    >
                      Rechazar
                    </Button>
                  )}
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body1">
              No hay solicitudes de cuentas de usuario pendientes.
            </Typography>
          )}
        </Grid>
      </Grid>

      {/* Modal de vista previa del evento */}
      <Modal
        open={isEventPreviewOpen}
        onClose={handleCloseEventPreview}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          {selectedEventForPreview && (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.background.default,
                  padding: "16px 24px",
                  mb: 2,
                }}
              >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {selectedEventForPreview.nombre}
                </Typography>
                <IconButton
                  aria-label="close"
                  onClick={handleCloseEventPreview}
                  sx={{ color: theme.palette.background.default }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
              <Box sx={{ padding: "16px" }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Descripción:</strong>{" "}
                  {selectedEventForPreview.descripcion}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Sede:</strong> {selectedEventForPreview.sede}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Ciudad:</strong> {selectedEventForPreview.ciudad}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Maps URL:</strong>{" "}
                  <Link
                    href={selectedEventForPreview.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {selectedEventForPreview.mapsUrl}
                  </Link>
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Fecha Desde:</strong>{" "}
                  {selectedEventForPreview.fechaDesde}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Hora Desde:</strong>{" "}
                  {selectedEventForPreview.horaDesde}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Fecha Hasta:</strong>{" "}
                  {selectedEventForPreview.fechaHasta}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Hora Hasta:</strong>{" "}
                  {selectedEventForPreview.horaHasta}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Tipo:</strong> {selectedEventForPreview.tipo}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Logo:</strong> {selectedEventForPreview.logo}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Imagen:</strong> {selectedEventForPreview.image}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Asistencia Estimada:</strong>
                  <ul>
                    <li>
                      Locales:{" "}
                      {selectedEventForPreview.estimatedAttendance?.local}
                    </li>
                    <li>
                      Nacionales:{" "}
                      {selectedEventForPreview.estimatedAttendance?.national}
                    </li>
                    <li>
                      Extranjeros:{" "}
                      {selectedEventForPreview.estimatedAttendance?.foreign}
                    </li>
                  </ul>
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Trasmisión Virtual:</strong>{" "}
                  {selectedEventForPreview.virtualTransmission ? "Sí" : "No"}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Organizador:</strong>{" "}
                  {selectedEventForPreview.organizador}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Productor:</strong> {selectedEventForPreview.producer}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Web del Evento:</strong>{" "}
                  {selectedEventForPreview.website ? (
                    <Link
                      href={selectedEventForPreview.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {selectedEventForPreview.website}
                    </Link>
                  ) : (
                    "No especificada"
                  )}
                </Typography>
                <Typography variant="body1">
                  <strong>Imagen Responsive:</strong>{" "}
                  {selectedEventForPreview.responsiveImage}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Modal>

      {/* Modal de vista previa del usuario */}
      <Modal
        open={isUserPreviewOpen}
        onClose={handleCloseUserPreview}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          {selectedUserForPreview && (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.background.default,
                  padding: "16px 24px",
                  mb: 2,
                }}
              >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Detalles de Usuario
                </Typography>
                <IconButton
                  aria-label="close"
                  onClick={handleCloseUserPreview}
                  sx={{ color: theme.palette.background.default }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
              <Box sx={{ padding: "16px" }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Nombre:</strong> {selectedUserForPreview.nombre}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Apellido:</strong> {selectedUserForPreview.apellido}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>DNI:</strong> {selectedUserForPreview.dni}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Email:</strong> {selectedUserForPreview.email}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>WhatsApp:</strong> {selectedUserForPreview.whatsapp}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Foto de Perfil:</strong>{" "}
                  {selectedUserForPreview.fotoPerfil}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Nombre de la Organización:</strong>{" "}
                  {selectedUserForPreview.nombreOrganizacion}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Rubro:</strong> {selectedUserForPreview.rubro}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Tipo de Organización:</strong>{" "}
                  {selectedUserForPreview.tipoOrganizacion}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>CUIT/CUIL:</strong> {selectedUserForPreview.cuitCuil}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Logo de la Organización:</strong>{" "}
                  {selectedUserForPreview.logo}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Sitio Web:</strong>{" "}
                  {selectedUserForPreview.sitioWeb ? (
                    <Link
                      href={selectedUserForPreview.sitioWeb}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {selectedUserForPreview.sitioWeb}
                    </Link>
                  ) : (
                    "No especificado"
                  )}
                </Typography>
                <Typography variant="body1">
                  <strong>Motivación:</strong>{" "}
                  {selectedUserForPreview.motivacion}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Modal>
      <Box sx={{ mt: 4 }}>
        <MetricsDashboard />
      </Box>
    </Container>
  );
}

export default SuperuserDashboard;
