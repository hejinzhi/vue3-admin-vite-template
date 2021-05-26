import request from '@/utils/request'
import { baseUrl } from '@/config'


interface ILogin {
  token: string;
}


export function login(data: { tel: string, password: string }) {

  return request<ILogin>({
    url: `${baseUrl}/person/login`,
    method: 'post',
    data
  })
}

export interface IUserInfo {
  avatar: string,
  introduction: string,
  name: string,
  roles: string[]
}

export const getInfo = async() => {
  const res = await request.get<IUserInfo>(`${baseUrl}/person/userinfo`)
  return res.data
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
