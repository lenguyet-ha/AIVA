import CMSList from "@/src/components/BaseCMList/CMSList";
import { lang } from "@/src/constants/lang";
import axios from "@/src/helpers/axios";
import { VideoTutorialScreen } from "@/src/screens/VideoTutorialScreen/VideoTutorialScreen";
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
}
export default function VideoTutorial() {
  const router = useRouter();
  const { id } = router.query; // Lấy ID từ URL
  const [data, setData] = useState<CMSItem[]>([]);
  const [providerConfig, setProviderConfig] = useState<ConfigItem[]>([
    {
      label: lang.videoTutorialType.add.name,
      key: "name",
      isView: true,
      type: "text",
      required: true,
    },
    {
      label: lang.videoTutorialType.add.description,
      key: "description",
      isView: true,
      type: "text",
    },
  ]);
  const { publicRuntimeConfig } = getConfig();

  //Edit
  const updateVideoTutorial = async (rowData: any) => {
    try {
      const payload: AxiosRequestConfig = {
        url: "system/video-tutorial-categories/update",
        method: "put",
        data: {
          ...rowData,
          videoTutorialCategoryObjId: rowData._id,
        },
      };
      const response = await axios(payload);
      if (response.data.success) {
        dispatch(showSuccessSnackBar(response?.data?.message));
        router.push("/video-tutorial-type");
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
  const handleAction = (formData: CMSItem[]) => {
    updateVideoTutorial(formData[0]);
  };

  // Giả lập fetch dữ liệu từ API
  useEffect(() => {
    if (id) {
      const getListVideoTutorialByID = async () => {
        try {
          const payload: AxiosRequestConfig = {
            url: "system/video-tutorial-categories/info",
            method: "get",
            params: {
              videoTutorialCategoryObjId: id,
            },
          };
          const response = await axios(payload);
          if (response.data.success) {
            setData([{ ...response?.data?.data }]);
            return response.data;
          } else {
            dispatch(showErrorSnackBar(response?.data?.message));
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
            title={lang.videoTutorialType.add.tittle}
            onAction={handleAction}
          />
        </HelmetProvider>
      </main>
    </>
  );
}
