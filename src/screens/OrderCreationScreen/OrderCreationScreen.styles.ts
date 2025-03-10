// CustomerManagement.styles.tsx
import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    /* Container & Global Layout */
    container: {
      width: "95%",
      margin: "20px auto",
      padding: "20px",
      background: "#fff",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
    },
    title: {
      textAlign: "center",
      marginBottom: "30px",
      color: "#007bff",
      fontWeight: "bold",
    },
    twoColumnContainer: {
      display: "flex",
      gap: "30px",
      flexWrap: "wrap",
    },
    column: {
      flex: 1,
      minWidth: "300px",
    },
    formSection: {
      marginBottom: "25px",
    },
    formTitle: {
      marginBottom: "15px",
      fontSize: "1.1em",
      color: "#555",
      borderBottom: "2px solid #eee",
      paddingBottom: "5px",
    },
    formGroup: {
      display: "flex",
      alignItems: "center",
      marginBottom: "15px",
    },
    formLabel: {
      width: "140px",
      fontWeight: "bold",
      color: "#555",
      paddingRight: "10px",
    },
    inputField: {
      flex: 1,
    },
    table: {
      width: "100%",
      marginBottom: "15px",
    },
    summary: {
      textAlign: "right",
      fontSize: "1em",
      marginTop: "15px",
    },
    button: {
      display: "block",
      width: "100%",
      marginTop: "10px",
      background: "#007bff",
      color: "#fff",
      fontWeight: "bold",
      "&:hover": {
        background: "#0056b3",
      },
    },
    buttonAdd: {
      display: "block",
      width: "100%",
      marginTop: "10px",
      background: "#6C757D",
      color: "#fff",
      borderRadius: "4px",
      fontWeight: "bold",
      "&:hover": {
        background: "#5A6268",
      },
    },
    secondaryButton: {
      background: "#6c757d",
      borderRadius: "4px",
      "&:hover": {
        background: "#5a6268",
      },
    },
  }),
);
