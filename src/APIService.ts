import axios from "axios";
axios.defaults.headers.get["Accept"] = "application/json, text/plain, */*";
axios.defaults.headers.post["Accept"] = "application/json, text/plain, */*";
axios.defaults.withCredentials = true;

export class APIService {
  static async getData(
    httpMethod: string,
    endPoint: string,
    requestData: any,
    isFormData = false,
  ): Promise<any> {
    try {
      let response;
      const config: any = {};
      if (isFormData) {
        config.headers = { "Content-Type": "multipart/form-data" };
      }
      switch (httpMethod) {
        case "GET":
          response = await axios.get(endPoint, {
            params: requestData,
            ...config,
          });
          break;
        case "POST":
          response = await axios.post(endPoint, requestData, config);
          break;
        case "PUT":
          response = await axios.put(endPoint, requestData, config);
          break;
        case "POST_SINGLE_VALUE":
          response = await axios.post(endPoint, requestData, {
            headers: {
              "Content-Type": "application/json",
            },
            transformRequest: [
              function () {
                return JSON.stringify(requestData);
              },
            ],
          });
          break;
        case "DELETE":
          response = await axios.delete(endPoint, {
            data: requestData,
            ...config,
          });
          break;
        default:
          throw new Error(`Unsupported HTTP method: ${httpMethod}`);
      }
      return response.data;
    } catch (error) {
      console.error("API call error:", error);
      throw error;
    }
  }
}

axios.interceptors.request.use(
  (config: any) => {
    // if (userDetails?.token) {
    //   config.headers["Authorization"] = `Bearer ${userDetails?.token}`;
    // }
    // config.headers["Content-Type"] = "application/json";
    if (config.baseURL === "") {
      config.timeout = 4000;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);
