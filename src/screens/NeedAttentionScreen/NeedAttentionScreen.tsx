import React, { useCallback, useEffect, useState } from "react";
import { useStyles } from "./NeedAttentionScreen.styles";
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
  Pagination,
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
import axios from "@/src/helpers/axios";
import { showErrorSnackBar } from "@/src/store/reducers/snackbar";
import { dispatch } from "@/src/store";
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
const NeedAttentionScreen = React.memo(() => {
  const classes = useStyles();
  const [totalPages, setTotalPages] = useState(2);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const labels = [
    "Đăng ký",
    "Điền survey",
    "Tạo Agent",
    "Dùng 10 credit",
    "Nâng cấp",
  ];
  const list_pageIndex = ["10", "25", "50"];
  const tableConfigs = {
    userCredit: {
      data: [
        {
          email: "nguyenvana@example.com",
          customer: "Nguyễn Văn A",
          creditUsed: "95%",
          surveyTag: "Content marketing",
          dayIdle: "0",
          churnRisk: "Medium",
        },
      ],
      config: [
        { key: "customer", label: "Khách hàng", columnType: COLUMN_TYPE.TEXT },
        { key: "email", label: "Email", columnType: COLUMN_TYPE.TEXT },
        {
          key: "creditUsed",
          label: "Credit Used",
          columnType: COLUMN_TYPE.TEXT,
        },
        { key: "surveyTag", label: "Survey Tag", columnType: COLUMN_TYPE.TEXT },
        { key: "dayIdle", label: "SDays Idle", columnType: COLUMN_TYPE.TEXT },
        { key: "churnRisk", label: "Churn Risk", columnType: COLUMN_TYPE.TEXT },
        {
          key: "actions",
          label: "Hành động",
          columnType: "ACTION",
          txt: "Upsell Gói Pro",
        },
      ],
    },
    deals: {
      data: [
        {
          email: "tranthib@example.com",
          customer: "Trần Thị B",
          creditUsed: "10%",
          surveyTag: "Chatbot",
          dayIdle: "16",
          churnRisk: "High",
          package: "Free",
        },
      ],
      config: [
        { key: "customer", label: "Khách hàng", columnType: COLUMN_TYPE.TEXT },
        { key: "email", label: "Email", columnType: COLUMN_TYPE.TEXT },
        { key: "dayIdle", label: "SDays Idle", columnType: COLUMN_TYPE.TEXT },
        {
          key: "creditUsed",
          label: "Credit Used",
          columnType: COLUMN_TYPE.TEXT,
        },
        { key: "package", label: "Gói", columnType: COLUMN_TYPE.TEXT },
        { key: "surveyTag", label: "Survey Tag", columnType: COLUMN_TYPE.TEXT },
        { key: "churnRisk", label: "Churn Risk", columnType: COLUMN_TYPE.TEXT },
        {
          key: "actions",
          label: "Hành động",
          columnType: "ACTION",
          txt: "Re-activate",
        },
      ],
    },
    expiredPackage: {
      data: [
        {
          email: "hoangtuan@example.com",
          customer: "Hoàng Tuấn",
          surveyTag: "Automation",
          churnRisk: "Medium",
          package: "Pro (12m)",
          endDate: "2025-03-15 (7d)",
        },
      ],
      config: [
        { key: "customer", label: "Khách hàng", columnType: COLUMN_TYPE.TEXT },
        { key: "email", label: "Email", columnType: COLUMN_TYPE.TEXT },
        { key: "package", label: "Gói", columnType: COLUMN_TYPE.TEXT },
        { key: "endDate", label: "Ngày Hết Hạn", columnType: COLUMN_TYPE.TEXT },
        { key: "surveyTag", label: "Survey Tag", columnType: COLUMN_TYPE.TEXT },
        { key: "churnRisk", label: "Churn Risk", columnType: COLUMN_TYPE.TEXT },
        {
          key: "actions",
          label: "Hành động",
          columnType: "ACTION",
          txt: "Gia hạn",
        },
      ],
    },
    negativeFeedback: {
      data: [
        {
          email: "lequangc@example.com",
          customer: "Lê Quang C",
          churnRisk: "High",
          package: "Free",
          feedback: "AI không đúng ý tôi, chưa hướng dẫn...",
        },
      ],
      config: [
        { key: "customer", label: "Khách hàng", columnType: COLUMN_TYPE.TEXT },
        { key: "email", label: "Email", columnType: COLUMN_TYPE.TEXT },
        { key: "package", label: "Gói", columnType: COLUMN_TYPE.TEXT },
        { key: "feedback", label: "Feedback", columnType: COLUMN_TYPE.TEXT },
        { key: "churnRisk", label: "Churn Risk", columnType: COLUMN_TYPE.TEXT },
        {
          key: "actions",
          label: "Hành động",
          columnType: "ACTION",
          txt: "Liên hệ",
        },
      ],
    },
    surveyTagCustomer: {
      data: [
        {
          email: "phamanh@example.com",
          customer: "Phạm Anh",
          creditUsed: "40%",
          dayIdle: "2",
          surveyTag: "High-budget, Content",
          churnRisk: "Low",
        },
      ],
      config: [
        { key: "customer", label: "Khách hàng", columnType: COLUMN_TYPE.TEXT },
        { key: "email", label: "Email", columnType: COLUMN_TYPE.TEXT },
        {
          key: "creditUsed",
          label: "Credit Used",
          columnType: COLUMN_TYPE.TEXT,
        },
        { key: "dayIdle", label: "SDays Idle", columnType: COLUMN_TYPE.TEXT },
        { key: "surveyTag", label: "Survey Tag", columnType: COLUMN_TYPE.TEXT },
        { key: "churnRisk", label: "Churn Risk", columnType: COLUMN_TYPE.TEXT },
        {
          key: "actions",
          label: "Hành động",
          columnType: "ACTION",
          txt: "Upsell VIP",
        },
      ],
    },
    // Thêm các bảng khác như customers, invoices, tasks...
  };

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

  const [filterConfigs, setFilterConfigs] = React.useState<FilterConfig[]>([
    {
      id: "creditUsed",
      label: "Credit Used (%)",
      type: "select",
      options: [
        { _id: "All", name: "Tất cả" },
        { _id: "less", name: "<=10%" },
        { _id: "FREE", name: "10-30%" },
        { _id: "PRO", name: "30-70%" },
        { _id: "ENTERPRISE", name: "70-100%" },
      ],
    },
    {
      id: "dayIddle",
      label: "Days Idle",
      type: "select",
      options: [
        { _id: "All", name: "Tất cả" },
        { _id: "FREE", name: ">7 ngày" },
        { _id: "ENTERPRISE", name: ">14 ngày" },
        { _id: "PRO", name: ">30 ngày" },
      ],
    },
    {
      id: "tagObjId",
      label: "Survey Tag",
      type: "multiselect",
      options: [
        { _id: "content", name: "Content marketing" },
        { _id: "chatbot", name: "Chatbot" },
        { _id: "automation", name: "Automation" },
        { _id: "low-budget", name: "Sẵn sàng chi thấp" },
        { _id: "high-budget", name: "Sẵn sàng chi cao" },
      ],
    },
    {
      id: "planObjId",
      label: "Gói dịch vụ",
      type: "select",
      options: [
        { _id: "all", name: "Tất cả" },
        { _id: "FREE", name: "Free" },
        { _id: "PRO", name: "Pro" },
        { _id: "ENTERPRISE", name: "Enterprise" },
      ],
    },
    {
      id: "churnRisk",
      label: "Churn Risk",
      type: "select",
      options: [
        { _id: "All", name: "Tất cả" },
        { _id: "FREE", name: "Low" },
        { _id: "PRO", name: "Medium" },
        { _id: "ENTERPRISE", name: "High" },
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

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    newPage: number,
  ) => {
    if (newPage === page) {
      return;
    }
    setPage(newPage);
  };

  const handleFilterChange = (id, value) => {
    setFilterValues(prev => {
      const currentValues = prev[id] || []; // Lấy danh sách hiện tại (mặc định là mảng rỗng nếu chưa có)
      if (!Array.isArray(value)) {
        // Nếu không phải multiselect, lưu giá trị đơn
        return {
          ...prev,
          [id]: value,
        };
      }

      if (value.length > 0 && value[value.length - 1] === "All") {
        // Nếu chọn 'All', bỏ tất cả các giá trị khác và chỉ giữ 'All'
        return {
          ...prev,
          [id]: ["All"],
        };
      }

      if (currentValues.includes("All")) {
        if (value.length === 0) {
          return {
            ...prev,
            [id]: ["All"],
          };
        }
        // Nếu 'All' đã được chọn trước đó và người dùng chọn một mục khác, xóa 'All'
        return {
          ...prev,
          [id]: value.filter(v => v !== "All"),
        };
      }

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

  const handleSetLimit = (value: number) => {
    setLimit(value);
  };

  const fetchFilterData = async () => {
    try {
      const [plansResponse, tagsResponse] = await Promise.all([
        axios.get("system/plans/listActive"),
        axios.get("system/tags/listActive?type=surveys"),
      ]);

      if (plansResponse.data.success && tagsResponse.data.success) {
        setFilterConfigs(prevConfigs =>
          prevConfigs.map(config => {
            if (config.id === "planObjId") {
              return {
                ...config,
                options: [
                  { _id: "All", name: "Tất cả" },
                  ...plansResponse.data.data.map(plan => ({
                    _id: plan._id,
                    name: plan.code,
                  })),
                ],
              };
            } else if (config.id === "tagObjId") {
              return {
                ...config,
                options: [
                  { _id: "All", name: "Tất cả" },
                  ...tagsResponse.data.data.map(tag => ({
                    _id: tag._id,
                    name: tag.name,
                  })),
                ],
              };
            }
            return config;
          }),
        );
      } else {
        dispatch(
          showErrorSnackBar(
            plansResponse.data?.message || tagsResponse.data?.message,
          ),
        );
      }
    } catch (error) {
      console.error("Error fetching filter data:", error);
    }
  };

  useEffect(() => {
    fetchFilterData();
  }, []);

  return (
    <Box>
      <Box className={classes.container}>
        <Box className={classes.pageTitle}>
          {lang.needAttention.view.header}
        </Box>
        <Box className={classes.pageDesc}>
          {lang.needAttention.view.subheader}
        </Box>

        <Box className={classes.statsRow}>
          <Box className={classes.wideCard}>
            <Typography variant="h6">
              {lang.needAttention.view.needAttention}
            </Typography>
            <Box sx={{ marginBottom: "20px" }}></Box>

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
                  </Box>
                </Box>
                {/* <button className={classes.btnFilter}>Lọc</button> */}
              </Box>
            </Box>
            <Typography variant="h6">
              {lang.needAttention.view.userCredit}
            </Typography>
            <Box className={classes.pageDesc}>
              {lang.needAttention.view.infoUserCredit}
            </Box>
            <Table>
              <TableHead>
                <TableRow>
                  {tableConfigs.userCredit.config.map((item, index) => (
                    <TableCell> {item?.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <ReusableTable
                data={tableConfigs.userCredit.data}
                config={tableConfigs.userCredit.config}
              />
            </Table>
          </Box>
        </Box>

        <Box className={classes.statsRow}>
          <Box className={classes.wideCard}>
            <Typography variant="h6">
              {lang.needAttention.view.userIdle}
            </Typography>
            <Box className={classes.pageDesc}>
              {lang.needAttention.view.userNotLogin}
            </Box>

            <Table>
              <TableHead>
                <TableRow>
                  {tableConfigs.deals.config.map((item, index) => (
                    <TableCell> {item?.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <ReusableTable
                data={tableConfigs.deals.data}
                config={tableConfigs.deals.config}
              />
            </Table>
          </Box>
        </Box>
        <Box className={classes.statsRow}>
          <Box className={classes.wideCard}>
            <Typography variant="h6">
              {lang.needAttention.view.expriredPackage}
            </Typography>
            <Box className={classes.pageDesc}>
              {lang.needAttention.view.upsellExtend}
            </Box>

            <Table>
              <TableHead>
                <TableRow>
                  {tableConfigs.expiredPackage.config.map((item, index) => (
                    <TableCell> {item?.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <ReusableTable
                data={tableConfigs.expiredPackage.data}
                config={tableConfigs.expiredPackage.config}
              />
            </Table>
          </Box>
        </Box>
        <Box className={classes.statsRow}>
          <Box className={classes.wideCard}>
            <Typography variant="h6">
              {lang.needAttention.view.negativeFeedback}
            </Typography>
            <Box className={classes.pageDesc}>
              {lang.needAttention.view.subNegativeFeedback}
            </Box>

            <Table>
              <TableHead>
                <TableRow>
                  {tableConfigs.negativeFeedback.config.map((item, index) => (
                    <TableCell> {item?.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <ReusableTable
                data={tableConfigs.negativeFeedback.data}
                config={tableConfigs.negativeFeedback.config}
              />
            </Table>
          </Box>
        </Box>
        <Box className={classes.statsRow}>
          <Box className={classes.wideCard}>
            <Typography variant="h6">
              {lang.needAttention.view.surveyTagCustomer}
            </Typography>
            <Box className={classes.pageDesc}>
              {lang.needAttention.view.subSurveyTagCustomer}
            </Box>

            <Table>
              <TableHead>
                <TableRow>
                  {tableConfigs.surveyTagCustomer.config.map((item, index) => (
                    <TableCell> {item?.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <ReusableTable
                data={tableConfigs.surveyTagCustomer.data}
                config={tableConfigs.surveyTagCustomer.config}
              />
            </Table>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" gap={2} mt={2}>
          <TextField
            select
            value={limit || ""}
            onChange={e => handleSetLimit(Number(e.target.value))}
            sx={{
              width: 72,
              height: 40,
              "& .MuiSelect-select": {
                display: "flex",
                alignItems: "center",
                padding: "8px",
              },
            }}
          >
            {list_pageIndex.map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            color="primary"
            size="large"
            shape="rounded"
          />
        </Box>
      </Box>
    </Box>
  );
});
export { NeedAttentionScreen };
