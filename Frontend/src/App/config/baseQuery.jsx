import api from "./axiosInstance";

const axiosBaseQuery =
  ({ baseUrl = "" } = {}) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await api({
        url: `${baseUrl}${url}`,
        method,
        data,
        params,
      });

      return {
        data: result.data,
      };
    } catch (axiosError) {
      return {
        error: {
          status: axiosError.response?.status,
          data: axiosError.response?.data || {
            message: axiosError.message,
          },
        },
      };
    }
  };

export default axiosBaseQuery;
