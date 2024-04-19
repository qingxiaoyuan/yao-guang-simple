import { request } from '@umijs/max';
import { GetUserParmas, UserType } from './types';

/**
 * 获取用户列表方法
 */
export const getUserList = (params: GetUserParmas) => {
  return request('/user/list', {
    method: 'GET',
    params,
  });
};

export const addUser = (userParams: UserType) => {
  return request('/user/add', {
    method: 'POST',
    data: userParams,
  });
};

export const getUserDetail = (userId: string) => {
  return request(`/user/getUserInfo/${userId}`, {
    method: 'GET',
  });
}

export const editUser = (userParams: UserType) => {
  return request('/user/edit', {
    method: 'POST',
    data: userParams,
  });
};

export const deleteUser = (userIds: string) => {
  return request(`/user/delete/${userIds}`, {
    method: 'POST',
  });
};

export const importUsers = (form: FormData) => {
  return request('/user/importData', {
    method: 'POST',
    data: form,
  })
};

export const exportUsers = () => {
  return request('/user/export', {
    method: 'POST',
  });
};