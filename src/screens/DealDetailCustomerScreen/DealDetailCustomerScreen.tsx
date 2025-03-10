import React from "react";
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useStyles } from "./DealDetailCustomerScreen.styles";
import { lang } from "@/src/constants/lang";
import { COLUMN_TYPE } from "@/src/constants/tableconfigs";

const DealDetailCustomerScreen: React.FC = () => {
  const classes = useStyles();
  const ReusableTable = ({ data, config }) => {
    return (
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex} style={{ backgroundColor: "#fff" }}>
            {config.map((col, colIndex) => (
              <TableCell key={colIndex}>
                {col.columnType === "ACTION" ? (
                  <Button variant="contained" className={classes.confirmButton}>
                    {col?.txt}
                  </Button>
                ) : (
                  <>{row[col.key] ?? "—"}</>
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    );
  };
  const tableConfigs = {
    taskRelative: {
      data: [
        {
          tittle: "Gọi demo plugin content",
          deadline: "2025-03-08",
          status: "Đang chờ",
        },
        {
          tittle: "Gửi email báo giá",
          deadline: "2025-03-05",
          status: "Hoàn thành",
        },
      ],
      config: [
        { key: "tittle", label: "Tiêu đề", columnType: COLUMN_TYPE.TEXT },
        { key: "deadline", label: "Deadline", columnType: COLUMN_TYPE.TEXT },
        {
          key: "status",
          label: "Trạng thái",
          columnType: COLUMN_TYPE.TEXT,
        },
        {
          key: "actions",
          label: "Hành động",
          columnType: "ACTION",
          txt: "Chi tiết",
        },
      ],
    },
    notes: {
      data: [
        {
          date: "2025-03-01 10:30",
          desc: "KH quan tâm plugin, cần demo chi tiết.",
        },
        {
          date: "2025-02-28 14:15",
          desc: "Đã gửi email báo giá gói Pro + plugin content.",
        },
      ],
      config: [
        { key: "date", label: "Ngày", columnType: COLUMN_TYPE.TEXT },
        { key: "desc", label: "Nội dung", columnType: COLUMN_TYPE.TEXT },
      ],
    },

    // Thêm các bảng khác như customers, invoices, tasks...
  };
  return (
    <Box className={classes.container}>
      <Box className={classes.header}>
        <Typography className={classes.title}>
          {lang.dealDetail.view.tittle}
        </Typography>
      </Box>
      <Box className={classes.pageDesc}>{lang.dealDetail.view.subTittle}</Box>
      <Box className={classes.dealRow}>
        <Box className={classes.box}>
          <Typography variant="h6" gutterBottom>
            {lang.dealDetail.view.dealInfo}
          </Typography>
          <Typography className={classes.space}>
            <span className={classes.boldText}>
              {" "}
              {lang.dealDetail.view.dealName}:
            </span>{" "}
            Upsell Gói Pro + Plugin Content
          </Typography>
          <Typography className={classes.space}>
            <span className={classes.boldText}>
              {" "}
              {lang.dealDetail.view.stage}:
            </span>{" "}
            Negotiation
          </Typography>
          <Typography className={classes.space}>
            <span className={classes.boldText}>
              {lang.dealDetail.view.estimatePrice}:
            </span>{" "}
            ₫5,000,000
          </Typography>
          <Typography className={classes.space}>
            <span className={classes.boldText}>
              {" "}
              {lang.dealDetail.view.dealDeadline}:
            </span>{" "}
            2025-03-15
          </Typography>
          <Box className={classes.txt}>{lang.dealDetail.view.updateStage}</Box>
          <Select
            defaultValue="negotiation"
            fullWidth
            sx={{
              marginTop: "10px",
              marginBottom: "10px",
              height: "40px",
            }}
          >
            <MenuItem value="new">New</MenuItem>
            <MenuItem value="contact">Contact</MenuItem>
            <MenuItem value="negotiation">Negotiation</MenuItem>
            <MenuItem value="closed-won">Closed Won</MenuItem>
            <MenuItem value="closed-lost">Closed Lost</MenuItem>
          </Select>
          <Box className={classes.buttonGroup}>
            <Button variant="contained" color="primary" fullWidth>
              {lang.update}
            </Button>
            <Button variant="contained" color="success" fullWidth>
              {lang.deal}
            </Button>
            <Button variant="contained" color="error" fullWidth>
              {lang.cancelDeal}
            </Button>
          </Box>
        </Box>
        <Box className={classes.box}>
          <Typography variant="h6" gutterBottom>
            {lang.dealDetail.view.customer}
          </Typography>
          <Typography className={classes.space}>
            <span className={classes.boldText}>
              {" "}
              {lang.dealDetail.view.emailName}:
            </span>{" "}
            tranthib@example.com
          </Typography>
          <Typography className={classes.space}>
            <span className={classes.boldText}>
              {lang.dealDetail.view.creditUsed}:
            </span>{" "}
            70%
          </Typography>
          <Typography className={classes.space}>
            <span className={classes.boldText}>
              {lang.dealDetail.view.surveyTag}:
            </span>{" "}
            High-budget, Chatbot
          </Typography>
          <Typography className={classes.space}>
            <span className={classes.boldText}>
              {lang.dealDetail.view.lastLogin}:
            </span>{" "}
            2025-03-01
          </Typography>
          <Typography className={classes.space}>
            <span className={classes.boldText}>
              {lang.dealDetail.view.owner}:
            </span>{" "}
            Sale1
          </Typography>
        </Box>
      </Box>
      <Box className={classes.statsRow}>
        <Box className={classes.wideCard}>
          <Typography variant="h6">
            {lang.dealDetail.view.taskRelative}
          </Typography>
          <Box className={classes.pageDesc}>
            {lang.dealDetail.view.subTaskRelative}
          </Box>

          <Table>
            <TableHead>
              <TableRow>
                {tableConfigs.taskRelative.config.map((item, index) => (
                  <TableCell> {item?.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <ReusableTable
              data={tableConfigs.taskRelative.data}
              config={tableConfigs.taskRelative.config}
            />
          </Table>
        </Box>
      </Box>
      <Button
        variant="contained"
        color="secondary"
        sx={{
          marginBottom: "10px",
        }}
      >
        + Thêm Task
      </Button>

      <Box className={classes.statsRow}>
        <Box className={classes.wideCard}>
          <Typography variant="h6">{lang.dealDetail.view.notes}</Typography>
          <Box className={classes.pageDesc}>
            {lang.dealDetail.view.subNotes}
          </Box>

          <Table>
            <TableHead>
              <TableRow>
                {tableConfigs.notes.config.map((item, index) => (
                  <TableCell> {item?.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <ReusableTable
              data={tableConfigs.notes.data}
              config={tableConfigs.notes.config}
            />
          </Table>
        </Box>
      </Box>
      <Button variant="contained" color="secondary">
        + Thêm Note
      </Button>
    </Box>
  );
};

export default DealDetailCustomerScreen;
