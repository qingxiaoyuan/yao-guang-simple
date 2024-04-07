import { request } from '@umijs/max';
import { MenuDataItem } from '@umijs/route-utils';

/**
 * 获取帐套
 */
export const login = ({ username, password }: { username?: string; password?: string }) => {
  return request('/login', {
    method: 'POST',
    data: {
      username,
      password,
    },
  });
};

/**
 * 获取当前登录人信息
 */
export const getUserInfo = (): Promise<{
  code: number;
  data: { permissions: Array<string>; roles: Array<string>; user: API.CurrentUser };
  msg: string;
}> => {
  return request('/getInfo', {
    method: 'GET',
  });
};

/**
 * 获取当前登录人信息
 */
export const getRouters = (): Promise<{
  code: number;
  data: MenuDataItem[];
  msg: string;
}> => {
  return request('/getRouters', {
    method: 'GET',
  });
};