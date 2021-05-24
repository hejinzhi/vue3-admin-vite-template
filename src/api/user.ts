import request from '@/utils/request'
import { baseUrl } from '@/config'


interface ILogin {
  token: string;
}

export function login(data: { username: string, password: string }) {

  return request<ILogin>({
    url: `${baseUrl}/person/login`,
    method: 'post',
    data
  })
}

export interface UserInfo {
  avatar: string,
  introduction: string,
  name: string,
  roles: string[]
}

export function getInfo() {
  return request({
    url: `${baseUrl}/person/userinfo`,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
