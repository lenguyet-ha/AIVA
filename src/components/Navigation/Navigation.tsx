import React, { useEffect, useRef, useState } from "react";
import { useStyles } from "./Navigation.styles";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useRouter } from "next/router";
import getConfig from "next/config";
import useTranslation from "next-translate/useTranslation";
import { dispatch, RootState } from "@/src/store";
import { setNavigationState } from "@/src/store/reducers/navigation";
import { Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import { setTaskAddState } from "@/src/store/reducers/taskAdd";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { colorVal } from "@/src/constants/colors";
import { useAuth } from "@/src/contexts/AuthContext";
const { publicRuntimeConfig } = getConfig();

interface Props {}

const Navigation: React.FC<Props> = React.memo(({}) => {
  const { t } = useTranslation();
  const { canAccess } = useAuth();

  const classes = useStyles();
  const matches = useMediaQuery("(max-width: 820px)");
  const router = useRouter();
  const [openMenus, setOpenMenus] = useState({});

  const [menu, setMenu] = useState(menu_config);
  const [openMenu, setOpenMenu] = useState(true);
  const [projectInfo, setProjectInfo] = useState<any>({});
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [openWeddingKnowledge, setOpenWeddingKnowledge] = useState(false);

  const navigation = useSelector((state: RootState) => state.navigation?.info);
  const numberUpdate = useSelector(
    (state: RootState) => state.onboarding.numberUpdate,
  );

  const toggleMenu = id => {
    setOpenMenus(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    // Mở menu cha khi load trang nếu có children active
    const newOpenMenus = {};
    menu.forEach(item => {
      if (item.children && item.children.some(child => child.active)) {
        newOpenMenus[item.id] = true;
      }
    });

    setOpenMenus(newOpenMenus);
  }, [menu]); // Chạy khi menu thay đổi

  useEffect(() => {
    const asPath = router?.asPath;
    if (asPath == "/wedding-knowledge") setOpenWeddingKnowledge(true);
    else setOpenWeddingKnowledge(false);
    setMenu(prevMenu => {
      let newOpenMenus = {}; // Đối tượng lưu trạng thái mở của menu cha

      const updatedMenu = prevMenu.map(item => {
        if (item.page === asPath) {
          dispatch(setNavigationState({ nameMenu: item.name }));
          return { ...item, active: true };
        }

        if (item.children && item.children.length > 0) {
          const updatedChildren = item.children.map(child => ({
            ...child,
            active: child.page === asPath,
          }));

          const isAnyChildActive = updatedChildren.some(child => child.active);

          if (isAnyChildActive) {
            newOpenMenus[item.id] = true; // Mở menu cha nếu có con active
          }

          return {
            ...item,
            active: isAnyChildActive,
            children: updatedChildren,
          };
        }

        return { ...item, active: false };
      });

      setOpenMenus(newOpenMenus); // Cập nhật trạng thái mở menu cha
      return updatedMenu;
    });
  }, [router?.asPath]);

  useEffect(() => {
    if (matches) setOpenMenu(true);
  }, [matches]);

  // Lấy projectInfo từ localStorage
  useEffect(() => {
    const storedProjectInfo = localStorage.getItem("projectInfo");
    if (storedProjectInfo) {
      try {
        const parsedInfo = JSON.parse(storedProjectInfo);
        setProjectInfo(parsedInfo);

        // Bắt đầu tính thời gian đến weddingDate
        if (parsedInfo?.weddingDate) {
          const weddingDate = new Date(parsedInfo.weddingDate);
          const interval = setInterval(() => {
            const now = new Date();
            const timeDiff = weddingDate.getTime() - now.getTime();

            if (timeDiff > 0) {
              const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
              const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
              const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
              const seconds = Math.floor((timeDiff / 1000) % 60);

              setTimeRemaining({ days, hours, minutes, seconds });
            } else {
              clearInterval(interval);
              setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
          }, 1000);

          return () => clearInterval(interval);
        }
      } catch (error) {
        console.error("Error parsing projectInfo from localStorage", error);
      }
    }
  }, [numberUpdate]);

  // const handleChangeMenu = (id: number) => {
  //   dispatch(setTaskAddState(""));
  //   const selectedMenuItem = menu_config.find(item => item.id === id);
  //   if (selectedMenuItem && router.asPath !== selectedMenuItem.page) {
  //     if (selectedMenuItem.page == "/wedding-knowledge")
  //       setOpenWeddingKnowledge(true); // Nếu là kiến thức cưới thì sẽ đổi navigation sang dạng thứ 2
  //     router.push(selectedMenuItem.page);
  //     dispatch(setNavigationState({ nameMenu: selectedMenuItem.name }));
  //   }
  // };

  const handleChangeMenu = (id: number) => {
    dispatch(setTaskAddState(""));

    // Tìm menu cha hoặc con theo ID
    let selectedMenuItem = menu_config.find(item => item.id === id);
    let parentMenuItem = menu_config.find(parent =>
      parent.children?.some(child => child.id === id),
    );

    if (parentMenuItem && !selectedMenuItem) {
      const childItem = parentMenuItem.children.find(child => child.id === id);
      if (childItem) {
        selectedMenuItem = {
          ...childItem, // Giữ lại thông tin của child
          icon: parentMenuItem.icon, // Kế thừa icon từ cha
          children: [], // Vì đây là menu con nên không có children
        };
      }
    }

    if (selectedMenuItem) {
      if (selectedMenuItem.page === "/wedding-knowledge") {
        setOpenWeddingKnowledge(true); // Nếu là kiến thức cưới thì đổi navigation
      }

      if (parentMenuItem) {
        // Nếu là menu con, cần đóng menu cha nếu cần
        setOpenMenus(prev => ({ ...prev, [parentMenuItem.id]: true }));
      }

      // Điều hướng nếu có đường dẫn
      if (selectedMenuItem.page) {
        router.push(selectedMenuItem.page);
        dispatch(setNavigationState({ nameMenu: selectedMenuItem.name }));
      }
    }
  };

  const handleChangeOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  return !openWeddingKnowledge ? (
    (navigation.openMobileIcon && matches) || !matches ? (
      <Box
        className={classes.nav_container}
        sx={{
          padding: "8px",
          position: matches ? "absolute !important" : "unset",
          width: matches ? "-webkit-fill-available !important" : "unset",
          zIndex: matches ? "4 !important" : "unset",
        }}
      >
        <Box
          className={openMenu ? classes.nav_content : classes.nav_content_close}
          sx={{ width: matches ? "100% !important" : "unset" }}
        >
          {openMenu ? (
            <Box className={classes.nav_content_body}>
              {/* {!matches && (
                <Box
                  className={classes.nav_open}
                  onClick={handleChangeOpenMenu}
                >
                  <img
                    src="/images/svg/icons/navigation/arrow_left.svg"
                    alt="arrow"
                  />
                </Box>
              )} */}
              <Box className={classes.txtHeaderMenu}>AIVA SUPPORT</Box>
              <Box className={classes.nav_menu}>
                {menu
                  .filter(val => canAccess(val.page))
                  .map((item, index) => (
                    <Box key={item.id}>
                      {/* Menu cha */}
                      <Box
                        className={classes.nav_menu_item}
                        sx={{
                          backgroundColor:
                            item.children.length === 0 && item.active
                              ? "#E3ECF8"
                              : "unset",
                        }}
                        onClick={() => {
                          if (item?.children?.length > 0) {
                            toggleMenu(item.id);
                          } else {
                            handleChangeMenu(item.id);
                          }
                        }}
                      >
                        {/* {item.active && (
                        <Box className={classes.nav_menu_active} />
                      )} */}
                        <Box className={classes.nav_menu_item_left} key={index}>
                          <img
                            src={item.icon}
                            style={{
                              filter: item.active
                                ? "invert(32%) sepia(62%) saturate(459%) hue-rotate(184deg) brightness(96%) contrast(94%)"
                                : "none",
                              width: "24px",
                              height: "24px",
                            }}
                            alt={item.name}
                          />
                          <Typography
                            className={classes.nav_menu_name}
                            sx={{
                              color:
                                item.children.length === 0 && item.active
                                  ? "#2E68B1"
                                  : colorVal.dark,
                            }}
                          >
                            {item.name}
                          </Typography>
                        </Box>
                        {item.children.length > 0 && (
                          <Box className={classes.nav_arrow_icon}>
                            {openMenus[item.id] ? (
                              <ExpandLessIcon />
                            ) : (
                              <ExpandMoreIcon />
                            )}
                          </Box>
                        )}
                      </Box>

                      {/* Menu con */}
                      {item?.children?.length > 0 && openMenus[item.id] && (
                        <Box className={classes.sub_menu}>
                          {item?.children
                            ?.filter(childVal => canAccess(childVal.page))
                            .map(child => (
                              <Box
                                key={child.id}
                                className={classes.nav_sub_menu_item}
                                sx={{
                                  backgroundColor: child.active
                                    ? "#E3ECF8"
                                    : "unset",
                                }}
                                onClick={() => handleChangeMenu(child.id)}
                              >
                                <Typography className={classes.nav_menu_bullet}>
                                  •
                                </Typography>

                                <Typography
                                  className={classes.nav_menu_name}
                                  sx={{
                                    color: child.active
                                      ? "#2E68B1"
                                      : colorVal.dark,
                                  }}
                                >
                                  {child.name}
                                </Typography>
                              </Box>
                            ))}
                        </Box>
                      )}
                    </Box>
                  ))}
              </Box>
            </Box>
          ) : (
            <Box className={classes.nav_content_body}>
              <Box className={classes.nav_open} onClick={handleChangeOpenMenu}>
                <img
                  src="/images/svg/icons/navigation/arrow_right.svg"
                  alt="arrow"
                />
              </Box>
              <Box className={classes.nav_menu}>
                {menu.map((item, index) => {
                  return (
                    <Box key={item.id}>
                      <Tooltip title={item.name} placement="right" arrow>
                        <Box
                          className={classes.nav_menu_item}
                          sx={{
                            backgroundColor: item.active ? "#E3ECF8" : "unset",
                          }}
                          onClick={() => handleChangeMenu(item.id)}
                        >
                          {item?.active && (
                            <Box className={classes.nav_menu_active} />
                          )}
                          <Box
                            className={classes.nav_menu_item_left}
                            key={index}
                          >
                            <img
                              src={item.icon}
                              style={{
                                filter: item?.active
                                  ? "invert(32%) sepia(62%) saturate(459%) hue-rotate(184deg) brightness(96%) contrast(94%)"
                                  : "none",
                              }}
                              alt={item.name}
                            />
                          </Box>
                        </Box>
                      </Tooltip>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    ) : (
      <></>
    )
  ) : (
    <Box className={classes.nav_container} sx={{ padding: "8px" }}>
      <Box className={classes.nav_content}>
        <Box className={classes.nav_menu} sx={{ gap: "16px", padding: "8px" }}>
          <Box
            className={classes.back_nav}
            onClick={() => {
              setOpenWeddingKnowledge(false);
              router.back();
            }}
          >
            <img src="/images/svg/icons/back_right.svg" alt="back_nav" />
            <Typography className={classes.back_nav_name}>
              {"Về trang quản lý"}
            </Typography>
          </Box>
          <Typography
            className={classes.knowledge_title}
            sx={{ paddingTop: "4px" }}
          >
            {"Kiến thức cưới"}
          </Typography>
          <TextField
            name=""
            value={""}
            onChange={() => {}}
            onBlur={() => {}}
            fullWidth
            variant="outlined"
            placeholder="Tìm kiếm"
            className={classes.input}
            InputProps={{
              startAdornment: (
                <img src="/images/svg/icons/search.svg" alt="search" />
              ),
            }}
          />
        </Box>
      </Box>
    </Box>
  );
});

export { Navigation };

const menu_config = [
  {
    id: 1,
    name: "Tổng quan",
    page: "/dash-board-total",
    icon: "/images/svg/icons/navigation/customer_overview.svg",
    active: false,
    children: [
      {
        id: 11,
        name: "Khảo sát người dùng",
        page: "/survey-customer",
        active: false,
      },
      {
        id: 12,
        name: "Quản trị người dùng",
        page: "/customer-management",
        active: false,
      },
    ],
  },
  {
    id: 5,
    name: "Sales",
    page: "/sales",
    icon: "/images/svg/icons/navigation/sales.png",
    active: false,
    children: [
      {
        id: 43,
        name: "Tổng quan",
        page: "/sales-dashboard",
        active: false,
      },
      {
        id: 44,
        name: "Need Attention",
        page: "/sales-needattention",
        active: false,
      },
      {
        id: 45,
        name: "Sales PipeLine",
        page: "/sale-pipeline",
        active: false,
      },
      {
        id: 46,
        name: "Danh sách đơn hàng",
        page: "/order-list",
        active: false,
      },
      // { id: 42, name: "Công việc nhóm", page: "/team-tasks", active: false },
    ],
  },
  {
    id: 6,
    name: "Chăm sóc khách hàng",
    page: "/customer-support",
    icon: "/images/svg/icons/navigation/cskh.png",
    active: false,
    children: [
      {
        id: 47,
        name: "Tổng quan",
        page: "/cskh-dashboard",
        active: false,
      },
      {
        id: 48,
        name: "Danh sách Ticket",
        page: "/ticket-list",
        active: false,
      },
      {
        id: 49,
        name: "Quản Lý Khách Hàng Sau Bán",
        page: "/after-sale",
        active: false,
      },
      // { id: 42, name: "Công việc nhóm", page: "/team-tasks", active: false },
    ],
  },
  {
    id: 4,
    name: "Danh sách video",
    page: "/task-list",
    icon: "/images/svg/icons/navigation/task_list.svg",
    active: false,
    children: [
      {
        id: 41,
        name: "Danh sách Video Tutorial",
        page: "/video-tutorial",
        active: false,
      },
      {
        id: 42,
        name: "Thể loại Video Tutorial",
        page: "/video-tutorial-type",
        active: false,
      },
      // { id: 42, name: "Công việc nhóm", page: "/team-tasks", active: false },
    ],
  },
  {
    id: 10,
    name: "Danh sách hihi",
    page: "/ha-list",
    icon: "/images/svg/icons/navigation/wedding_knowledge.svg",
    active: false,
    children: [
      {
        id: 91,
        name: "Danh sách Bling",
        page: "/ha-list",
        active: false,
      }
    
    ],
  },
  // {
  //   id: 4,
  //   name: "Danh sách công việc",
  //   page: "/task-list",
  //   icon: "/images/svg/icons/navigation/task_list.svg",
  //   active: false,
  // },
  // {
  //   id: 5,
  //   name: "Quản lý ngân sách",
  //   page: "/budget-management",
  //   icon: "/images/svg/icons/navigation/budget_management.svg",
  //   active: false,
  // },
  // {
  //   id: 6,
  //   name: "Quản lý kịch bản",
  //   page: "/script-management",
  //   icon: "/images/svg/icons/navigation/script_management.svg",
  //   active: false,
  // },
  // {
  //   id: 7,
  //   name: "Quản lý khách mời",
  //   page: "/guest-management",
  //   icon: "/images/svg/icons/navigation/guest_management.svg",
  //   active: false,
  // },
  // {
  //   id: 8,
  //   name: "Quản lý lịch trình",
  //   page: "/schedule-management",
  //   icon: "/images/svg/icons/navigation/schedule_management.svg",
  //   active: false,
  // },
  // {
  //   id: 9,
  //   name: "Quản lý moodboard",
  //   page: "/moodboard-management",
  //   icon: "/images/svg/icons/navigation/moodboard_management.svg",
  //   active: false,
  // },
  // {
  //   id: 10,
  //   name: "Kiến thức cưới",
  //   page: "/wedding-knowledge",
  //   icon: "/images/svg/icons/navigation/wedding_knowledge.svg",
  //   active: false,
  // },
];
