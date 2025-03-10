// styles.tsx
import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() =>
  createStyles({
    container: {
      width: "95%",
      margin: "20px auto",
      padding: "20px",
      background: "#fff",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
    },
    headerBar: {
      display: "flex",
      alignItems: "center",
      marginBottom: "30px",
    },
    backButton: {
      background: "#6c757d",
      color: "#fff",
      marginRight: "20px",
      textTransform: "none",
      "&:hover": {
        background: "#5a6268",
      },
    },
    section: {
      background: "#fafafa",
      borderRadius: "6px",
      padding: "15px 20px",
      marginBottom: "20px",
    },
    viewTag: {
      display: "flex",
      flexDirection: "row",
      gap: "16px",
      alignItems: "center",
      paddingLeft: "10px",
    },
    btnTag: {
      padding: "4px 8px",
      backgroundColor: "#6C757D",
      color: "#fff",
      fontSize: "14px",
      cursor: "pointer",
      borderRadius: "4px",
      "&:hover": {
        background: "#5A6268",
      },
    },
    btnAction: {
      padding: "4px 8px",
      backgroundColor: "#28A745",
      color: "#fff",
      fontSize: "14px",
      cursor: "pointer",
      borderRadius: "4px",
      "&:hover": {
        background: "#218838",
      },
    },
    btnApproveOrder: {
      padding: "4px 8px",
      color: "#fff",
      fontSize: "14px",
      borderRadius: "4px",
      width: "120px",
      marginTop: "10px",
      marginLeft: "10px",
      textAlign: "center",
      "&:hover": {
        background: "#218838",
      },
    },
    historyList: {
      listStyle: "none",
      marginBottom: "10px",
      marginLeft: "-40px",
    },
    historyItem: {
      marginBottom: "8px",
    },
    historyTime: {
      fontWeight: "bold",
      marginRight: "10px",
      color: "#007bff",
    },
    historyContent: {
      color: "#333",
    },
    btnAddNote: {
      padding: "4px 8px",
      backgroundColor: "#007BFF",
      color: "#fff",
      fontSize: "14px",
      cursor: "pointer",
      width: "120px",
      textAlign: "center",
      borderRadius: "4px",
      "&:hover": {
        background: "#0056b3",
      },
    },
    btnSaveNote: {
      padding: "4px 8px",
      backgroundColor: "#007BFF",
      color: "#fff",
      fontSize: "14px",
      cursor: "pointer",
      textAlign: "center",
      borderRadius: "4px",
      width: "50px",
      "&:hover": {
        background: "#0056b3",
      },
    },
    btnViewNote: {
      width: "100%",
    },
  }),
);
