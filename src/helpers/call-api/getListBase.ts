import getConfig from "next/config";
import axios from "../axios";
import { showErrorSnackBar } from "@/src/store/reducers/snackbar";
import { dispatch } from "@/src/store";
import { ParamFetch, SEARCH_TERMS_INTERFACE } from "@/src/types/auth";

const { publicRuntimeConfig } = getConfig();

export const getListBase = async (
  url: string,
  params?: ParamFetch[],
  searchTerms?: SEARCH_TERMS_INTERFACE[],
): Promise<any> => {
  try {
    const config = getQueryStringByFetchDataConfig({
      url,
      params,
      searchTerms,
    });

    const response = await axios.get(`${process.env.ORIGIN_API}/${config}`);

    if (response?.data?.success) {
      return response?.data?.data || null;
    } else {
      dispatch(showErrorSnackBar(response?.data?.message));
      return response?.data?.data || null;
    }
  } catch (error) {
    console.error("Error occurred while fetching data:", error);
    dispatch(showErrorSnackBar("An error occurred while fetching data."));
  }
};

export const getQueryStringByFetchDataConfig = ({
  url,
  params,
  searchTerms,
}: {
  url: string;
  params?: ParamFetch[];
  searchTerms?: SEARCH_TERMS_INTERFACE[];
}): string => {
  if (!url) {
    return "";
  }

  let paramsStr = "";

  // Xử lý params
  if (params && Array.isArray(params)) {
    params.forEach(item => {
      if (item.paramKey && item.paramValue !== undefined) {
        paramsStr += `${item.paramKey}=${item.paramValue}&`;
      }
    });
  }

  // Xử lý searchTerms
  if (searchTerms && Array.isArray(searchTerms)) {
    searchTerms.forEach((term, index) => {
      if (term.fieldName && term.fieldValue !== undefined) {
        paramsStr += `searchTerms[${index}].fieldName=${term.fieldName}&`;
        paramsStr += `searchTerms[${index}].fieldValue=${term.fieldValue}&`;
        if (term.condition) {
          paramsStr += `searchTerms[${index}].condition=${term.condition}&`;
        }
      }
    });
  }

  // Loại bỏ dấu '&' cuối chuỗi nếu có
  if (paramsStr.endsWith("&")) {
    paramsStr = paramsStr.slice(0, -1);
  }

  // Kết hợp `url` với query string
  return `${url}${
    paramsStr ? (url.includes("?") ? "&" : "?") + paramsStr : ""
  }`;
};
