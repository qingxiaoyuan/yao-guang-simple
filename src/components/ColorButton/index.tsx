import React, { useMemo } from 'react';
import { Button, ButtonProps } from 'antd';

interface ColorButtonProps extends ButtonProps {
  color?: string;
};

export const ColorButton: React.FC<ColorButtonProps> = (props) => {
  const { color, type, style, children } = props;
  const customColor = useMemo<React.CSSProperties | undefined>(() => {
    if (color) {
      const cssProperties: React.CSSProperties = {};
      if (type === 'primary') {
        // 实心按钮
        cssProperties.backgroundColor = color;
      } else {
        cssProperties.color = color;
      }
      cssProperties.borderColor = color;
      return { ...cssProperties, ...style };
    }
    return undefined;
  }, [color]);
  return <Button {...props} style={customColor} >{children}</Button>
};