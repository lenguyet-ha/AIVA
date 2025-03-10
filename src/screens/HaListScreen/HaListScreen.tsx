import React, { useEffect, useState } from "react";
import BaseMUITable from "@/src/components/BaseMUITable/BaseMUITable";
import { COLUMN_TYPE } from "@/src/constants/tableconfigs";
import getConfig from "next/config";
import {
  showErrorSnackBar,
  showSuccessSnackBar,
} from "@/src/store/reducers/snackbar";
import { dispatch } from "@/src/store";
import { useRouter } from "next/router";
import { urlConfig } from "./ConfigTable";
import { lang } from "@/src/constants/lang";
import { postService } from "@/src/apiRequest/haList";
// Định nghĩa kiểu dữ liệu cho cột
type ColumnType = (typeof COLUMN_TYPE)[keyof typeof COLUMN_TYPE];

interface Option {
  text: string;
  value: string;
  _id?: string;
  name?: string;
  code?: string;
}

interface TableColumn {
  key: string;
  label: string;
  columnType: ColumnType; // CHẮC CHẮN kiểu này không phải string
  actions?: { label: string; actionType: "DELETE" | "EDIT" | "VIEW" }[];
  required?: boolean;
  options?: Option[]; // Mảng option sẽ chứa các đối tượng có text và value
  isMultiple?: boolean;
}
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
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

const HaListScreen = React.memo(() => {
  const router = useRouter();
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTxt, setSearchTxt] = useState("");
  const [columns, setColumns] = useState<TableColumn[]>([
    // { key: "id", label: "ID", columnType: COLUMN_TYPE.NUMBER },
    {
      key: "id",
      label: "ID",
      columnType: COLUMN_TYPE.TEXT,
      required: true,
    },
    { key: "title", label: "Tiêu dề", columnType: COLUMN_TYPE.TEXT },
    {
      key: "body",
      label: "Nội dung",
      columnType: COLUMN_TYPE.TEXT,
      required: true,
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
  ]);

  useEffect(() => {
    console.log(columns);
  }, [columns]);

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
  const postProduct = async (rowData: any) => {
    try {
      const responseData = await postService.createPost(rowData);
      if (responseData.id) {
        dispatch(showSuccessSnackBar("Thêm bài viết thành công"));
        // Cập nhật phân trang
        setPagination(prevPagination => ({
          ...prevPagination,
          currentPage:
            prevPagination.itemCount / limit < prevPagination.pageCount + 1 &&
            prevPagination.itemCount / limit > prevPagination.pageCount
              ? prevPagination.pageCount + 2
              : prevPagination.pageCount + 1,
          itemCount: prevPagination.itemCount + 1,
          pageCount: Math.ceil(
            (prevPagination.itemCount + 1) / prevPagination.limit,
          ),
        }));
        setData([responseData]);
        return responseData;
      } else {
        dispatch(showErrorSnackBar("Thêm bài viết thất bại"));
        return responseData;
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
  const updateProduct = async (rowData: any) => {
    try {
      const response = await postService.updatePost(rowData);
      if (response) {
        dispatch(showSuccessSnackBar("Cập nhật thành công"));
        getListVideoTutorial();
        return response;
      } else {
        dispatch(showErrorSnackBar("Cập nhật thất bại"));
        return response;
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  //Delete
  const deleteProduct = async (rowData: any) => {
    try {
      if (!rowData.id) {
        dispatch(showErrorSnackBar("ID không hợp lệ!"));
        return;
      }
      const response = await postService.deletePost(rowData.id);
      if (response.status === 200 || response.status === 204) {
        dispatch(showSuccessSnackBar("Xóa bài viết thành công!"));

        // Xóa bài viết khỏi danh sách hiện tại
        setData(prevData => prevData.filter(post => post.id !== rowData.id));

        // Cập nhật pagination
        setPagination(prevPagination => ({
          ...prevPagination,
          itemCount: prevPagination.itemCount - 1,
          pageCount: Math.ceil(
            (prevPagination.itemCount - 1) / prevPagination.limit,
          ),
        }));

        return response.data;
      } else {
        dispatch(showErrorSnackBar("Không thể xóa bài viết!"));
        return response.data;
      }
    } catch (error) {
      console.log("error: ", error);
      dispatch(showErrorSnackBar("Lỗi khi xóa bài viết!"));
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
        postProduct(rowData);
        break;
      case COLUMN_TYPE.EDIT:
        updateProduct(rowData);
        break;
      case COLUMN_TYPE.DELETE:
        deleteProduct(rowData);
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
      const responseData = await postService.fetchAllPosts(searchTxt);

      if (Array.isArray(responseData)) {
        const startIndex = (currentPage - 1) * limit;
        const paginatedData = responseData.slice(
          startIndex,
          startIndex + limit,
        );

        setData(paginatedData);
        setPagination({
          itemCount: responseData.length,
          limit: limit,
          pageCount: Math.ceil(responseData.length / limit),
          currentPage: currentPage,
          pagingCounter: startIndex + 1,
          hasPrevPage: currentPage > 1,
          hasNextPage: currentPage * limit < responseData.length,
          prevPage: currentPage > 1 ? currentPage - 1 : null,
          nextPage:
            currentPage * limit < responseData.length ? currentPage + 1 : null,
        });

        return responseData;
      } else {
        dispatch(showErrorSnackBar("Lỗi khi lấy dữ liệu"));
        router.push("/login");
        return responseData;
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
      <h2>Bling</h2>
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
export { HaListScreen };
