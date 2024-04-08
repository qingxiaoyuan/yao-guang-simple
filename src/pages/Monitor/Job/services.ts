import { request } from '@umijs/max';
import { TaskType } from './types';

/**
 * 获取任务列表方法
 */
export const getTaskList = (params: API.PageParams) => {
  return request('/job/list', {
    method: 'GET',
    params,
  });
};

export const addTask = (taskParams: TaskType) => {
  return request('/job/add', {
    method: 'POST',
    data: taskParams,
  });
};

export const getTaskDetail = (jobId: string) => {
  return request(`/job/${jobId}`, {
    method: 'GET',
  });
}

export const editTask = (taskParams: TaskType) => {
  return request('/job/edit', {
    method: 'POST',
    data: taskParams,
  });
};

export const editTaskStatus = (taskParams: TaskType) => {
  return request('/job/changeStatus', {
    method: 'POST',
    data: taskParams,
  });
};

export const deleteTask = (taskIds: string) => {
  return request(`/job/delete/${taskIds}`, {
    method: 'POST',
  });
};