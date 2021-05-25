import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import classNames from 'classnames';

export type ButtonSize = 'lg' | 'sm';
export const ButtonSizeConst = {
  Large: 'lg',
  Small: 'sm'
}

export type ButtonType = 'primary' | 'default' | 'danger' | 'link';
export const ButtonTypeConst = {
  Primary: 'primary',
  Default: 'default',
  Danger: 'danger',
  Link: 'link',
}

export interface BaseButtonProps {
  children?: React.ReactNode;
  className?: string;
  /** 设置失效状态 */
  disabled?: boolean;
  /** 设置按钮的大小 */
  size?: ButtonSize;
  /** 设置按钮的类型 */
  btnType?: ButtonType;
  /** 点击跳转的地址，指定此属性 button 的行为和 a 链接一致 */
  href?: string;
}

type NativeButtonProps = BaseButtonProps &
  ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps &
  AnchorHTMLAttributes<HTMLElement>;

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

export const Button: FC<ButtonProps> = (props) => {
  const {
    children,
    className,
    btnType,
    disabled,
    size,
    href,
    ...restProps
  } = props;

  const classes = classNames('w-btn', className, {
    [`w-btn-${btnType}`]: btnType,
    [`w-btn-${size}`]: size,
    disabled: btnType === ButtonTypeConst.Link && disabled,
  });

  if (btnType === ButtonTypeConst.Link && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    );
  }
};

Button.defaultProps = {
  disabled: false,
  btnType: 'default',
  size: 'sm',
};

export default Button;

/**
 * 组件需求
 * 1 不同的 Button Type
 *    Primary Default Danger Link Button
 * 2 不同的 Button Size
 *    normal small large
 * 3 Disable 状态
 */
