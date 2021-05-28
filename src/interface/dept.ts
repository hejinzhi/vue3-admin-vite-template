import { CommonProps } from "./common";

export interface DeptProps extends CommonProps {
  name: string;
  remark: string;
  type: string;
}

export interface QueryDeptProps {
  limit: number;
  name: string;
  page: number;
  type: string;
}
