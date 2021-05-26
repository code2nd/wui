import React, {
  FC,
  useState,
  FunctionComponentElement,
  useContext,
  MouseEvent,
  Children,
  cloneElement,
} from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';
import Icon from '../BaseIcon/baseIcon';
import Transition from '../Transition/transition';

export interface SubmenuProps {
  /** 索引值 */
  index?: string;
  /** 标题 */
  title?: string;
  className?: string;
}

export const SubMenu: FC<SubmenuProps> = ({
  index,
  className,
  title,
  children,
}) => {
  const context = useContext(MenuContext);
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>;
  const isOpened =
    index && context.mode === 'vertical'
      ? openedSubMenus.includes(index)
      : false;
  const [menuOpen, setMenuOpen] = useState(isOpened);
  const classes = classNames('w-menu-item w-submenu-item', className, {
    'is-active': context.index === index,
    'is-opened': menuOpen,
    'is-vertical': context.mode === 'vertical',
  });

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    setMenuOpen(!menuOpen);
  };

  let timer: any;
  const handleMouse = (e: MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setMenuOpen(toggle);
    }, 300);
  };

  const clickEvents =
    context.mode === 'vertical'
      ? {
          onClick: handleClick,
        }
      : {};

  const hoverEvents =
    context.mode !== 'vertical'
      ? {
          onMouseEnter: (e: MouseEvent) => {
            handleMouse(e, true);
          },
          onMouseLeave: (e: MouseEvent) => {
            handleMouse(e, false);
          },
        }
      : {};

  const renderChildren = () => {
    const subMenuClass = classNames('w-submenu', {
      'menu-opened': menuOpen,
    });
    const childrenComponent = Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem') {
        return cloneElement(childElement, {
          index: `${index}-${i}`,
        });
      } else {
        console.error(
          'Warming: SubMenu has a child which is not a MemuItem component'
        );
      }
    });

    return (
      <Transition in={menuOpen} timeout={300} animation="zoom-in-top">
        <ul className={subMenuClass}>{childrenComponent}</ul>
      </Transition>
    );
  };

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="w-submenu-title" {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon" />
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = 'SubMenu';

export default SubMenu;
