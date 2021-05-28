import request from "@/utils/request";
import { baseUrl } from "@/config";
import { PagenationProps } from "@/interface/common";
import { DeptProps, QueryDeptProps } from "@/interface/dept";

// export const getPerson = async (query?: QueryPersonProps) => {
//   const res = await request.post<PagenationProps<PersonListProps>>(
//     `${baseUrl}/person/list`,
//     query
//   );
//   return res.data;
// };

export const getDepts = async (query?: QueryDeptProps) => {
  const res = await request.get<PagenationProps<DeptProps>>(`${baseUrl}/dept`, {
    params: query,
  });
  return res.data;
};

// export function deleteDept(id) {
//   return request({
//     url: baseUrl + "/dept",
//     method: "delete",
//     params: { id },
//   });
// }

// export function addDept(dept) {
//   return request({
//     url: baseUrl + "/dept",
//     method: "post",
//     data: dept,
//   });
// }

// export function updateDept(dept) {
//   return request({
//     url: baseUrl + "/dept",
//     method: "put",
//     data: dept,
//   });
// }
