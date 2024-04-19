import { request } from '@umijs/max';

/**
 * 获取用户列表方法
 */
export const getIssueList = () => {
  return request('https://gateway.ns820.com/cloud/notification/reminder/getNoticeForDev', {
    method: 'GET',
  });
};