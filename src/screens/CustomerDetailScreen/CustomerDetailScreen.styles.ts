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
      height: "auto",
    },
    pageTitle: {
      fontSize: "1.8rem",
      color: "#4a90e2",
      marginBottom: "15px",
      fontWeight: "bold",
    },
    pageDesc: {
      fontSize: "1rem",
      color: "#666",
      marginBottom: "25px",
    },

    /* TOP NAV */
    topNav: {
      background: "#fff",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 20px",
      borderBottom: "1px solid #ddd",
    },
    brand: {
      color: "#4a90e2",
      fontSize: "1.6rem",
      fontWeight: "bold",
    },
    menu: {
      "& ul": {
        display: "flex",
        gap: "20px",
      },
      "& ul li a": {
        color: "#333",
        fontWeight: 500,
        transition: "color 0.3s",
      },
      "& ul li a:hover, & ul li .active": {
        color: "#4a90e2",
        fontWeight: 600,
      },
    },

    /* USER INFO */
    userInfo: {
      display: "flex",
      alignItems: "center",
    },
    userInfoImg: {
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      marginRight: "10px",
    },

    /* CUSTOMER DETAIL GRID */
    customerDetailGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "24px",
      marginBottom: "25px",
    },
    customerInfo: {
      background: "#fff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 3px 6px rgba(0,0,0,0.05)",
    },
    customerInsights: {
      background: "#fff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 3px 6px rgba(0,0,0,0.05)",
    },
    customerInfoHeader: {
      fontSize: "1.4rem",
      marginBottom: "18px",
      fontWeight: "bold",
      borderBottom: "2px solid #f0f0f0",
      paddingBottom: "8px",
    },
    customerInsightsHeader: {
      fontSize: "1.4rem",
      marginBottom: "18px",
      fontWeight: "bold",
      borderBottom: "2px solid #f0f0f0",
      paddingBottom: "8px",
    },

    /* AVATAR */
    avatar: {
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      display: "block",
      marginBottom: "15px",
    },

    /* TAGS & LEAD SCORE */
    tag: {
      display: "inline-block",
      padding: "6px 12px",
      background: "#ffcc00",
      color: "#333",
      borderRadius: "8px",
      fontSize: "0.9rem",
      fontWeight: "bold",
    },
    scoreHigh: {
      color: "#fff",
      background: "#28a745",
      padding: "6px 12px",
      borderRadius: "8px",
    },

    /* ACTIVITY LOG & USAGE */
    usageData: {
      background: "#fff",
      padding: "22px",
      borderRadius: "10px",
      boxShadow: "0 3px 6px rgba(0,0,0,0.05)",
      marginBottom: "25px",
    },
    financialInfo: {
      background: "#fff",
      padding: "22px",
      borderRadius: "10px",
      boxShadow: "0 3px 6px rgba(0,0,0,0.05)",
      marginBottom: "25px",
    },
    activityLog: {
      background: "#fff",
      padding: "22px",
      borderRadius: "10px",
      boxShadow: "0 3px 6px rgba(0,0,0,0.05)",
      marginBottom: "25px",
    },
    usageDataHeader: {
      fontSize: "1.4rem",
      marginBottom: "18px",
      fontWeight: "bold",
      borderBottom: "2px solid #f0f0f0",
      paddingBottom: "8px",
    },
    financialInfoHeader: {
      fontSize: "1.4rem",
      marginBottom: "18px",
      fontWeight: "bold",
      borderBottom: "2px solid #f0f0f0",
      paddingBottom: "8px",
    },

    /* TABLE STYLES */
    customerTable: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: "0.95rem",
      "& th, & td": {
        padding: "14px",
        borderBottom: "1px solid #eee",
        textAlign: "left",
      },
      "& thead": {
        background: "#f9f9f9",
        fontWeight: "bold",
      },
    },

    /* CUSTOMER CARE */
    customerCare: {
      background: "#fff",
      padding: "22px",
      borderRadius: "10px",
      boxShadow: "0 3px 6px rgba(0,0,0,0.05)",
      marginBottom: "25px",
    },

    /* BUTTONS */
    btnAction: {
      display: "inline-flex",
      alignItems: "center",
      padding: "12px 16px",
      background: "#4a90e2",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "background 0.3s",
      marginRight: "12px",
      fontSize: "1rem",
      "& i": {
        marginRight: "6px",
      },
      "&:hover": {
        background: "#357ABD",
      },
    },
    viewInfo: {
      gap: "10px", // Tạo khoảng cách nhỏ giữa nhãn và giá trị
      paddingBottom: "10px",
    },
    viewInfoBehavior: {
      display: "flex",
      gap: "10px", // Tạo khoảng cách nhỏ giữa nhãn và giá trị
      paddingBottom: "10px",
    },
    label: {
      fontWeight: "bold",
      color: "#333",
    },
    labelBehavor: {
      fontWeight: "bold",
      color: "#333",
      lineHeight: "16px",
      width: "265px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      minWidth: "265px",
    },
    /* ALERT BOX */
    alertBox: {
      padding: "18px",
      marginBottom: "25px",
      borderRadius: "8px",
      fontWeight: "bold",
      fontSize: "1rem",
    },
    alertWarning: {
      backgroundColor: "#ffcc00",
      color: "#333",
    },
    alertDanger: {
      backgroundColor: "#dc3545",
      color: "#fff",
    },
    alertSuccess: {
      backgroundColor: "#28a745",
      color: "#fff",
    },
  }),
);
