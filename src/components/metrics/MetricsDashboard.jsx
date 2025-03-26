// src/components/MetricsDashboard.jsx
"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Typography, Grid, Paper } from "@mui/material";
import pendingEventsData from "@/data/pendingEvents"; // Importa tus datos de eventos (esto es un ejemplo)

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#a4bdfc",
  "#7ae7bf",
];

const MetricsDashboard = () => {
  // Procesamiento de datos para el gráfico de eventos por mes
  const eventsByMonth = pendingEventsData.reduce((acc, event) => {
    const monthYear = new Date(event.fechaDesde).toLocaleDateString("es-AR", {
      month: "short",
      year: "numeric",
    });
    acc[monthYear] = (acc[monthYear] || 0) + 1;
    return acc;
  }, {});

  const monthlyData = Object.keys(eventsByMonth)
    .map((key) => ({ name: key, events: eventsByMonth[key] }))
    .sort((a, b) => new Date(a.name) - new Date(b.name)); // Ordenar por fecha

  // Procesamiento de datos para el gráfico de eventos por categoría (tipo)
  const eventsByType = pendingEventsData.reduce((acc, event) => {
    acc[event.tipo] = (acc[event.tipo] || 0) + 1;
    return acc;
  }, {});

  const typeData = Object.keys(eventsByType).map((key) => ({
    name: key,
    value: eventsByType[key],
  }));

  // Procesamiento de datos para el gráfico de asistencia estimada por tipo
  const estimatedAttendance = pendingEventsData.reduce(
    (acc, event) => {
      acc.local += event.estimatedAttendance?.local || 0;
      acc.national += event.estimatedAttendance?.national || 0;
      acc.foreign += event.estimatedAttendance?.foreign || 0;
      return acc;
    },
    { local: 50, national: 50, foreign: 100 }
  );

  const attendanceData = [
    { name: "Local", value: estimatedAttendance.local },
    { name: "Nacional", value: estimatedAttendance.national },
    { name: "Extranjero", value: estimatedAttendance.foreign },
  ];

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Métricas de Eventos
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Eventos por Mes
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="events" fill={COLORS[0]} name="Eventos" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Eventos por Categoría
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {typeData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  layout="vertical"
                  align="middle"
                  wrapperStyle={{ left: 80 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Asistencia Estimada por Tipo
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill={COLORS[2]} name="Cantidad" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default MetricsDashboard;
