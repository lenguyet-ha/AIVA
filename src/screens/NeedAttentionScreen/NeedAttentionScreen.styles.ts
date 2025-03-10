import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // Top nav
    topNav: {
      background: "#fff",
      borderBottom: "1px solid #e6e6e6",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 20px",
      height: "60px",
    },
    navLeft: {
      display: "flex",
      alignItems: "center",
    },
    brand: {
      color: "#4a90e2",
      marginRight: "30px",
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    menu: {
      "& ul": {
        display: "flex",
        gap: "20px",
        listStyle: "none",
        margin: 0,
        padding: 0,
      },
      "& li a": {
        display: "block",
        padding: "10px 0",
        color: "#333",
        fontWeight: 500,
        transition: "color 0.3s",
      },
      "& li a:hover": {
        color: "#4a90e2",
      },
      "& li .active": {
        color: "#4a90e2",
        fontWeight: 600,
        borderBottom: "2px solid #4a90e2",
        paddingBottom: "8px",
      },
    },
    userInfo: {
      display: "flex",
      alignItems: "center",
    },
    container: {
      width: "95%",
      margin: "20px auto",
    },
    pageTitle: {
      fontSize: "1.6rem",
      color: "#4a90e2",
      marginBottom: "5px",
      fontWeight: "bold",
    },
    pageDesc: {
      fontSize: "0.95rem",
      color: "#666",
      marginBottom: "20px",
    },
    statsRow: {
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
      marginBottom: "20px",
    },
    card: {
      background: "#fff",
      borderRadius: "8px",
      padding: "20px",
      flex: 1,
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      "& h3": {
        marginBottom: "15px",
        color: "#333",
        fontSize: "1.1rem",
      },
    },
    bigValue: {
      fontSize: "1.6rem",
      fontWeight: "bold",
      color: "#4a90e2",
      marginBottom: "5px",
    },
    desc: {
      color: "#777",
      fontSize: "0.9rem",
    },
    chartCard: {
      flex: 1,
    },
    chartPlaceholder: {
      background: "#f0f2f5",
      border: "1px dashed #ccc",
      height: "300px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#777",
      flexDirection: "column",
      padding: "10px",
      textAlign: "center",
    },
    onBoardingChart: {
      background: "#f0f2f5",
      border: "1px dashed #ccc",
      height: "300px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#777",
      flexDirection: "column",
      padding: "10px",
      textAlign: "center",
      paddingTop: "40px",
    },
    wideCard: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
    },
    miniTable: {
      width: "100%",
      borderCollapse: "collapse",
      "& thead": {
        background: "#f7f7f7",
      },
      "& th, & td": {
        padding: "10px",
        borderBottom: "1px solid #eee",
        fontSize: "0.9rem",
        textAlign: "left",
      },
      "& tr:last-child td": {
        borderBottom: "none",
      },
    },
    btnAction: {
      padding: "6px 12px",
      background: "#4a90e2",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background 0.3s",
      "&:hover": {
        background: "#357ABD",
      },
    },
    /* Filter Advanced */
    filterAdvanced: {
      marginBottom: "30px",
      "& h2": {
        fontSize: "1.4rem",
        color: "#333",
        marginBottom: "15px",
      },
    },
    filterBar: {
      display: "flex",
      flexWrap: "wrap",
      gap: "15px",
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    },
    filterGroup: {
      display: "flex",
      flexDirection: "column",
      minWidth: "150px",
      "& label": {
        fontSize: "0.9rem",
        marginBottom: "5px",
        color: "#555",
      },
      "& select, & input": {
        padding: "10px",
        fontSize: "0.9rem",
        border: "1px solid #ccc",
        borderRadius: "4px",
      },
    },

    btnFilter: {
      alignSelf: "flex-end",
      padding: "10px 20px",
      background: "#4a90e2",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "1rem",
      transition: "background 0.3s",
      marginTop: "auto",
      height: "45px",
      "&:hover": {
        background: "#357ABD",
      },
    },
    dropdown: {
      width: "250px",
      overflow: "hidden",
      textOverflow: "ellipsis",
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
  }),
);
