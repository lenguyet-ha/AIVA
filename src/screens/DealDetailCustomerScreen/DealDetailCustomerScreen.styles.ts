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
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
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
    boldText: {
      fontWeight: "bold",
    },
    pageDesc: {
      fontSize: "1rem",
      color: "#666",
      marginBottom: "30px",
    },
    txt: {
      fontSize: "1rem",
      color: "#666",
      marginTop: "10px",
    },
    dealRow: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "24px",
      marginBottom: "24px",
    },
    box: {
      background: "#fff",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    },
    buttonGroup: {
      display: "flex",
      gap: "12px",
      marginTop: "12px",
    },
    tableContainer: {
      background: "#fff",
      borderRadius: "12px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      overflowX: "auto",
      padding: "16px",
      marginBottom: "24px",
    },
    statsRow: {
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
      marginBottom: "20px",
    },
    wideCard: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
    },
    confirmButton: {
      borderRadius: "4px",
      fontSize: "14px",
      fontWeight: "bold",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      gap: "8px", // Khoảng cách giữa icon và text
      backgroundColor: "#4a90e2",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#1565c0",
      },
    },
    space: {
      marginBottom: "5px",
    },
  }),
);
