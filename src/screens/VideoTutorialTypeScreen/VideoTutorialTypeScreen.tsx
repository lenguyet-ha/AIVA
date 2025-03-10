import React, { useEffect, useState } from "react";
import BaseMUITable from "@/src/components/BaseMUITable/BaseMUITable";
import { COLUMN_TYPE } from "@/src/constants/tableconfigs";
import axios from "@/src/helpers/axios";
import getConfig from "next/config";
import {
  showErrorSnackBar,
  showSuccessSnackBar,
} from "@/src/store/reducers/snackbar";
import { dispatch } from "@/src/store";
import { useRouter } from "next/router";
import { urlConfig } from "./ConfigTable";
import { lang } from "@/src/constants/lang";
import { AxiosRequestConfig } from "axios";
// Định nghĩa kiểu dữ liệu cho cột
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
// Định nghĩa cột của bảng
const columns: TableColumn[] = [
  // { key: "id", label: "ID", columnType: COLUMN_TYPE.NUMBER },
  {
    key: "name",
    label: "Tên",
    columnType: COLUMN_TYPE.TEXT,
    required: true,
  },
  { key: "description", label: "Mô tả", columnType: COLUMN_TYPE.TEXT },

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
const { publicRuntimeConfig } = getConfig();
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

const VideoTutorialTypeScreen = React.memo(() => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTxt, setSearchTxt] = useState("");
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

  //Add
  const postVideoTutorial = async (rowData: any) => {
    try {
      const payload: AxiosRequestConfig = {
        url: "system/video-tutorial-categories/create",
        method: "post",
        data: {
          ...rowData,
        },
      };

      const response = await axios(payload);
      if (response.data.success) {
        dispatch(showSuccessSnackBar(response?.data?.message));
        getListVideoTutorial();
        return response.data;
      } else {
        dispatch(showErrorSnackBar(response?.data?.message));
        return response.data;
      }
    } catch (error) {
      console.log("error: ", error);
    }
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

  //Edit
  const updateVideoTutorial = async (rowData: any) => {
    try {
      const payload: AxiosRequestConfig = {
        url: "system/video-tutorial-categories/update",
        method: "put",
        data: {
          ...rowData,
          videoTutorialObjId: rowData.id,
        },
      };
      const response = await axios(payload);
      if (response.data.success) {
        dispatch(showSuccessSnackBar(response?.data?.message));
        getListVideoTutorial();
        return response.data;
      } else {
        dispatch(showErrorSnackBar(response?.data?.message));
        return response.data;
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  //Delete
  const deleteVideoTutorial = async (rowData: any) => {
    try {
      const payload: AxiosRequestConfig = {
        url: "system/video-tutorial-categories/delete",
        method: "delete",
        data: {
          videoTutorialCategoryObjId: rowData.id,
        },
      };
      const response = await axios(payload);
      if (response.data.success) {
        dispatch(showSuccessSnackBar(response?.data?.message));
        getListVideoTutorial();
        return response.data;
      } else {
        dispatch(showErrorSnackBar(response?.data?.message));
        return response.data;
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  // Hàm xử lý khi bấm vào nút Hành động
  const handleAction = (
    actionType: string,
    rowData: any,
    currentId?: string,
  ) => {
    switch (actionType) {
      case COLUMN_TYPE.ADD:
        postVideoTutorial(rowData);
        break;
      case COLUMN_TYPE.EDIT:
        updateVideoTutorial(rowData);
        break;
      case COLUMN_TYPE.DELETE:
        deleteVideoTutorial(rowData);
        break;
      default:
        break;
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    getListVideoTutorial();
  };

  const handleSearch = (value: string) => {
    setLoading(true);
    setSearchTxt(value);
  };

  const getListVideoTutorial = async () => {
    try {
      const payload: AxiosRequestConfig = {
        url: "system/video-tutorial-categories/list",
        method: "get",
        params: {
          limit: limit,
          page: currentPage,
          search: searchTxt,
        },
      };
      const response = await axios(payload);
      if (response.data.success) {
        setData(response?.data?.data?.items);
        setPagination(response?.data?.data?.paginator);
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
      setLoading(false);
    }
  };

  useEffect(() => {
    getListVideoTutorial();
  }, [limit, currentPage, searchTxt]);

  return (
    <div style={{ padding: "20px", margin: "0 auto" }}>
      <h2>{lang.videoTutorialType.list.tittle}</h2>
      <BaseMUITable
        columns={columns}
        data={data}
        onAction={handleAction}
        pagination={pagination}
        onRefresh={handleRefresh}
        loading={loading}
        limit={limit}
        handleChangeLimit={handleChangeLimit}
        handleChangeCurrentPage={handleChangeCurrentPage}
        onSearch={handleSearch}
        urlVal={urlConfig}
        isSearch={true}
      />
    </div>
  );
});
export { VideoTutorialTypeScreen };
