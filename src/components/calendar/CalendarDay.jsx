import React from "react";
import { Paper, Typography, Box } from "@mui/material";

function CalendarDay({ day, isCurrentMonth, hasEvent, eventTitle }) {
  const style = {
    padding: "5px",
    margin: "5px",
    height: "90px",
    width: "auto",
    textAlign: "center",
    display: "flex",
    flexDirection: "column", // Changed to column to stack day and event indicator
    alignItems: "center",
    justifyContent: "flex-start", // Align items at the top
    color: isCurrentMonth ? "inherit" : "#aaa",
  };

  const eventIndicatorStyle = {
    marginTop: "5px",
    fontSize: "0.7rem",
    color: "#3f51b5", // Example event color
  };

  return (
    <Paper style={style} elevation={1}>
      <Typography variant="body2"> {day} </Typography>
      {hasEvent && eventTitle && (
        <Box sx={{ ...eventIndicatorStyle, mt: 1 }}>{eventTitle}</Box>
      )}
      {hasEvent && !eventTitle && (
        <Box
          sx={{
            ...eventIndicatorStyle,
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "#3f51b5",
          }}
        />
      )}
    </Paper>
  );
}

export default CalendarDay;
