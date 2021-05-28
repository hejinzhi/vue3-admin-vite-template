import request from "@/utils/request";
import { baseUrl } from "@/config";
import { DeleteCommonProps, PagenationProps } from "@/interface/common";
import { DeptProps, QueryDeptProps } from "@/interface/dept";

export const getDepts = async (query?: QueryDeptProps) => {
  const res = await request.get<PagenationProps<DeptProps>>(`${baseUrl}/dept`, {
    params: query,
  });
  return res.data;
};

export const addDept = async (dept: DeptProps) => {
  const res = await request.post<DeptProps>(`${baseUrl}/dept`, dept);
  return res.data;
};

export const deleteDept = async (id: number) => {
  const res = await request.delete<DeleteCommonProps>(`${baseUrl}/dept`, {
    params: { id },
  });
  return res.data;
};

export const updateDept = async (dept: DeptProps) => {
  const res = await request.put(`${baseUrl}/dept`, dept);
  return res.data;
};
