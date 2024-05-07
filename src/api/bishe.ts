import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

type Result = {
  Code: number;
  Data?: Array<any>;
  Msg: string;
};

/** 毕设 */
export const getUserList = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("api/bishe/user/list"), {
    data
  });
};

export const getSportList = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("api/bishe/sport/list"), {
    data
  });
};

export const getOrderList = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("api/bishe/order/list"), {
    data
  });
};

export const addUser = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("api/bishe/user/create"), {
    data
  });
};

export const addSport = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("api/bishe/sport/create"), {
    data
  });
};

export const addOrder = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("api/bishe/order/create"), {
    data
  });
};

export const delUser = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("api/bishe/user/delete"), {
    data
  });
};

export const delSport = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("api/bishe/sport/delete"), {
    data
  });
};

export const delOrder = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("api/bishe/order/delete"), {
    data
  });
};
