
// import React from 'react';
import type { MenuDataItem } from '@ant-design/pro-layout';
// import * as allIcons from '@ant-design/icons';
// iconType = 'Outlined'
const fixMenuItemIcon = (menus: MenuDataItem[]): MenuDataItem[] => {
   menus.forEach((item) => {
      const { icon, children } = item
      if (typeof icon === 'string' && !!icon) {
        //  const fixIconName = icon.slice(0, 1).toLocaleUpperCase() + icon.slice(1) + iconType
         item.icon = '';
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      children && children.length > 0 ? item.children = fixMenuItemIcon(children) : null
   });
   return menus
};
 
export default fixMenuItemIcon;