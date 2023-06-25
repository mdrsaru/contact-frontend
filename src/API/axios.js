import axios from "../config/axios";
export const get = (url, filters) => {
  try {
    return axios
      .get(url, { params: filters })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  } catch (error) {
    throw error;
  }
};

export const post = (url, data) => {
  try {
    return axios.post(url, data).then((response) => {
      return response;
    });
  } catch (error) {
    throw error;
  }
};

export const deleteAPI = (url, data) => {
  try {
    return axios.delete(url, data).then((response) => {
      return response;
    });
  } catch (error) {
    throw error;
  }
};

export const put = (url, data) => {
  try {
    return axios.put(url, data).then((response) => {
      return response;
    });
  } catch (error) {
    throw error;
  }
};