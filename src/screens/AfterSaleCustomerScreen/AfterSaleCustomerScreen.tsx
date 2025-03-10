// CustomerManagement.tsx
import React, { useEffect, useRef, useState } from "react";
import { useStyles } from "./AfterSaleCustomerScreen.styles";
import BaseMUITable from "@/src/components/BaseMUITable/BaseMUITable";
import { COLUMN_TYPE } from "@/src/constants/tableconfigs";
import { columns } from "./ConfigData";
import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import { Select } from "@mui/material";
import { lang } from "@/src/constants/lang";
import axios from "@/src/helpers/axios";
import { AxiosRequestConfig } from "axios";
import { dispatch } from "@/src/store";
import {
  showErrorSnackBar,
  showSuccessSnackBar,
} from "@/src/store/reducers/snackbar";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useRouter } from "next/router";
import { colorVal } from "@/src/constants/colors";
import DatePicker from "react-datepicker";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useAuth } from "@/src/contexts/AuthContext";

type ColumnType = (typeof COLUMN_TYPE)[keyof typeof COLUMN_TYPE];

interface Option {
  text: string;
  value: string;
}

interface TableColumn {
  key: string;
  label: string;
  columnType: ColumnType; // CHẮC CHẮN kiểu này không phải string
  actions?: { label: string; actionType: "DELETE" | "EDIT" | "VIEW" }[];
  required?: boolean;
  options?: Option[]; // Mảng option sẽ chứa các đối tượng có text và value
}
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
interface Paginator {
  itemCount: number;
  limit: number;
  pageCount: number;
  currentPage: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

// Cấu hình cho các bộ lọc

const data = [
  {
    id: "1",
    type: "Dịch vụ tư vấn",
    name: "Nguyễn Văn A",
    agent: "CSKH 1",
    orderDate: "2025-03-01",
    paymentDate: "2025-03-05",
    status: "Active",
    priority: "Ugent",
  },
  {
    id: "2",
    type: "Khóa học Digital Marketing",
    name: "Trần Thị B",
    agent: "CSKH 2",
    orderDate: "2025-02-28",
    paymentDate: "2025-03-01",
    status: "Active",
    priority: "High",
  },
  {
    id: "3",
    type: "Gói phần mềm SaaS",
    name: "Lê Quang C",
    agent: "CSKH 1",
    paymentDate: "2025-03-03",
    tranfer: "Ngân hàng Vietcombank",
    status: "WaitingInactive",
    priority: "Medium",
  },
  {
    id: "4",
    type: "Đào tạo Chatbot AI",
    name: "Phạm Văn D",
    agent: "CSKH 1",
    orderDate: "2025-03-03",
    paymentDate: "2025-03-07",
    status: "WaitingInactive",
    priority: "Medium",
  },
  {
    id: "5",
    type: "Dịch vụ CRM",
    name: "Hoàng Thị E",
    agent: "CSKH 3",
    orderDate: "2025-02-25",
    paymentDate: "2025-03-02",
    status: "Active",
    priority: "High",
  },
  {
    id: "6",
    type: "Dịch vụ quản lý tài chính",
    name: "Đỗ Minh F",
    agent: "CSKH 4",
    orderDate: "2025-03-04",
    paymentDate: "2025-03-08",
    status: "Active",
    priority: "Ugent",
  },
];

const AfterSaleCustomerScreen: React.FC = () => {
  const classes = useStyles();
  const { permissions } = useAuth();
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterConfigs, setFilterConfigs] = React.useState<FilterConfig[]>([
    {
      id: "planObjId",
      label: "Gói",
      type: "select",
      options: [
        { _id: "all", name: "Tất cả" },
        { _id: "FREE", name: "Free" },
        { _id: "PRO", name: "Pro" },
        { _id: "ENTERPRISE", name: "Enterprise" },
      ],
    },
    {
      id: "userObjId",
      label: "Onboarding",
      type: "select",
      options: [
        { _id: "All", name: "Tất cả" },
        { _id: "1", name: "Chưa login" },
        { _id: "2", name: "Đã login, chưa dùng" },
        { _id: "3", name: "Đã dùng >=1 lần" },
        { _id: "4", name: "Đã dùng >=7 lần" },
        { _id: "5", name: "Đã dùng >=20 lần" },
        { _id: "6", name: "Fail Onboarding" },
      ],
    },
    {
      id: "priority",
      label: "Trạng thái tương tác",
      type: "select",
      options: [
        { _id: "All", name: "Tất cả" },
        { _id: "1", name: "Ngủ đông" },
        { _id: "2", name: "Ít hoạt động" },
        { _id: "3", name: "Trung bình" },
        { _id: "4", name: "Tích cực" },
        { _id: "5", name: "Rất tích cực" },
      ],
    },
    {
      id: "exprired",
      label: "Sắp hết hạn",
      type: "select",
      options: [
        { _id: "All", name: "Tất cả" },
        { _id: "1", name: "Trong 3 ngày" },
        { _id: "2", name: "Trong 7 ngày" },
        { _id: "3", name: "Trong 14 ngày" },
        { _id: "4", name: "Trong 21 ngày" },
        { _id: "5", name: "Trong 30 ngày" },
      ],
    },
    {
      id: "exprired",
      label: "Churn Risk",
      type: "select",
      options: [
        { _id: "All", name: "Tất cả" },
        { _id: "1", name: "Thấp" },
        { _id: "2", name: "Trung bình" },
        { _id: "3", name: "Cao" },
      ],
    },
    {
      id: "exprired",
      label: "Trạng thái KH",
      type: "select",
      options: [
        { _id: "All", name: "Tất cả" },
        { _id: "1", name: "Đang dùng" },
        { _id: "2", name: "Sắp hết hạn" },
        { _id: "3", name: "Hết hạn" },
        { _id: "4", name: "Tạm dừng" },
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
  const textFieldRef = useRef(null);

  const router = useRouter();
  const [filterValues, setFilterValues] =
    React.useState<Record<string, any>>(initialFilters);
  const [savedFilter, setSavedFilter] = useState("");
  // const [data, setData] = useState([]);
  const [keyword, setKeyword] = React.useState("");
  const [loading, setLoading] = useState(true);

  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = event => {
    setSelectAll(event.target.checked);
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

  const [pagination, setPagination] = useState<Paginator>({
    itemCount: 0,
    limit: 10,
    pageCount: 1,
    currentPage: 1,
    pagingCounter: 1,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null,
  });

  // const getListCustomer = async () => {
  //   try {
  //     const payload: AxiosRequestConfig = {
  //       url: "system/users/list",
  //       method: "get",
  //       params: {
  //         limit: limit,
  //         page: currentPage,
  //         planObjId: filterValues?.planObjId,
  //         tagObjIds: filterValues?.tagObjId?.filter(v => v !== "All"),
  //         lastActionDate: filterValues?.lastActionDate,
  //         createdAt: filterValues?.createdAt || null,
  //         search: keyword || null,
  //       },
  //     };
  //     const response = await axios(payload);
  //     if (response.data.success) {
  //       setData(response?.data?.data?.items);
  //       setPagination(response?.data?.data?.paginator);
  //       return response.data;
  //     } else {
  //       dispatch(showErrorSnackBar(response?.data?.message));
  //       router.push("/login");
  //       return response.data;
  //     }
  //   } catch (error) {
  //     dispatch(showErrorSnackBar(lang.errorDetected));
  //     router.push("/login");
  //     console.log("error: ", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleRefresh = () => {
    setLoading(true);
  };

  const handleRefreshFilter = () => {
    setFilterValues(initialFilters);
  };

  const handleSearch = () => {
    // getListCustomer();
    // console.log("Search keyword:", keyword);
    // Xử lý tìm kiếm theo keyword nếu cần
  };

  const handleChangeLimit = async (value: number) => {
    setLoading(true);
    setCurrentPage(1);
    setLimit(value);
  };

  const handleChangeCurrentPage = async (value: number) => {
    setLoading(true);
    setCurrentPage(value);
  };

  const handleDateChange = (columnKey: string, value: Dayjs | null) => {
    setFilterValues(prev => ({
      ...prev,
      [columnKey]: value ? value.format("YYYY-MM-DD") : null,
    }));
  };

  const renderFilterGroup = config => {
    if (config.type === "date") {
      return (
        <Box
          key={config.id}
          className={classes.filterGroup}
          sx={{
            "& .MuiInputBase-input": {
              border: "none",
            },
          }}
        >
          <Box component="label" htmlFor={config.id}>
            {config.label}
          </Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              value={
                dayjs(filterValues[config.id], "YYYY-MM-DD").isValid()
                  ? dayjs(filterValues[config.id], "YYYY-MM-DD")
                  : null
              }
              onChange={date => handleDateChange(config.id, date)}
              className={classes.date_input}
              format="DD/MM/YYYY"
            />
          </LocalizationProvider>
        </Box>
      );
    }
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

  useEffect(() => {
    // getListCustomer();
  }, [limit, currentPage]);

  useEffect(() => {
    if (loading) {
      setLoading(false);
      // getListCustomer();
    }
  }, [loading]);

  return (
    <Box className={classes.container}>
      {/* Page Title & Description */}
      <Box className={classes.pageTitle}>{lang.afterSale.view.header}</Box>

      {/* Filter Advanced */}
      <Box className={classes.filterAdvanced}>
        <Box className={classes.filterBar}>
          {filterConfigs.map(renderFilterGroup)}
          <Box className={classes.filterGroup} style={{ flex: 1 }}>
            <Box component="label" htmlFor="keyword">
              {lang.afterSale.view.keyword}
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <TextField
                id="keyword"
                placeholder="Tên, Email..."
                size="small"
                variant="outlined"
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
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
              <IconButton color="primary" onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
              <Tooltip title="Reset Lọc" placement="top">
                <IconButton color="primary" onClick={handleRefreshFilter}>
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          {/* <button className={classes.btnFilter}>Lọc</button> */}
        </Box>
      </Box>

      <Box className={classes.viewBtnAction}>
        <Box className={classes.exportImportBar}>
          <Box className={classes.txtMassAssign}>
            {lang.afterSale.view.allaction}:
          </Box>
          <Box className={classes.btnMassAssign}>
            {lang.afterSale.view.bulkbrosing}
          </Box>
          <Box className={classes.btnMassAssign}>
            {lang.afterSale.view.uploadList}
          </Box>
          <Box className={classes.btnMassAssign}>
            {lang.afterSale.view.chat}
          </Box>
          <Box className={classes.btnMassAssign}>
            {lang.afterSale.view.onboarding}
          </Box>
        </Box>
        <Box className={classes.massActions}>
          {permissions?.addOrder && (
            <Box
              className={classes.btnMassEmail}
              onClick={() => router.push("/order-list/createOrder")}
            >
              {lang.afterSale.view.addOrder}
            </Box>
          )}
        </Box>
      </Box>

      {/* Customer Table */}
      <section className={classes.sectionBlock}>
        <Box className={classes.tableWrapper}>
          <BaseMUITable
            columns={columns}
            data={data}
            limit={limit}
            onRefresh={handleRefresh}
            handleChangeLimit={handleChangeLimit}
            handleChangeCurrentPage={handleChangeCurrentPage}
            loading={loading}
            pagination={pagination}
            isViewAnotherLink={true}
            linkView={"order-list/detail"}
            isCheckAll={true}
            isAdd={true}
          />
        </Box>
      </section>
    </Box>
  );
};

export default AfterSaleCustomerScreen;
