import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import { useStyles } from "./OrderDetailScreen.styles";
import { Table } from "@mui/material";
import { TableHead } from "@mui/material";
import { formatNumberWithCommasWithoutTrunc } from "@/src/helpers/format";
import BaseStatusLabel from "@/src/components/BaseStatusLabel/BaseStatusLabel";
import BaseTextArea from "@/src/components/BaseTextArea/BaseTextArea";
import { useAuth } from "@/src/contexts/AuthContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
interface Product {
  name: string;
  quantity: string;
  price: number;
  discount: number;
  total: number;
}
interface ProductBye {
  id: string;
  package: string;
  createDate: string;
  status:
    | "WaitingAccepted"
    | "WaitingInactive"
    | "Active"
    | "Inactive"
    | "HIGH"
    | "MEDIUM"
    | "LOW"
    | "FREE"
    | "PRO"
    | "ENTERPRISE"
    | "New"
    | "Expired"
    | "NearExpiration"
    | "Paid"
    | "Approved";
}
const OrderDetailScreen: React.FC = () => {
  const classes = useStyles();
  const { permissions } = useAuth();
  const router = useRouter();
  const listTag = ["Quan tâm GPT", "Muốn dùng thử", "B2B"];
  const listAction = [
    "Gọi điện",
    "Gửi Email",
    "Đặt lịch follow-up",
    "Chuyển trạng thái",
  ];
  const [isViewNote, setIsViewNote] = useState(false);
  const [productData, setProductDate] = useState<Product[]>([
    {
      name: "GPT Basic",
      quantity: "1",
      price: 1000000,
      discount: 100000,
      total: 900000,
    },
  ]);

  const [productByeData, setProductByeDate] = useState<ProductBye[]>([
    {
      id: "DH0009",
      package: "GPT Add-on",
      status: "Paid",
      createDate: "2025-02-15",
    },
    {
      id: "DH0005",
      package: "GPT Basic",
      status: "Approved",
      createDate: "2025-01-10",
    },
  ]);

  const handleBack = () => {
    const pathSegments = router.asPath.split("/");
    if (pathSegments.length > 2) {
      pathSegments.pop();
      router.push("/" + pathSegments[1]);
    } else {
      router.back();
    }
  };

  const calculateTotalDiscount = (value: Product[]): string => {
    return formatNumberWithCommasWithoutTrunc(
      value.reduce((acc, product) => acc + product.discount, 0),
    );
  };

  const calculateTotal = (value: Product[]): string => {
    return formatNumberWithCommasWithoutTrunc(
      value.reduce((acc, product) => acc + product.total, 0),
    );
  };

  return (
    <Box className={classes.container}>
      {/* Header / Toolbar */}
      <Box className={classes.headerBar}>
        <IconButton onClick={handleBack}>
          <ArrowBackIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h5"
          flex={1}
          textAlign="center"
          color="#007bff"
        >
          Chi Tiết Đơn Hàng
        </Typography>
      </Box>

      {/* Order Overview */}
      <Box className={classes.section}>
        <Box display="flex" alignItems="center" mb={2}>
          <Typography fontWeight="bold" color="#555" width="150px">
            Mã đơn hàng:
          </Typography>
          <Typography color="#333">DH0001</Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={2}>
          <Typography fontWeight="bold" color="#555" width="150px">
            Trạng thái:
          </Typography>
          <Typography color="#333">Negotiation</Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={2}>
          <Typography fontWeight="bold" color="#555" width="150px">
            Loại đơn:
          </Typography>
          <Typography color="#333">Đăng ký GPT</Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={2}>
          <Typography fontWeight="bold" color="#555" width="150px">
            Ngày tạo:
          </Typography>
          <Typography color="#333">2025-03-10</Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={2}>
          <Typography fontWeight="bold" color="#555" width="150px">
            Cập nhật gần nhất:
          </Typography>
          <Typography color="#333">2025-03-11</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography fontWeight="bold" color="#555" width="150px">
            Sale phụ trách:
          </Typography>
          <Typography color="#333">Sale 1</Typography>
        </Box>
      </Box>

      {/* Two-column layout */}
      <Box display="flex" gap={2} flexWrap="wrap">
        {/* Left Column */}
        <Box flex={1} minWidth="360px">
          {/* Customer Info */}
          <Box className={classes.section}>
            <Typography
              variant="h6"
              mb={2}
              borderBottom={2}
              pb={1}
              fontWeight="bold"
              color="#555"
            >
              Thông Tin Khách Hàng
            </Typography>
            <Box display="flex" alignItems="center" mb={2}>
              <Typography fontWeight="bold" color="#555" width="150px">
                Họ tên:
              </Typography>
              <Typography color="#333">Trần Văn A</Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <Typography fontWeight="bold" color="#555" width="150px">
                Email:
              </Typography>
              <Typography color="#333">tranvana@example.com</Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <Typography fontWeight="bold" color="#555" width="150px">
                Số điện thoại:
              </Typography>
              <Typography color="#333">0909009001</Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <Typography fontWeight="bold" color="#555" width="150px">
                Nguồn:
              </Typography>
              <Typography color="#333">Affiliate</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography fontWeight="bold" color="#555" width="150px">
                Mã giảm giá:
              </Typography>
              <Typography color="#333">COUPON10</Typography>
            </Box>
          </Box>
          <Box className={classes.section}>
            <Typography
              variant="h6"
              mb={2}
              borderBottom={2}
              pb={1}
              fontWeight="bold"
              color="#555"
            >
              Tag Khách Hàng (Survey)
            </Typography>
            <Box className={classes.viewTag}>
              {listTag?.map(item => (
                <Box className={classes.btnTag}>{item}</Box>
              ))}
            </Box>
          </Box>
          {/* Product Info */}
          <Box className={classes.section}>
            <Typography
              variant="h6"
              mb={2}
              borderBottom={2}
              pb={1}
              fontWeight="bold"
              color="#555"
            >
              Sản Phẩm / Gói Dịch Vụ (Đơn Hiện Tại)
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Tên gói</TableCell>
                  <TableCell align="left">Số lượng</TableCell>
                  <TableCell align="left">Đơn giá (VND)</TableCell>
                  <TableCell align="left">Giảm giá (VND)</TableCell>
                  <TableCell align="left">Thành tiền (VND)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productData?.map(item => (
                  <TableRow>
                    <TableCell align="left">{item?.name}</TableCell>
                    <TableCell align="left">{item?.quantity}</TableCell>
                    <TableCell align="left">
                      {formatNumberWithCommasWithoutTrunc(item?.price)}
                    </TableCell>
                    <TableCell align="left">
                      {formatNumberWithCommasWithoutTrunc(item?.discount)}
                    </TableCell>
                    <TableCell align="left">
                      {formatNumberWithCommasWithoutTrunc(item?.total)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box sx={{ marginTop: "10px" }}>
              <Typography>
                <strong>Tổng giảm giá:</strong>{" "}
                {calculateTotalDiscount(productData)} VND
              </Typography>
              <Typography>
                <strong>Tổng đơn hàng:</strong>{" "}
                {calculateTotalDiscount(productData)} VND
              </Typography>
            </Box>
          </Box>
          {/* Product Have Buy */}
          <Box className={classes.section}>
            <Typography
              variant="h6"
              mb={2}
              borderBottom={2}
              pb={1}
              fontWeight="bold"
              color="#555"
            >
              Các Sản Phẩm Đã Mua Trước Đây
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Mã đơn</TableCell>
                  <TableCell align="left">Gói/Sản phẩm</TableCell>
                  <TableCell align="left">Ngày mua</TableCell>
                  <TableCell align="left">Trạng thái</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productByeData?.map(item => (
                  <TableRow>
                    <TableCell align="left">{item?.id}</TableCell>
                    <TableCell align="left">{item?.package}</TableCell>
                    <TableCell align="left">{item?.createDate}</TableCell>
                    <TableCell align="left">
                      <BaseStatusLabel
                        statusKey={item?.status || ""}
                        text={item?.status}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>

        {/* Right Column */}
        <Box flex={1} minWidth="360px">
          {/* Payment Info */}
          <Box className={classes.section}>
            <Typography
              variant="h6"
              mb={2}
              borderBottom={2}
              pb={1}
              fontWeight="bold"
              color="#555"
            >
              Thanh Toán
            </Typography>
            <Box display="flex" alignItems="center" mb={2}>
              <Typography fontWeight="bold" color="#555" width="150px">
                Trạng thái thanh toán:
              </Typography>
              <Typography color="#333">Chưa thanh toán</Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <Typography fontWeight="bold" color="#555" width="150px">
                Hình thức thanh toán:
              </Typography>
              <Typography color="#333">Chuyển khoản</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography fontWeight="bold" color="#555" width="150px">
                Ngày thanh toán:
              </Typography>
              <Typography color="#333">-</Typography>
            </Box>
          </Box>
          <Box className={classes.section}>
            <Typography
              variant="h6"
              mb={2}
              borderBottom={2}
              pb={1}
              fontWeight="bold"
              color="#555"
            >
              Lịch Sử Tương Tác
            </Typography>
            <Box component="ul" className={classes.historyList}>
              <Box component="li" className={classes.historyItem}>
                <Box component="span" className={classes.historyTime}>
                  2025-03-11 09:00
                </Box>
                <Box component="span" className={classes.historyContent}>
                  Gọi điện: Khách bận, hẹn gọi lại chiều
                </Box>
              </Box>
              <Box component="li" className={classes.historyItem}>
                <Box component="span" className={classes.historyTime}>
                  2025-03-10 15:00
                </Box>
                <Box component="span" className={classes.historyContent}>
                  Gửi email báo giá GPT Basic
                </Box>
              </Box>
            </Box>
            <Box
              className={classes.btnAddNote}
              onClick={() => setIsViewNote(!isViewNote)}
            >
              Thêm ghi chú
            </Box>
            <Box
              className={classes.btnViewNote}
              sx={{
                display: isViewNote ? "block" : "none",
              }}
            >
              <BaseTextArea
                placeholder="Nhập ghi chú..."
                isDefault={true}
                // initialValue={row.original.detail}
                onBlur={e => {
                  // setInputValue(e + "");
                }} // Khi rời khỏi trường, reset focus
              />
              <Box
                className={classes.btnSaveNote}
                // onClick={() => setIsViewNote(!isViewNote)}
              >
                Lưu
              </Box>
            </Box>
          </Box>
          <Box className={classes.section}>
            <Typography
              variant="h6"
              mb={2}
              borderBottom={2}
              pb={1}
              fontWeight="bold"
              color="#555"
            >
              Hành Động
            </Typography>
            <Box className={classes.viewTag}>
              {listAction?.map(item => (
                <Box className={classes.btnAction}>{item}</Box>
              ))}
            </Box>
            <Box
              className={classes.btnApproveOrder}
              sx={{
                cursor: !permissions?.approveOrder ? "not-allowed" : "pointer",
                backgroundColor: !permissions?.approveOrder
                  ? "#6C757D"
                  : "#28A745",
              }}
            >
              Duyệt đơn hàng
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderDetailScreen;
