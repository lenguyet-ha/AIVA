import React, { useEffect, useRef, useState } from "react";
import { useStyles } from "./CustomerDetailScreen.styles";
import { useRouter } from "next/router";
import ChartLine from "@/src/components/ChartComponent/LineChart/LineChart";
import { lineData, lineOptions } from "./ConfigData";
import { Box, Button } from "@mui/material";
import { lang } from "@/src/constants/lang";
import { AxiosRequestConfig } from "axios";
import axios from "@/src/helpers/axios";
import { dispatch } from "@/src/store";
import { showErrorSnackBar } from "@/src/store/reducers/snackbar";
import {
  daysUntilExpiry,
  formatDate,
  formatNumberWithCommasWithoutTrunc,
} from "@/src/helpers/format";

const CustomerDetailScreen: React.FC = () => {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = React.useState<Record<string, any>>({});
  const titleRef = useRef<HTMLDivElement | null>(null);

  const getListCustomer = async (id: string | string[]) => {
    try {
      const payload: AxiosRequestConfig = {
        url: "system/users/info",
        method: "get",
        params: {
          userObjId: id,
        },
      };
      const response = await axios(payload);
      if (response.data.success) {
        console.log(response?.data?.data);

        setData(response?.data?.data);
        return response.data;
      } else {
        dispatch(showErrorSnackBar(response?.data?.message));
        router.push("/login");
        return response.data;
      }
    } catch (error) {
      dispatch(showErrorSnackBar(lang.errorDetected));
      router.push("/login");
      console.log("error: ", error);
    } finally {
      // setLoading(false);
    }
  };

  // Focus vào tiêu đề khi component mount
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useEffect(() => {
    if (id) {
      getListCustomer(id);
    }
  }, [id]);

  return (
    <Box className={classes.container} ref={titleRef}>
      <Box className={classes.pageTitle}>{lang.customerDetail.view.header}</Box>
      <Box className={classes.pageDesc}>
        {lang.customerDetail.view.subheader}
      </Box>

      <Box className={classes.customerDetailGrid}>
        <Box className={classes.customerInfo}>
          <Box component="h2"> {lang.customerDetail.view.customerInfo}</Box>
          <img
            src={data?.avatar || "/images/defaultAvatar.png"}
            alt="Avatar"
            className={classes.avatar}
          />
          <Box className={classes.viewInfo}>
            <span className={classes.label}>
              {lang.customerDetail.view.name}:
            </span>{" "}
            {data?.info?.lastName + " " + data?.info?.firstName}
          </Box>
          <Box className={classes.viewInfo}>
            <span className={classes.label}>
              {lang.customerDetail.view.email}:
            </span>{" "}
            {data?.email}
          </Box>
          <Box className={classes.viewInfo}>
            <span className={classes.label}>
              {lang.customerDetail.view.phoneNumber}:
            </span>{" "}
            {data?.mobile}
          </Box>
          {/* <Box className={classes.viewInfo}>
            <span className={classes.label}>
              {lang.customerDetail.view.job}:
            </span>{" "}
            📚 Giáo dục, ⚖️ Luật & Pháp lý, 🏗 Bất động sản, 🏥Sức khỏe
          </Box> */}
          <Box className={classes.viewInfo}>
            <span className={classes.label}>
              {lang.customerDetail.view.role}:
            </span>{" "}
            Manager
          </Box>
          <Box className={classes.viewInfo}>
            <span className={classes.label}>
              {lang.customerDetail.view.owner}:
            </span>{" "}
            Sale1
          </Box>
          <Box className={classes.btnAction}>
            {lang.customerDetail.view.call}
          </Box>
          <Box className={classes.btnAction}>
            {lang.customerDetail.view.sendEmail}
          </Box>
          <Box className={classes.btnAction}>
            {lang.customerDetail.view.appointment}
          </Box>
        </Box>

        <Box className={classes.customerInsights}>
          <Box component="h2">{lang.customerDetail.view.behavior}</Box>
          {data?.surveyResponseObjId?.answers?.map((item, index) => (
            <Box key={index} className={classes.viewInfoBehavior}>
              <span className={classes.labelBehavor}>{item?.name}</span> :
              <span>
                {item?.tagObjIds && item?.tagObjIds.length > 0
                  ? item.tagObjIds
                      .map(value =>
                        value.name === "Khác" && item?.job === "Tự do"
                          ? "Khác (Tự do)"
                          : value.name,
                      )
                      .join(", ")
                  : item?.valueConverted}
              </span>
            </Box>
          ))}
        </Box>
      </Box>

      <Box className={classes.usageData}>
        <Box component="h2">{lang.customerDetail.view.usageBehavior}</Box>
        <Box className={classes.viewInfo}>
          <Box className={classes.viewInfo}>
            <span className={classes.label}>
              🕒 {lang.customerDetail.view.lastLogin}:
            </span>{" "}
            📅 {formatDate(data?.lastActionDate)}
          </Box>
          <Box className={classes.viewInfo}>
            <span className={classes.label}>
              📊 {lang.customerDetail.view.operationFrequency}:
            </span>{" "}
            🔵 {data?.operationFrequency}/7 ngày
          </Box>
          <Box className={classes.viewInfo}>
            <span className={classes.label}>
              🚀 {lang.customerDetail.view.usageFrequency}:
            </span>{" "}
            🔄 {data?.usageFrequency}/7 ngày
          </Box>
          <Box className={classes.viewInfo}>
            <span className={classes.label}>
              🤖 {lang.customerDetail.view.engagementScore}:
            </span>{" "}
            🔄 {data?.engagementScore}/7 ngày
          </Box>
          <Box className={classes.viewInfo}>
            <span className={classes.label}>
              ⏳ {lang.customerDetail.view.operationFrequencyStatus}:
            </span>{" "}
            🔄 {data?.operationFrequencyStatus}
          </Box>
          {/* <Box className={classes.viewInfo}>
            <span className={classes.label}>
              📊 {lang.customerDetail.view.loginFrequency}:
            </span>{" "}
            🔵 5/7 ngày
          </Box> */}
          {/* <Box className={classes.viewInfo}>
            <span className={classes.label}>
              🚀 {lang.customerDetail.view.numberAgentUsers}:
            </span>{" "}
            🤖 {data?.topMostUsedAgent}
          </Box> */}
          {/* <Box className={classes.viewInfo}>
            <span className={classes.label}>
              ⏳ Thời gian sử dụng trung bình/ngày:
            </span>{" "}
            35 phút
          </Box> */}
          <Box className={classes.viewInfo}>
            <span className={classes.label}>
              🎯 {lang.customerDetail.view.topMostUsedAI}:
            </span>{" "}
            {data?.topMostUsedAgent}
          </Box>
        </Box>
        <Box style={{ flex: "0 0 40%", minWidth: "300px" }}>
          <ChartLine data={lineData} options={lineOptions} />
        </Box>
      </Box>

      <Box className={classes.financialInfo}>
        <Box component="h2">{lang.customerDetail.view.financialStatus}</Box>
        <Box className={classes.viewInfo}>
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            📦 {lang.customerDetail.view.currentPackage}:
          </span>{" "}
          🟢 {data?.planCode}
        </Box>
        <Box className={classes.viewInfo}>
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            📅 {lang.customerDetail.view.dayActive}:
          </span>{" "}
          {data?.startDate}
        </Box>
        <Box className={classes.viewInfo}>
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            ⏳ {lang.customerDetail.view.dateExpired}:
          </span>{" "}
          🚨 {data?.endDate} ({daysUntilExpiry(data?.endDate)} ngày nữa)
        </Box>
        <Box className={classes.viewInfo}>
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            🔄 {lang.customerDetail.view.numberUpdatePackage}:
          </span>{" "}
          📈 {data?.countUpgrade} lần
        </Box>
        <Box className={classes.viewInfo}>
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            💳 {lang.customerDetail.view.lastByCredit}:
          </span>{" "}
          {formatDate(data?.lastCreditPurchaseDate)}
        </Box>
        <Box className={classes.viewInfo}>
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            ⚡ {lang.customerDetail.view.creditRate}:
          </span>{" "}
          🔴 {data?.rateUseCredit}%{" "}
          <span style={{ color: "red" }}>
            {data?.rateUseCredit > 85 ? "(Sắp hết)" : ""}
          </span>
        </Box>
        <Box className={classes.viewInfo}>
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            💰 {lang.customerDetail.view.totalAmoutSpend}:
          </span>{" "}
          💵 {formatNumberWithCommasWithoutTrunc(data?.totalMoneySpent)} VND
        </Box>
      </Box>
      {data?.countDaysWithoutAccess > 0 && (
        <Box className={classes.customerCare}>
          <Box component="h2">{lang.customerDetail.view.careFollowPlan}</Box>
          <Box className={`${classes.alertBox} ${classes.alertWarning}`}>
            KH không đăng nhập {data?.countDaysWithoutAccess > 0} ngày - Cần
            follow-up ngay!
          </Box>
          <Box className={classes.viewInfo}>
            <span
              style={{
                fontWeight: "bold",
              }}
            >
              {lang.customerDetail.view.suggestAction}:
            </span>{" "}
            Hẹn demo trực tiếp
          </Box>
          <Box className={classes.btnAction}>
            {lang.customerDetail.view.appointment}
          </Box>
          <Box className={classes.btnAction}>
            {lang.customerDetail.view.call}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CustomerDetailScreen;
