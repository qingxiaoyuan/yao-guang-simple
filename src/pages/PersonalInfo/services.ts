import { request } from '@umijs/max';
import { UserType } from '../Manage/UserList/types';

/**
 * 获取用户列表方法
 */
export const getProfile = () => {
  return request('/system/user/profile/getProfile', {
    method: 'GET',
  });
};


export const editProfile = (userParams: UserType) => {
  return request('/system/user/profile/editProfile', {
    method: 'POST',
    data: userParams,
  });
};