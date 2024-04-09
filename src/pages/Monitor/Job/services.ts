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

export const runTaskById = (taskParams: TaskType) => {
  return request('/job/run', {
    method: 'POST',
    data: taskParams,
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

export const getTaskLogList = (params: API.PageParams) => {
  return request('/jobLog/list', {
    method: 'GET',
    params,
  });
};

export const deleteTaskLog = (taskIds: string) => {
  return request(`/jobLog/${taskIds}`, {
    method: 'DELETE',
  });
};

export const deleteAllLog = () => {
  return request('/jobLog/clean', {
    method: 'DELETE',
  });
};
