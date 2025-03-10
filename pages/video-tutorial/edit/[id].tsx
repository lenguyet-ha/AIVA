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
  isMultiple?: boolean;
}
export default function VideoTutorial() {
  const router = useRouter();
  const { id } = router.query; // Lấy ID từ URL
  const [data, setData] = useState<CMSItem[]>([]);
  const [providerConfig, setProviderConfig] = useState<ConfigItem[]>([
    {
      label: lang.videoTutorial.add.name,
      key: "name",
      isView: true,
      type: "text",
      required: true,
    },
    {
      label: lang.videoTutorial.add.description,
      key: "description",
      isView: true,
      type: "text",
    },
    {
      label: lang.videoTutorial.add.link,
      key: "link",
      isView: true,
      type: "text",
    },
    {
      label: lang.videoTutorial.add.order,
      key: "order",
      isView: true,
      type: "number",
    },
    {
      label: lang.videoTutorial.add.servicePackage,
      key: "planObjIds",
      isView: true,
      type: "DROPDOWN",
      isMultiple: true,
      options: [
        { text: "Đang hoạt động", value: "Active" },
        { text: "Đợi chấp thuận", value: "WaitingAccepted" },
        { text: "Không hoạt động", value: "Inactive" },
      ],
    },
    {
      label: lang.videoTutorial.add.type,
      key: "videoTutorialCategoryObjIds",
      isView: true,
      type: "DROPDOWN",
      options: [
        { text: "Đang hoạt động", value: "Active" },
        { text: "Đợi chấp thuận", value: "WaitingAccepted" },
        { text: "Không hoạt động", value: "Inactive" },
      ],
    },
  ]);
  const { publicRuntimeConfig } = getConfig();

  //Edit
  const updateVideoTutorial = async (rowData: any) => {
    try {
      const payload: AxiosRequestConfig = {
        url: "system/video-tutorials/update",
        method: "put",
        data: {
          ...rowData,
          videoTutorialObjId: rowData._id,
        },
      };
      const response = await axios(payload);
      if (response.data.success) {
        dispatch(showSuccessSnackBar(response?.data?.message));
        router.push("/video-tutorial");
        return response.data;
      } else {
        dispatch(showErrorSnackBar(response?.data?.message));
        return response.data;
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const fetchFilterData = async () => {
    try {
      const [plansResponse, tagsResponse] = await Promise.all([
        axios.get("system/plans/listActive"),
        axios.get("system/video-tutorial-categories/listActive"),
      ]);

      if (plansResponse.data.success && tagsResponse.data.success) {
        setProviderConfig(prevConfigs =>
          prevConfigs.map(config => {
            if (config.key === "planObjIds") {
              return {
                ...config,
                options: [
                  ...plansResponse.data.data.map(plan => ({
                    value: plan._id,
                    text: plan.code,
                  })),
                ],
              };
            } else if (config.key === "videoTutorialCategoryObjIds") {
              return {
                ...config,
                options: [
                  ...tagsResponse.data.data.map(tag => ({
                    value: tag._id,
                    text: tag.name,
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
            url: "system/video-tutorials/info",
            method: "get",
            params: {
              videoTutorialObjId: id,
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

  useEffect(() => {
    fetchFilterData();
  }, []);

  return (
    <>
      <main>
        <HelmetProvider>
          <CMSList
            data={data}
            config={providerConfig}
            title={lang.videoTutorial.add.tittle}
            onAction={handleAction}
          />
        </HelmetProvider>
      </main>
    </>
  );
}
