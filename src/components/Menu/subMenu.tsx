import React, {
  useState,
  createContext,
  FunctionComponentElement,
  useCallback,
  useContext,
} from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';

export interface SubmenuProps {
  index?: number;
  title?: string;
  className?: string;
}

const SubMenu: React.FC<SubmenuProps> = ({
  index,
  className,
  title,
  children,
}) => {
  const context = useContext(MenuContext);
  const classes = classNames('w-menu-item w-submenu-item', className, {
    'is-active': context.index === index,
  });

  const renderChildren = () => {
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem') {
        return childElement;
      } else {
        console.error(
          'Warming: Menu has a child which is not a MemuItem component'
        );
      }
    });

    return <ul className="w-submenu">{childrenComponent}</ul>;
  };

  return (
    <li key={index} className={classes}>
      <div className="w-submenu-title">{title}</div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = 'SubMenu';

export default SubMenu;
