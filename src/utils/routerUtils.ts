import { MenuDataItem } from "@ant-design/pro-components";

export const getRoutersList = (routers: MenuDataItem[]) => {
  const routersList: Array<string> = [];
  routers.forEach((item) => {
    if (item.path) {
      routersList.push(item.path);
    }
    if (item.children) {
      routersList.push(...getRoutersList(item.children));
    }
  });
  return routersList;
};

export const fomartRouter = (serverRouter: string[], defaultRouter: MenuDataItem[]): MenuDataItem[] => {
  return defaultRouter.map((item) => {
    if (item.path === '/login' || item.path === '/welcome' || item.path === '/tool' || item.path === '/') {
      return item;
    }
    if (item.path && serverRouter.includes(item.path)) {
      return {
        ...item,
        children: fomartRouter(serverRouter, item.children ?? []),
      };
    }
    return {
      ...item,
      hideInMenu: true,
      children: fomartRouter(serverRouter, item.children ?? []),
    };
  });
  
};