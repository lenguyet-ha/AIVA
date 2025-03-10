import React, { useRef } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";
import { useStyles } from "./CSKHDashBoardScreen.styles";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { COLUMN_TYPE } from "@/src/constants/tableconfigs";
import BaseStatusLabel from "@/src/components/BaseStatusLabel/BaseStatusLabel";
import { bgcolor } from "@mui/system";
import PieChart from "@/src/components/ChartComponent/PieChart/PieChart";
import {
  bar_data,
  bar_options,
  line_data,
  line_options,
  pie_data,
  pie_options,
} from "./ConfigData";
import BarChart from "@/src/components/ChartComponent/BarChart/BarChart";
interface FilterOption {
  _id: string;
  name: string;
}

interface FilterConfig {
  id: string;
  label: string;
  type: "select" | "multiselect" | "date";
  options: FilterOption[];
}
const CSKHDashBoardScreen: React.FC = () => {
  const classes = useStyles();
  const textFieldRef = useRef(null);
  const [filterConfigs, setFilterConfigs] = React.useState<FilterConfig[]>([
    {
      id: "time",
      label: "Khoảng thời gian",
      type: "select",
      options: [
        { _id: "All", name: "Hôm nay" },
        { _id: "7", name: "7 ngày qua" },
        { _id: "30", name: "30 ngày qua" },
        { _id: "anyway", name: "Tùy chọn" },
      ],
    },

    {
      id: "statusCK",
      label: "Nhân viên CSKH",
      type: "select",
      options: [
        { _id: "All", name: "Tất cả" },
        { _id: "1", name: "CSKH 1" },
        { _id: "2", name: "CSKH 2" },
      ],
    },
  ]);

  const listChartSection = [
    {
      name: "Xu Hướng Ticket",
      data: pie_data,
      options: pie_options,
      type: "pie",
    },
    {
      name: "Hành Vi Sử Dụng",
      data: bar_data,
      options: bar_options,
      type: "bar",
    },
    {
      name: "Phân Loại Gói Dịch Vụ",
      data: line_data,
      options: line_options,
      type: "bar",
    },
  ];

  const listDashBoard = [
    {
      text: "Open Tickets",
      value: 50,
      color: "#E7F3FF",
    },
    {
      text: "Avg Response Time",
      value: "1h 25m",
      color: "#FFE7E7",
    },
    {
      text: "Avg Resolution Time",
      value: "3h 40m",
      color: "#FFF3E7",
    },
    {
      text: "CSAT",
      value: "90%",
      color: "#E7FFE7",
    },
    {
      text: "Active Users (Hôm nay)",
      value: "120",
      color: "#F9E7FF",
    },
    {
      text: "Khách Sắp Hết Hạn",
      value: "8",
      color: "#FFFCE7",
    },
  ];
  const tableConfigs = {
    ticketList: {
      data: [
        {
          ticketId: "TK-1001",
          customer: "Nguyễn Văn A",
          priority: "Urgent",
          status: "New",
          cskh: "CSKH 1",
          createDate: "2025-03-01",
        },
        {
          ticketId: "TK-1002",
          customer: "Trần Văn B",
          priority: "High",
          status: "Inprogress",
          cskh: "CSKH 1",
          createDate: "2025-03-02",
        },
        {
          ticketId: "TK-1003",
          customer: "Phạm Văn C",
          priority: "MEDIUM",
          status: "Inprogress",
          cskh: "CSKH 1",
          createDate: "2025-03-03",
        },
      ],
      config: [
        { key: "customer", label: "Khách Hàng", columnType: COLUMN_TYPE.TEXT },
        { key: "ticketId", label: "Mã Ticket", columnType: COLUMN_TYPE.TEXT },
        {
          key: "createDate",
          label: "Ngày Tạo",
          columnType: COLUMN_TYPE.TEXT,
        },
        {
          key: "priority",
          label: "Mức Ưu Tiên",
          columnType: COLUMN_TYPE.TEXT_HIGHLIGHT,
        },
        { key: "status", label: "Trạng Thái", columnType: COLUMN_TYPE.TEXT },
        { key: "cskh", label: "Nhân Viên CSKH", columnType: COLUMN_TYPE.TEXT },
        {
          key: "actions",
          label: "Hành động",
          columnType: "ACTION",
          txt: "Upsell Gói Pro",
          options: [
            {
              txt: "Xem",
            },
            {
              txt: "Chuyển",
            },
          ],
        },
      ],
    },
    customerUsed: {
      data: [
        {
          customer: "Phạm Văn D",
          package: "Basic",
          lastLogin: "2025-02-28",
          status: "No login >7d",
        },
        {
          customer: "Hoàng Thị E",
          package: "Free",
          lastLogin: "2025-02-25",
          status: "No login >14d",
        },
        {
          customer: "Lê Văn F",
          package: "Premium",
          lastLogin: "2025-02-20",
          status: "No login >21d",
        },
      ],
      config: [
        { key: "customer", label: "Khách hàng", columnType: COLUMN_TYPE.TEXT },
        { key: "package", label: "Gói", columnType: COLUMN_TYPE.TEXT },
        {
          key: "lastLogin",
          label: "Lần ĐN Cuối",
          columnType: COLUMN_TYPE.TEXT,
        },
        {
          key: "status",
          label: "Tình Trạng",
          columnType: COLUMN_TYPE.TEXT_HIGHLIGHT,
          defaultColor: {
            bgColor: "#6C757D",
            color: "#FFFFFF",
          },
        },
        {
          key: "actions",
          label: "Hành động",
          columnType: "ACTION",
          txt: "Re-activate",
          options: [
            {
              txt: "Gọi",
            },
            {
              txt: "Email",
            },
          ],
        },
      ],
    },
    almostExpriedCustomer: {
      data: [
        {
          customer: "Phạm Văn D",
          package: "Basic",
          expriredDate: "2025-03-10",
          leftday: "7 days",
        },
        {
          customer: "Hoàng Thị E",
          package: "Free",
          expriredDate: "2025-03-17",
          leftday: "14 days",
        },
        {
          customer: "Lê Văn F",
          package: "Premium",
          expriredDate: "2025-03-24",
          leftday: "21 days",
        },
      ],
      config: [
        { key: "customer", label: "Khách hàng", columnType: COLUMN_TYPE.TEXT },
        { key: "package", label: "Gói", columnType: COLUMN_TYPE.TEXT },
        {
          key: "expriredDate",
          label: "Ngày Hết Hạn",
          columnType: COLUMN_TYPE.TEXT,
        },
        {
          key: "leftday",
          label: "Ngày Còn Lại",
          columnType: COLUMN_TYPE.TEXT_HIGHLIGHT,
          defaultColor: {
            bgColor: "#FFC107",
            color: "#333333",
          },
        },
        {
          key: "actions",
          label: "Hành động",
          columnType: "ACTION",
          txt: "Gia hạn",
          options: [
            {
              txt: "Nhắc gia hạn",
            },
            {
              txt: "Upsell",
            },
          ],
        },
      ],
    },
  };

  const ReusableTable = ({ data, config }) => {
    return (
      <>
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex} style={{ backgroundColor: "#fff" }}>
            {config.map((col, colIndex) => (
              <TableCell key={colIndex}>
                {col.columnType === "ACTION" ? (
                  <Box className={classes.viewBtnTable}>
                    {col?.options?.map(item => (
                      <Button className={classes.btnAction}>{item?.txt}</Button>
                    ))}
                  </Box>
                ) : (
                  <>
                    {col.columnType === COLUMN_TYPE.TEXT_HIGHLIGHT ? (
                      <BaseStatusLabel
                        statusKey={row[col.key] || ""}
                        text={row[col.key] || ""}
                        defaultColor={col?.defaultColor}
                      />
                    ) : (
                      <>{row[col.key] ?? "—"}</>
                    )}
                  </>
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </>
    );
  };

  const initialFilters = filterConfigs.reduce<Record<string, any>>(
    (acc, config) => ({
      ...acc,
      [config.id]:
        config.type === "multiselect"
          ? ["All"]
          : config.type === "date"
          ? ""
          : "All",
    }),
    {},
  );

  const handleFilterChange = (id, value) => {
    setFilterValues(prev => {
      return {
        ...prev,
        [id]: value, // Cập nhật danh sách các mục được chọn
      };
    });
  };

  const [filterValues, setFilterValues] =
    React.useState<Record<string, any>>(initialFilters);
  const renderFilterGroup = config => {
    return (
      <Box key={config.id} className={classes.filterGroup}>
        <Box component="label" htmlFor={config.id}>
          {config.label}
        </Box>
        <TextField
          select
          id={config.id}
          size="small"
          variant="outlined"
          style={{ maxWidth: "250px" }}
          value={filterValues[config.id]}
          onChange={e => handleFilterChange(config.id, e.target.value)}
          SelectProps={{
            multiple: config.type === "multiselect",
            MenuProps: {
              disablePortal: true, // Đảm bảo dropdown gắn vào container của nó
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left",
              },
              style: {
                maxHeight: "500px",
              },
            },
          }}
          inputRef={textFieldRef} // Gán ref vào TextField
        >
          {config.options.map(opt => (
            <MenuItem
              key={opt._id}
              value={opt._id}
              style={{ width: "250px", maxHeight: "300px" }}
            >
              <span className={classes.dropdown}>{opt.name}</span>
            </MenuItem>
          ))}
        </TextField>
      </Box>
    );
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.pageTitle}>{"Dashboard CSKH"}</Box>
      <Box className={classes.filterAdvanced}>
        <Box className={classes.filterBar}>
          <Box className={classes.filterInputs}>
            {filterConfigs.map(renderFilterGroup)}
          </Box>

          {/* Thêm Box mới để đẩy nút xuống dưới */}
          <Box className={classes.buttonContainer}>
            <Box className={classes.btnFilter}>Xem Báo Cáo</Box>
            <Box className={classes.btnCreateTicket}>Tạo Ticket</Box>
          </Box>
        </Box>
      </Box>
      {/* Filter Section */}
      {/* <Box className={classes.filterSection}>
        <Box className={classes.filterGroup}>
          {filterConfigs.map(renderFilterGroup)}
        </Box>
        <Box className={classes.filterGroup}>
          <Typography className={classes.filterLabel}>
            Nhân viên CSKH:
          </Typography>
          <Select defaultValue="all" className={classes.selectField}>
            <MenuItem value="all">Tất cả</MenuItem>
            <MenuItem value="agent1">CSKH 1</MenuItem>
            <MenuItem value="agent2">CSKH 2</MenuItem>
          </Select>
        </Box>
        <Button className={classes.btnFilter}>Xem Báo Cáo</Button>
        <Button className={classes.btnCreateTicket}>Tạo Ticket</Button>
      </Box> */}

      {/* KPI Cards */}
      <Box className={classes.kpiCards}>
        {listDashBoard.map((item, index) => (
          <Box
            key={index}
            className={classes.kpiCard}
            sx={{
              backgroundColor: item.color,
            }}
          >
            <Typography>{item.text}</Typography>
            <Typography className={classes.kpiValue}>{item.value}</Typography>
          </Box>
        ))}
      </Box>

      {/* Ticket Table Section */}
      <Box className={classes.ticketSection}>
        <Typography variant="h6">Danh Sách Ticket</Typography>
        <TableContainer component={Paper} className={classes.table}>
          <Table>
            <TableHead>
              <TableRow>
                {tableConfigs.ticketList.config.map((item, index) => (
                  <TableCell> {item?.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <ReusableTable
                data={tableConfigs.ticketList.data}
                config={tableConfigs.ticketList.config}
              />
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Priority Lists */}
      <Box className={classes.priorityLists}>
        <Box className={classes.listBox}>
          <Box className={classes.listHeader}>
            <Typography>{"Khách Ít Sử Dụng"}</Typography>
            <Button className={classes.btnViewAll}>Xem tất cả</Button>
          </Box>
          <TableContainer component={Paper} className={classes.table}>
            <Table>
              <TableHead>
                <TableRow>
                  {tableConfigs.customerUsed.config.map((item, index) => (
                    <TableCell> {item?.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <ReusableTable
                  data={tableConfigs.customerUsed.data}
                  config={tableConfigs.customerUsed.config}
                />
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box className={classes.listBox}>
          <Box className={classes.listHeader}>
            <Typography>{"Khách Sắp Hết Hạn"}</Typography>
            <Button className={classes.btnViewAll}>Xem tất cả</Button>
          </Box>
          <TableContainer component={Paper} className={classes.table}>
            <Table>
              <TableHead>
                <TableRow>
                  {tableConfigs.almostExpriedCustomer.config.map(
                    (item, index) => (
                      <TableCell> {item?.label}</TableCell>
                    ),
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                <ReusableTable
                  data={tableConfigs.almostExpriedCustomer.data}
                  config={tableConfigs.almostExpriedCustomer.config}
                />
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      {/* Chart Section */}
      <Box className={classes.chartSection}>
        {listChartSection.map((chart, index) => (
          <Box key={index} className={classes.chartContainer}>
            <Typography className={classes.chartTitle}>
              {chart?.name}
            </Typography>
            <Box className={classes.chartPlaceholder}>
              {chart?.type === "pie" ? (
                <PieChart data={chart?.data} options={chart?.options} />
              ) : (
                <BarChart data={chart?.data} options={chart?.options} />
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CSKHDashBoardScreen;
