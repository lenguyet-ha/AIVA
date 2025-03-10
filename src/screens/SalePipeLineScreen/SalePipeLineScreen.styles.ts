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
      borderRadius: "12px",
      boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: {
      fontSize: "1.8rem",
      color: "#4a90e2",
      fontWeight: "bold",
    },
    pipelineBoard: {
      display: "flex",
      gap: "24px",
      overflowX: "auto",
      padding: "20px 0",
    },
    pipelineColumn: {
      background: "#f9f9f9",
      borderRadius: "12px",
      boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
      width: "260px",
      minWidth: "260px",
      padding: "15px",
      display: "flex",
      flexDirection: "column",
      transition: "all 0.3s ease-in-out",
    },
    dealCard: {
      background: "#fff",
      marginBottom: "12px",
      padding: "15px",
      borderRadius: "8px",
      cursor: "grab",
      border: "1px solid #ddd",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      transition: "transform 0.2s",
      "&:hover": {
        transform: "scale(1.02)",
      },
    },
    dragging: {
      opacity: 0.5,
      border: "2px dashed #4a90e2",
    },
    button: {
      marginTop: "10px",
      background: "#4a90e2",
      color: "#fff",
      borderRadius: "6px",
      fontWeight: "bold",
      "&:hover": {
        background: "#357ABD",
      },
    },
  }),
);
