declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';
declare module 'numeral';
declare module '@antv/data-set';
declare module 'mockjs';
declare module 'react-fittext';
declare module 'bizcharts-plugin-slider';

declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false;

declare namespace API {
  type CurrentUser = {
    /** 是否为超级管理员 */
    admin?: boolean;
    /** 头像 */
    avatar?: string;
    /** 部门id */
    deptId?: number;
    /** 部门信息 */
    dept?: {[key: string]: string};
    email?: string;
    /** 昵称 */
    nickName?: string;
    phonenumber?: string;
    /** 岗位id */
    postIds?: number;
    /** 备注 */
    remark?: string;
    /** 角色id */
    roleId?: number;
    /** 性别 0=男 1=女 */
    sex?: string;
    /** 账号状态 0=正常 1=禁用 */
    status?: string;
    /** 用户id */
    userId?: string;
    /** 用户名/登录账号 */
    userName?: string;
    /** 权限 */
    permissions?: Array<string>;
    /** 角色 */
    roles?: Array<string>;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
    msg?: string;
  };

  type PageParams = {
    pageIndex?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };


  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}

