import CMSList from "@/src/components/BaseCMList/CMSList";

import axios1 from "@/src/helpers/axios1";


import { dispatch } from "@/src/store";
import {
  showErrorSnackBar,
  showSuccessSnackBar,
} from "@/src/store/reducers/snackbar";
import { AxiosRequestConfig } from "axios";
import getConfig from "next/config";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HelmetProvider } from "react-helmet-async";
interface CMSItem {
  [key: string]: any;
}
interface ConfigItem {
  label: string;
  key: string;
  isView: boolean;
  required?: boolean;
  isNumber?: boolean;
  type?: "text" | "number" | "date" | "DROPDOWN";
  options?: { text: string; value: any }[];
  isMultiple?: boolean;
}
export default function Customer() {
  const router = useRouter();
  const { id } = router.query; // Lấy ID từ URL
  const [data, setData] = useState<CMSItem[]>([]);
  const [providerConfig, setProviderConfig] = useState<ConfigItem[]>([
    
    {
      label: 'title',
      key: "title",
      isView: true,
      type: "text",
    },
    {
      label: 'body',
      key: "body",
      isView: true,
      type: "text",
    }
  ]);
  const { publicRuntimeConfig } = getConfig();

  //Edit
  const updateVideoTutorial = async (rowData: any) => {
    try {
      const payload: AxiosRequestConfig = {
        url: `/posts/${rowData.id}`,
        method: "put",
        data: {
          ...rowData,
          id: rowData.id,
        },
      };
      const response = await axios1(payload);
      if (response.data) {
        dispatch(showSuccessSnackBar("Cập nhật thành công"));
        router.push("/ha-list");
        return response.data;
      } else {
        dispatch(showErrorSnackBar("Cập nhật thất bại"));
        return response.data;
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

 

  // Hàm xử lý khi bấm vào nút Hành động
  const handleAction = (formData: CMSItem[]) => {
    updateVideoTutorial(formData[0]);
  };

  // Giả lập fetch dữ liệu từ API
  useEffect(() => {
    if (id) {
      const getListVideoTutorialByID = async () => {
        try {
          const payload: AxiosRequestConfig = {
            url: `/posts/${id}`,
            method: "get",
          };
          const response = await axios1(payload);
          if (response.data) {
            setData([{ ...response?.data}]);
            return response.data;
          } else {
            dispatch(showErrorSnackBar("Không tìm thấy bài viết"));
            router.push("/login");
            return response.data;
          }
        } catch (error) {
          console.log("error: ", error);
        } finally {
        }
      };
      getListVideoTutorialByID();
    }
  }, [id]);

 

  return (
    <>
      <main>
        <HelmetProvider>
          <CMSList
            data={data}
            config={providerConfig}
            title={'Update Bling'}
            onAction={handleAction}
          />
        </HelmetProvider>
      </main>
    </>
  );
}
