import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useStyles } from "./OrderCreationScreen.styles";

const OrderCreationScreen = () => {
  const classes = useStyles();

  // State quản lý thông tin đơn hàng
  const [orderInfo, setOrderInfo] = useState({
    orderId: "DH0001",
    orderType: "mua_hang",
    orderDate: "2025-03-04",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    discountCode: "",
    productPackage: "basic",
  });

  // State quản lý danh sách sản phẩm
  const [products, setProducts] = useState([
    { name: "", quantity: 1, price: 0, discount: 0, total: 0 },
  ]);

  // Xử lý thay đổi giá trị trong orderInfo
  const handleOrderChange = (field: string, value: string | number) => {
    setOrderInfo(prev => ({ ...prev, [field]: value }));
  };

  // Xử lý thay đổi giá trị trong sản phẩm
  const handleProductChange = (
    index: number,
    field: string,
    value: number | string,
  ) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;

    // Tính toán lại thành tiền nếu field thay đổi là quantity, price, discount
    if (["quantity", "price", "discount"].includes(field)) {
      const quantity = Number(updatedProducts[index].quantity);
      const price = Number(updatedProducts[index].price);
      const discount = Number(updatedProducts[index].discount);
      updatedProducts[index].total = quantity * price * (1 - discount / 100);
    }

    setProducts(updatedProducts);
  };

  const handleCreate = () => {
    console.log(products);
    console.log(orderInfo);
  };

  // Hàm thêm sản phẩm mới
  const handleAddProduct = () => {
    setProducts([
      ...products,
      { name: "", quantity: 1, price: 0, discount: 0, total: 0 },
    ]);
  };

  // Hàm xóa sản phẩm
  const handleRemoveProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  // Tính tổng giảm giá và tổng tiền
  const totalDiscount = products.reduce(
    (sum, p) => sum + (p.quantity * p.price * p.discount) / 100,
    0,
  );
  const totalAmount = products.reduce(
    (sum, p) => sum + (p.price * p.quantity * (100 - p.discount)) / 100,
    0,
  );

  return (
    <Box className={classes.container}>
      <Typography variant="h4" className={classes.title}>
        Tạo Đơn Hàng - Sale
      </Typography>

      <Box className={classes.twoColumnContainer}>
        {/* Cột Trái */}
        <Box className={classes.column}>
          <Box className={classes.formSection}>
            <Typography className={classes.formTitle}>
              Thông tin đơn hàng
            </Typography>

            <Box className={classes.formGroup}>
              <Typography className={classes.formLabel}>
                Mã đơn hàng:
              </Typography>
              <TextField
                value={orderInfo.orderId}
                disabled
                className={classes.inputField}
              />
            </Box>

            <Box className={classes.formGroup}>
              <Typography className={classes.formLabel}>
                Loại đơn hàng:
              </Typography>
              <Select
                value={orderInfo.orderType}
                onChange={e => handleOrderChange("orderType", e.target.value)}
                className={classes.inputField}
              >
                <MenuItem value="mua_hang">Mua hàng</MenuItem>
                <MenuItem value="dang_ky_dich_vu">Đăng ký dịch vụ</MenuItem>
              </Select>
            </Box>

            <Box className={classes.formGroup}>
              <Typography className={classes.formLabel}>
                Ngày đặt hàng:
              </Typography>
              <TextField
                type="date"
                value={orderInfo.orderDate}
                onChange={e => handleOrderChange("orderDate", e.target.value)}
                className={classes.inputField}
              />
            </Box>
          </Box>

          <Box className={classes.formSection}>
            <Typography className={classes.formTitle}>
              Thông tin khách hàng
            </Typography>

            <Box className={classes.formGroup}>
              <Typography className={classes.formLabel}>Họ tên:</Typography>
              <TextField
                value={orderInfo.customerName}
                onChange={e =>
                  handleOrderChange("customerName", e.target.value)
                }
                className={classes.inputField}
                placeholder="Nhập họ tên khách hàng"
              />
            </Box>

            <Box className={classes.formGroup}>
              <Typography className={classes.formLabel}>Email:</Typography>
              <TextField
                type="email"
                value={orderInfo.customerEmail}
                onChange={e =>
                  handleOrderChange("customerEmail", e.target.value)
                }
                className={classes.inputField}
                placeholder="Nhập email"
              />
            </Box>

            <Box className={classes.formGroup}>
              <Typography className={classes.formLabel}>
                Số điện thoại:
              </Typography>
              <TextField
                type="tel"
                value={orderInfo.customerPhone}
                onChange={e =>
                  handleOrderChange("customerPhone", e.target.value)
                }
                className={classes.inputField}
                placeholder="Nhập số điện thoại"
              />
            </Box>
          </Box>

          {/* Mã giảm giá & Gói sản phẩm */}
          <Box className={classes.formSection}>
            <Typography className={classes.formTitle}>
              Khuyến mãi & Gói sản phẩm
            </Typography>

            <Box className={classes.formGroup}>
              <Typography className={classes.formLabel}>
                Mã giảm giá:
              </Typography>
              <TextField
                value={orderInfo.discountCode}
                onChange={e =>
                  handleOrderChange("discountCode", e.target.value)
                }
                className={classes.inputField}
                placeholder="Nhập mã giảm giá nếu có"
              />
            </Box>

            <Box className={classes.formGroup}>
              <Typography className={classes.formLabel}>
                Gói sản phẩm:
              </Typography>
              <Select
                value={orderInfo.productPackage}
                onChange={e =>
                  handleOrderChange("productPackage", e.target.value)
                }
                className={classes.inputField}
              >
                <MenuItem value="basic">Basic</MenuItem>
                <MenuItem value="premium">Premium</MenuItem>
                <MenuItem value="enterprise">Enterprise</MenuItem>
              </Select>
            </Box>
          </Box>
        </Box>

        {/* Cột Phải */}
        <Box className={classes.column}>
          <Box className={classes.formSection}>
            <Typography className={classes.formTitle}>
              Danh sách sản phẩm/Dịch vụ
            </Typography>

            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  {[
                    "Tên sản phẩm",
                    "Số lượng",
                    "Đơn giá (VND)",
                    "Giảm giá (%)",
                    "Thành tiền (VND)",
                  ].map((header, index) => (
                    <TableCell
                      key={index}
                      style={{ fontWeight: "bold", minWidth: "100px" }}
                    >
                      {header}
                    </TableCell>
                  ))}
                  <TableCell style={{ fontWeight: "bold", minWidth: "120px" }}>
                    Hành động
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <TextField
                        placeholder="Tên sản phẩm"
                        value={product.name}
                        onChange={e =>
                          handleProductChange(index, "name", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={product.quantity}
                        onChange={e =>
                          handleProductChange(
                            index,
                            "quantity",
                            Number(e.target.value),
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={product.price}
                        onChange={e =>
                          handleProductChange(
                            index,
                            "price",
                            Number(e.target.value),
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={product.discount}
                        onChange={e =>
                          handleProductChange(
                            index,
                            "discount",
                            Number(e.target.value),
                          )
                        }
                        sx={{
                          width: "100%",
                        }}
                        inputProps={{ min: 0, max: 100 }}
                      />
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {totalAmount}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleRemoveProduct(index)}
                        sx={{
                          transition: "0.2s",
                          color: "gray", // Màu mặc định khi disabled
                          "&:hover": {
                            color: products.length > 1 ? "red" : "gray", // Hover màu đỏ nếu có thể xoá
                            backgroundColor:
                              products.length > 1
                                ? "rgba(255, 0, 0, 0.1)"
                                : "transparent",
                          },
                          "&:active": {
                            transform: "scale(0.9)", // Hiệu ứng click
                          },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
          <Button className={classes.buttonAdd} onClick={handleAddProduct}>
            Thêm sản phẩm
          </Button>
          <Box className={classes.summary}>
            <Typography>
              <strong>Tổng giảm giá:</strong> 0 VND
            </Typography>
            <Typography>
              <strong>Tổng tiền:</strong> 0 VND
            </Typography>
            <Typography>
              <strong>Trạng thái:</strong> Chờ duyệt
            </Typography>
          </Box>
          <Button className={classes.button} onClick={() => handleCreate()}>
            Tạo Đơn Hàng
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderCreationScreen;
