export interface UserType {
  userId?: string;
  nickName?: string;
  status?: string;
  createTime?: string;
  userName?: string;
  remark?: string;
  roleId?: string;
}

export interface GetUserParmas extends API.PageParams {
  userId?: string;
  nickName?: string;
  status?: string;
  userName?: string;
}
