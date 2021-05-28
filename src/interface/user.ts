import { CommonProps } from "./common";
import { DeptProps } from "./dept";

export interface ILogin {
  token: string;
}

export interface IUserInfo {
  avatar: string;
  introduction: string;
  name: string;
  roles: string[];
}

export interface LoginBodyProps {
  tel: string;
  password: string;
}

export interface PersonListProps extends CommonProps {
  dept: DeptProps;
  deptId: number;
  isSuper: boolean;
  name: string;
  password: string;
  powers: string;
  role: string;
  tel: string;
}

export interface QueryPersonProps {
  page: number;
  limit: number;
  name: string;
  tel: string;
  deptId: string;
  role: string;
}
