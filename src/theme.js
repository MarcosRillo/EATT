import { createTheme, colors } from "@mui/material/styles";

// Crea un tema de Material UI personalizado con paleta sobria.
const theme = createTheme({
  palette: {
    primary: {
      main: "#07476b", // Azul Oscuro - Primario Sobrio (Opción 1)
    },
    secondary: {
      main: "#678e29", // Celeste Muy Claro - Secundario Discreto (Opción 2)
    },
    error: {
      main: "#F32E40", // Rojo por defecto para errores
    },
    background: {
      default: "#ffffff", // Blanco
      paper: "#f5f5f5", // Un gris muy claro para los componentes
    },
    text: {
      primary: "#9999999", // Azul Oscuro - Texto primario (Opción 1, coherente con primario)
      secondary: "#777777", // Gris Medio - Texto secundario
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {},
        containedSecondary: {
          color: "#ffffff",
          marginTop: "16px",
          "&:hover": {
            backgroundColor: "#678e29",
          },
          borderRadius: "0px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {},
        outlined: {
          borderColor: "#678e29",
        },
      },
      defaultProps: {
        fullWidth: true,
        variant: "outlined",
        margin: "dense",
        color: "secondary",
      },
    },
    MuiOutlinedInput: {
      // Agrega esta sección o modifícala si ya existe
      styleOverrides: {
        notchedOutline: {
          borderColor: "#678e29 !important",
        },
      },
    },
  },
});

export default theme;
