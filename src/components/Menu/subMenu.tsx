import React, {
  useState,
  createContext,
  FunctionComponentElement,
  useCallback,
  useContext,
} from "react";
import classNames from "classnames";
import { CSSTransition } from 'react-transition-group';
import { MenuContext } from "./menu";
import { MenuItemProps } from "./menuItem";
import Icon from 'components/Icon/Icon';
import Transition from 'components/Transition/transition';

export interface SubmenuProps {
  index?: string;
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
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>;
  const isOpened = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false;
  const [menuOpen, setMenuOpen] = useState(isOpened);
  const classes = classNames("w-menu-item w-submenu-item", className, {
    "is-active": context.index === index,
    "is-opened": menuOpen,
    "is-vertical": context.mode === 'vertical'
  });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(!menuOpen);
  };

  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setMenuOpen(toggle);
    }, 300)
  }

  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {};

  const hoverEvents = context.mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
    onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) }
  } : {};

  const renderChildren = () => {
    const subMenuClass = classNames("w-submenu", {
      "menu-opened": menuOpen,
    });
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === "MenuItem") {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`
        });
      } else {
        console.error(
          "Warming: SubMenu has a child which is not a MemuItem component"
        );
      }
    });

    return <Transition
      in={menuOpen}
      timeout={300}
      animation="zoom-in-top"
    >
      <ul className={subMenuClass}>{childrenComponent}</ul>
    </Transition>;
  };

  return (
    <li key={index} className={classes} { ...hoverEvents }>
      <div className="w-submenu-title" { ...clickEvents }>
        {title}
        <Icon icon="angle-down" className="arrow-icon" />
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = "SubMenu";

export default SubMenu;
