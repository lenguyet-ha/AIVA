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
    pageTitle: {
      fontSize: "2rem",
      color: "#4a90e2",
      marginBottom: "10px",
      fontWeight: "bold",
    },
    pageDesc: {
      fontSize: "1rem",
      color: "#666",
      marginBottom: "30px",
    },

    /* Top Navigation */
    topNav: {
      background: "#fff",
      borderBottom: "1px solid #e6e6e6",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 20px",
      height: "60px",
      marginBottom: "20px",
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
        padding: 0,
        margin: 0,
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
      "& li a.active": {
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
    userInfoImg: {
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      marginRight: "10px",
    },

    /* Saved Filter & Segment */
    savedFilterBar: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "20px",
      "& label": {
        fontSize: "1rem",
        color: "#333",
      },
      "& select": {
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "0.9rem",
      },
    },
    btnLoadSegment: {
      padding: "8px 12px",
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
    btnSaveSegment: {
      padding: "8px 12px",
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
      padding: "20px",
      borderRadius: "8px",
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

    /* Export / Import / API */
    exportImportBar: {
      display: "flex",
      gap: "10px",
      marginBottom: "20px",
    },
    btnExport: {
      padding: "10px 15px",
      background: "#ffc107",
      color: "#333",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "0.95rem",
      transition: "background 0.3s",
      "&:hover": {
        background: "#ffca2c",
      },
    },
    btnImport: {
      padding: "10px 15px",
      background: "#ffc107",
      color: "#333",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "0.95rem",
      transition: "background 0.3s",
      "&:hover": {
        background: "#ffca2c",
      },
    },
    btnApiIntegration: {
      padding: "10px 15px",
      background: "#ffc107",
      color: "#333",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "0.95rem",
      transition: "background 0.3s",
      "&:hover": {
        background: "#ffca2c",
      },
    },

    /* Mass Actions */
    massActions: {
      display: "flex",
      gap: "10px",
      marginBottom: "30px",
    },
    btnMassEmail: {
      padding: "10px 15px",
      background: "#ff8080",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "0.95rem",
      transition: "background 0.3s",
      "&:hover": {
        background: "#ff6666",
      },
    },
    btnMassAssign: {
      padding: "10px 15px",
      background: "#28A734",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "0.95rem",
      transition: "background 0.3s",
      "&:hover": {
        background: "#ff6666",
      },
    },
    btnMassChurn: {
      padding: "10px 15px",
      background: "#ff8080",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "0.95rem",
      transition: "background 0.3s",
      "&:hover": {
        background: "#ff6666",
      },
    },

    /* Section Block */
    sectionBlock: {
      marginBottom: "40px",
      "& h2": {
        fontSize: "1.5rem",
        color: "#333",
        marginBottom: "10px",
      },
    },
    sectionDesc: {
      fontSize: "1rem",
      color: "#666",
      marginBottom: "20px",
    },

    /* Table Wrapper & Customer Table */
    tableWrapper: {
      background: "#fff",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      overflowX: "auto",
      marginBottom: "30px",
    },
    customerTable: {
      width: "100%",
      borderCollapse: "collapse",
      "& thead": {
        background: "#f7f7f7",
      },
      "& th, & td": {
        padding: "12px 15px",
        borderBottom: "1px solid #eee",
        fontSize: "0.95rem",
        textAlign: "left",
      },
      "& tr:last-child td": {
        borderBottom: "none",
      },
    },

    /* Button Action */
    btnAction: {
      padding: "8px 12px",
      background: "#4a90e2",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "0.9rem",
      transition: "background 0.3s",
      "&:hover": {
        background: "#357ABD",
      },
    },

    /* Bottom Navigation & Pagination */
    bottomNav: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "30px",
    },
    pagination: {
      display: "flex",
      gap: "8px",
    },
    pageBtn: {
      padding: "10px 14px",
      background: "#fff",
      border: "1px solid #ccc",
      borderRadius: "4px",
      cursor: "pointer",
      color: "#333",
      transition: "background 0.3s",
      "&:hover": {
        background: "#f0f0f0",
      },
      "&.active": {
        background: "#4a90e2",
        color: "#fff",
        borderColor: "#4a90e2",
      },
      "&.disabled": {
        opacity: 0.5,
        cursor: "not-allowed",
      },
    },
    btnScrollTop: {
      padding: "10px 15px",
      background: "#4a90e2",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "1rem",
      transition: "background 0.3s",
      "&:hover": {
        background: "#357ABD",
      },
    },

    /* Popup Detail */
    popup: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.3)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    hidden: {
      display: "none",
    },
    popupContent: {
      background: "#fff",
      padding: "20px",
      width: "400px",
      maxWidth: "90%",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
    },
    btnClose: {
      marginTop: "15px",
      padding: "10px 15px",
      background: "#f44336",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "0.9rem",
      transition: "background 0.3s",
      "&:hover": {
        background: "#d32f2f",
      },
    },
    viewBtnAction: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      gap: "10px",
      alignItems: "center",
    },
    date_input: {
      width: "150px",
      "& .MuiOutlinedInput-root": {
        height: "40px",
        borderRadius: "4px",
        border: "1px solid lightgray",
      },
      "& input": {
        padding: "10px 8px",
      },
      "& fieldset": {
        border: "none",
      },
    },
    dropdown: {
      width: "250px",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    selectAllContainer: {
      display: "flex",
      alignItems: "center",
    },
  }),
);
