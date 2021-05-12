import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button, { ButtonProps, ButtonSize, ButtonType } from './button';

const defaultProps = {
  onClick: jest.fn(),
};

const testProps: ButtonProps = {
  btnType: ButtonType.Primary,
  size: ButtonSize.Large,
  className: 'test-class',
};

describe('test button component', () => {
  // 是否能正确渲染默认按钮
  test('should render the correct default button', () => {
    const wrapper = render(<Button {...defaultProps}>Default Button</Button>);
    const element = wrapper.getByText('Default Button') as HTMLButtonElement;
    expect(element).toBeInTheDocument;
    expect(element.tagName).toBe('BUTTON');
    expect(element.className).toBe('w-btn w-btn-default w-btn-sm');
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled;
    expect(element.disabled).toBeFalsy();
  });

  // 是否能基于不同的 props 渲染按钮
  test('should render the correct component based diffreent props', () => {
    const wrapper = render(<Button {...testProps}>button</Button>);
    const element = wrapper.getByText('button');
    expect(element).toBeInTheDocument;
    expect(element.className).toEqual(
      'w-btn test-class w-btn-primary w-btn-lg'
    );
  });

  // 当 btnType = 'link' 且设置了 href 属性时，是否能正确渲染出一个 a 链接
  test('should render a link when btnType equals link and href is provided', () => {
    const wrapper = render(
      <Button btnType={ButtonType.Link} href="http://www.baidu.com">
        Link
      </Button>
    );
    const element = wrapper.getByText('Link');
    expect(element).toBeInTheDocument;
    expect(element.tagName).toBe('A');
    expect(/w-btn w-btn-link/.test(element.className)).toBeTruthy();
  });

  // 当设置了 disabled = true 时，是否能正确渲染出一个 disabled button
  test('should render a disabled button when disabled set to true', () => {
    const wrapper = render(
      <Button disabled {...defaultProps}>
        Disabled Button
      </Button>
    );
    const element = wrapper.getByText('Disabled Button') as HTMLButtonElement;
    expect(element).toBeInTheDocument;
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(defaultProps.onClick).not.toHaveBeenCalled;
  });
});
