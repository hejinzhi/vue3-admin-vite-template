import request from "@/utils/request";
import { baseUrl } from "@/config";
import {
  ILogin,
  IUserInfo,
  LoginBodyProps,
  PersonListProps,
  QueryPersonProps,
} from "@/interface/user";
import { DeleteCommonProps, PagenationProps } from "@/interface/common";

export const login = (data: LoginBodyProps) => {
  return request<ILogin>({
    url: `${baseUrl}/person/login`,
    method: "post",
    data,
  });
};

export const getInfo = async () => {
  const res = await request.get<IUserInfo>(`${baseUrl}/person/userinfo`);
  return res.data;
};

export const getPerson = async (query?: QueryPersonProps) => {
  const res = await request.post<PagenationProps<PersonListProps>>(
    `${baseUrl}/person/list`,
    query
  );
  return res.data;
};

export const deletePerson = async (id: number) => {
  const res = await request.delete<DeleteCommonProps>(baseUrl + "/person", {
    params: { id },
  });
  return res.data;
};

export const addPerson = (dept: string) => {
  return request({
    url: baseUrl + "/person",
    method: "post",
    data: dept,
  });
};

export const updatePerson = (dept: string) => {
  return request({
    url: baseUrl + "/person",
    method: "put",
    data: dept,
  });
};

export const changePwd = (body: any) => {
  return request({
    url: baseUrl + "/person/pwd",
    method: "post",
    data: body,
  });
};
