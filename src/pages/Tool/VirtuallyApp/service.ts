import { request } from '@umijs/max';

/**
 * 获取帐套
 */
export const getUcode = ({ esn }: { esn: string }) => {
  return request(
    'https://appserver.netcall.cc/EnterpriseInfoService/cloud/fromwechat/rest/uiauthentication/getaccounts',
    {
      method: 'GET',
      params: {
        esn,
        serviceNickName: 'netcallservice',
      },
    },
  );
};

export const getEsn = ({ code }: { code: string }) => {
  return request('https://gateway.ns820.com/ing/v3/3th/tenant/basicInfo.do/' + code, {
    method: 'GET',
  });
};
