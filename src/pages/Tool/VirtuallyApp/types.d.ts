export enum ProductType {
  ENTERPRISE = '1',
  CUSTOM = '2',
} 

export interface AppInfoType {
  type?: ProductType,
  code?: string,
  ucode?: string,
  userName?: string,
  version?: string,
};