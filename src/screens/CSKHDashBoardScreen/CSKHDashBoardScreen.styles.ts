import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  container: {
    width: "95%",
    margin: "20px auto",
    padding: "20px",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
    height: "auto",
  },
  dropdown: {
    width: "250px",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#007bff",
  },
  filterSection: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    marginBottom: "20px",
    alignItems: "flex-end",
  },

  filterLabel: {
    fontWeight: "bold",
    marginBottom: "5px",
    fontSize: "0.9em",
    color: "#555",
  },
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
    flexDirection: "row", // Chuyển từ hàng ngang thành cột dọc
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    borderRadius: "8px",
  },

  filterInputs: {
    display: "flex",
    flexWrap: "wrap",
    gap: "15px",
    alignItems: "flex-end",
  },

  buttonContainer: {
    display: "flex",
    gap: "10px",
    justifyContent: "flex-start", // Hoặc "center" nếu muốn căn giữa
    marginTop: "10px",
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
  selectField: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "0.9em",
  },
  btnFilter: {
    padding: "8px 16px",
    cursor: "pointer",
    height: "32px",
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
  btnCreateTicket: {
    backgroundColor: "#28a745",
    color: "#fff",
    borderRadius: "4px",
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: "0.9em",
    height: "32px",
    fontWeight: "bold",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    gap: "8px", // Khoảng cách giữa icon và text
    "&:hover": {
      backgroundColor: "#218838",
    },
  },
  kpiCards: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    marginBottom: "30px",
  },
  kpiCard: {
    flex: "1",
    minWidth: "220px",
    padding: "20px",
    borderRadius: "6px",
    textAlign: "center",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
    color: "#333",
  },
  kpiValue: {
    fontSize: "1.4em",
    fontWeight: "bold",
    marginTop: "10px",
  },
  ticketSection: {
    marginBottom: "30px",
  },
  btnViewAll: {
    backgroundColor: "transparent",
    color: "#007bff",
    border: "1px solid #007bff",
    borderRadius: "4px",
    padding: "4px 8px",
    cursor: "pointer",
    fontSize: "0.8em",
    "&:hover": {
      backgroundColor: "#007bff",
      color: "#fff",
    },
  },
  priorityLists: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    marginBottom: "30px",
  },
  listBox: {
    flex: "1",
    minWidth: "360px",
    backgroundColor: "#fafafa",
    padding: "15px",
    borderRadius: "6px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
  },
  listHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "5px",
  },
  tagUrgent: {
    display: "inline-block",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "0.8em",
    color: "#fff",
    backgroundColor: "#dc3545",
  },
  tagStatus: {
    display: "inline-block",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "0.75em",
    backgroundColor: "#ffc107",
    color: "#333",
  },
  btnAction: {
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "4px",
    padding: "6px 12px",
    cursor: "pointer",
    fontSize: "0.8em",
    "&:hover": {
      backgroundColor: "#0056b3",
    },
  },
  chartSection: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    marginBottom: "30px",
  },
  chartContainer: {
    flex: "1",
    minWidth: "320px",
    backgroundColor: "#fafafa",
    padding: "15px",
    borderRadius: "6px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
  },
  chartTitle: {
    marginBottom: "10px",
    fontSize: "1em",
    color: "#555",
    borderBottom: "2px solid #eee",
    paddingBottom: "5px",
    fontWeight: "bold",
  },
  table: {
    marginTop: "10px",
  },
  viewBtnTable: {
    display: "flex",
    gap: "8px",
  },
  chartPlaceholder: {
    background: "#f0f2f5",
    height: "300px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#777",
    flexDirection: "column",
    padding: "10px",
    textAlign: "center",
  },
  pageTitle: {
    fontSize: "2rem",
    color: "#4a90e2",
    marginBottom: "20px",
    fontWeight: "bold",
  },
});
