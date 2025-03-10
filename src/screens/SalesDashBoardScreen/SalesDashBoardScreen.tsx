import React, { useCallback, useEffect, useState } from "react";
import { useStyles } from "./SalesDashBoardScreen.styles";
import PieChart from "@/src/components/ChartComponent/PieChart/PieChart";
import BarChart from "@/src/components/ChartComponent/BarChart/BarChart";
import { bar_data, bar_options, pie_data, pie_options } from "./ConfigData";
import OnboardingFunnelChart from "@/src/components/ChartComponent/OnboardingFunnelChart/OnboardingFunnelChart";
import { ChartOptions } from "chart.js";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";

import {
  Button,
  IconButton,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { TableHead } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { lang } from "@/src/constants/lang";
import { COLUMN_TYPE } from "@/src/constants/tableconfigs";
import { truncateText } from "@/src/helpers/format";
import { useRouter } from "next/router";
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
const SalesDashBoardScreen = React.memo(() => {
  const classes = useStyles();
  const router = useRouter();
  const labels = [
    "Đăng ký",
    "Điền survey",
    "Tạo Agent",
    "Dùng 10 credit",
    "Nâng cấp",
  ];
  const taskData = [
    {
      tittle: "Gọi tư vấn gói Pro",
      customer: "nguyenvana@example.com",
      deal: "Upsell Gói Pro #D123",
      deadline: "2025-03-10",
      status: "Đang chờ",
      id: 1,
    },
    {
      tittle: "Email gửi proposal plugin",
      customer: "tranthib@example.com",
      deal: "Plugin Content #D125",
      deadline: "2025-03-10",
      status: "Đang chờ",
      id: 2,
    },
  ];

  const noteData = [
    {
      date: "2025-03-01 10:15	",
      customer: "nguyenvana@example.com",
      deal: "Upsell Gói Pro #D123",
      description: "KH muốn thêm plugin content, hẹn demo thứ 4.",
    },
    {
      date: "2025-02-28 14:20	",
      customer: "tranthib@example.com",
      deal: "Plugin Content #D125",
      description: "Đã gửi proposal, chờ phản hồi email.",
    },
  ];

  const note_config = [
    {
      key: "date",
      label: "Ngày",
      columnType: COLUMN_TYPE.TEXT,
    },
    { key: "customer", label: "Khách hàng", columnType: COLUMN_TYPE.TEXT },
    {
      key: "deal",
      label: "Deal (nếu có)",
      columnType: COLUMN_TYPE.TEXT,
    },
    {
      key: "description",
      label: "Nội dung",
      columnType: COLUMN_TYPE.TEXT,
    },
  ];

  const config = [
    {
      key: "tittle",
      label: "Tiêu đề",
      columnType: COLUMN_TYPE.TEXT,
    },
    { key: "customer", label: "Khách hàng", columnType: COLUMN_TYPE.TEXT },
    {
      key: "deal",
      label: "Deal (nếu có)",
      columnType: COLUMN_TYPE.TEXT,
    },
    {
      key: "deadline",
      label: "Deadline",
      columnType: COLUMN_TYPE.TEXT,
    },
    {
      key: "status",
      label: "Trạng thái",
      columnType: COLUMN_TYPE.TEXT,
    },
    {
      key: "actions",
      label: "Hành động",
      columnType: "ACTION",
      actions: [
        { label: "Xem", actionType: "VIEW" },
        { label: "Sửa", actionType: "EDIT" },
        { label: "Xóa", actionType: "DELETE" },
      ],
    },
  ];
  const [filterConfigs, setFilterConfigs] = React.useState<FilterConfig[]>([
    {
      id: "planObjId",
      label: "Trạng thái",
      type: "select",
      options: [
        { _id: "All", name: "Tất cả" },
        { _id: "FREE", name: "Đang chờ" },
        { _id: "PRO", name: "Đang làm" },
        { _id: "ENTERPRISE", name: "Hoàn thành" },
      ],
    },
  ]);
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
  const [filterValues, setFilterValues] =
    React.useState<Record<string, any>>(initialFilters);

  const handleFilterChange = (id, value) => {
    setFilterValues(prev => {
      // const currentValues = prev[id] || []; // Lấy danh sách hiện tại (mặc định là mảng rỗng nếu chưa có)
      // if (!Array.isArray(value)) {
      //   // Nếu không phải multiselect, lưu giá trị đơn
      //   return {
      //     ...prev,
      //     [id]: value,
      //   };
      // }

      // if (value.length > 0 && value[value.length - 1] === "All") {
      //   // Nếu chọn 'All', bỏ tất cả các giá trị khác và chỉ giữ 'All'
      //   return {
      //     ...prev,
      //     [id]: ["All"],
      //   };
      // }

      // if (currentValues.includes("All")) {
      //   if (value.length === 0) {
      //     return {
      //       ...prev,
      //       [id]: ["All"],
      //     };
      //   }
      //   // Nếu 'All' đã được chọn trước đó và người dùng chọn một mục khác, xóa 'All'
      //   return {
      //     ...prev,
      //     [id]: value.filter(v => v !== "All"),
      //   };
      // }

      return {
        ...prev,
        [id]: value, // Cập nhật danh sách các mục được chọn
      };
    });
  };

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

  const stats = [
    { title: "Deals Đang Mở", value: "12", desc: "Trong pipeline" },
    {
      title: "Deals Thắng (Tháng)",
      value: "5",
      desc: "Tổng doanh thu ₫30,000,000",
    },
    { title: "Upsell Gói", value: "8", desc: "Deals upsell thành công" },
    {
      title: "Tỷ Lệ Chốt",
      value: "65%",
      desc: "So với tháng trước: +5%",
    },
    { title: "Tasks Hôm Nay", value: "3", desc: "Gọi, email, demo..." },
  ];

  const handleDetail = (id: string) => {
    router.push(`/sales-dashboard/detail/${id}`);
  };

  const renderCellContent = useCallback(
    (column, row) => {
      if (column.columnType === "ACTION" && column.actions) {
        return (
          <Button
            variant="contained"
            className={classes.confirmButton}
            onClick={() => {
              handleDetail(row["id"]);
            }}
          >
            {lang.salesDashBoard.view.detail}
          </Button>
        );
      }
      return truncateText(row[column.key]);
    },
    [], // Chỉ phụ thuộc vào `handleAction`, tránh re-render không cần thiết
  );

  return (
    <Box>
      <Box className={classes.container}>
        <Box className={classes.pageTitle}>
          {lang.salesDashBoard.view.header}
        </Box>
        <Box className={classes.pageDesc}>
          {lang.salesDashBoard.view.subheader}
        </Box>

        <Box className={classes.statsRow}>
          {stats.map((stat, index) => (
            <Box key={index} className={classes.card}>
              <Typography variant="h6">{stat.title}</Typography>
              <Box className={classes.bigValue}>{stat.value}</Box>
              <Box className={classes.desc}>{stat.desc}</Box>
            </Box>
          ))}
        </Box>

        <Box className={classes.statsRow}>
          <Box className={classes.chartCard}>
            <h3> {lang.salesDashBoard.view.dealbystage}</h3>
            <Box className={classes.chartPlaceholder}>
              <Box>
                <PieChart data={pie_data} options={pie_options} />
              </Box>
            </Box>
          </Box>
          <Box className={classes.chartCard}>
            <h3> {lang.salesDashBoard.view.revenueTargetMonth}</h3>
            <Box className={classes.chartPlaceholder}>
              <BarChart data={bar_data} options={bar_options} />
            </Box>
          </Box>
        </Box>

        <Box className={classes.statsRow}>
          <Box className={classes.wideCard}>
            <Typography variant="h6">
              {lang.salesDashBoard.view.needAttention}
            </Typography>
            <Box className={classes.pageDesc}>
              {lang.salesDashBoard.view.salemanageTask}
            </Box>
            <Box className={classes.filterAdvanced}>
              <Box className={classes.filterBar}>
                {filterConfigs.map(renderFilterGroup)}
                <Box className={classes.filterGroup} style={{ flex: 1 }}>
                  <Box component="label" htmlFor="keyword">
                    {lang.customerManagement.view.keyword}
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <TextField
                      id="keyword"
                      placeholder="Tiêu đề task, KH..."
                      size="small"
                      variant="outlined"
                      // value={keyword}
                      // onChange={e => setKeyword(e.target.value)}
                      sx={{
                        "& .MuiInputBase-root": {
                          height: "40px !important",
                          padding: "0px",
                          "& fieldset": {
                            border: "unset",
                          },
                        },
                      }}
                    />
                    <IconButton color="primary">
                      <SearchIcon />
                    </IconButton>
                    <Button
                      variant="contained"
                      className={classes.confirmButton}
                    >
                      <AddIcon fontSize="small" />
                      {lang.salesDashBoard.view.addTask}
                    </Button>
                  </Box>
                </Box>
                {/* <button className={classes.btnFilter}>Lọc</button> */}
              </Box>
            </Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell> {lang.salesDashBoard.view.tittle}</TableCell>
                  <TableCell> {lang.salesDashBoard.view.customer}</TableCell>
                  <TableCell> {lang.salesDashBoard.view.deal}</TableCell>
                  <TableCell> {lang.salesDashBoard.view.deadline}</TableCell>
                  <TableCell> {lang.salesDashBoard.view.status}</TableCell>
                  <TableCell> {lang.salesDashBoard.view.action}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {taskData?.map((taskVal, taskIndex) => (
                  <TableRow
                    style={{
                      backgroundColor: "#fff",
                    }}
                  >
                    {config?.map((item, index) => (
                      <TableCell> {renderCellContent(item, taskVal)}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>

        <Box className={classes.statsRow}>
          <Box className={classes.wideCard}>
            <Typography variant="h6">
              {lang.salesDashBoard.view.salesNote}
            </Typography>
            <Box className={classes.pageDesc}>
              {lang.salesDashBoard.view.salesHistory}
            </Box>
            <Box className={classes.filterAdvanced}>
              <Box className={classes.filterBar}>
                {/* {filterConfigs.map(renderFilterGroup)} */}
                <Box className={classes.filterGroup} style={{ flex: 1 }}>
                  <Box component="label" htmlFor="keyword">
                    {lang.customerManagement.view.keyword}
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <TextField
                      id="keyword"
                      placeholder="Tên KH, nội dung..."
                      size="small"
                      variant="outlined"
                      // value={keyword}
                      // onChange={e => setKeyword(e.target.value)}
                      sx={{
                        "& .MuiInputBase-root": {
                          height: "40px !important",
                          padding: "0px",
                          "& fieldset": {
                            border: "unset",
                          },
                        },
                      }}
                    />
                    <IconButton color="primary">
                      <SearchIcon />
                    </IconButton>
                    <Button
                      variant="contained"
                      className={classes.confirmButton}
                    >
                      <AddIcon fontSize="small" />
                      {lang.salesDashBoard.view.addNote}
                    </Button>
                  </Box>
                </Box>
                {/* <button className={classes.btnFilter}>Lọc</button> */}
              </Box>
            </Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell> {lang.salesDashBoard.view.date}</TableCell>
                  <TableCell> {lang.salesDashBoard.view.customer}</TableCell>
                  <TableCell> {lang.salesDashBoard.view.deal}</TableCell>
                  <TableCell> {lang.salesDashBoard.view.description}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {noteData?.map((taskVal, taskIndex) => (
                  <TableRow
                    style={{
                      backgroundColor: "#fff",
                    }}
                  >
                    {note_config?.map((item, index) => (
                      <TableCell> {renderCellContent(item, taskVal)}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>
      </Box>
    </Box>
  );
});
export { SalesDashBoardScreen };
