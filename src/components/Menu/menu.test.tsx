import React from 'react';
import {
  fireEvent,
  render,
  RenderResult,
  cleanup,
} from '@testing-library/react';

import Menu, { MenuProps } from './menu';
import MenuItem from './menu';

const testProps: MenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: 'test',
};

const testVerProps: MenuProps = {
  defaultIndex: 0,
  mode: 'vertical',
};

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem index={0}>active</MenuItem>
      <MenuItem index={1} disabled>
        disabled
      </MenuItem>
      <MenuItem index={2}>xyz</MenuItem>
    </Menu>
  );
};

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disablaedElement: HTMLElement;

describe('test Menu and MenuItem component', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps));
    menuElement = wrapper.getByTestId('test-menu');
    activeElement = wrapper.getByText('active');
    disablaedElement = wrapper.getByText('disabled');
  });

  test('should render correct Menu and MenuItem based on default Props', () => {
    expect(menuElement).toBeInTheDocument;
    expect(/w-menu test/.test(menuElement.className)).toBe(true);
    expect(menuElement.getElementsByTagName('li').length).toBe(3);
    expect(/w-menu-item is-active/.test(activeElement.className)).toBe(true);
    expect(/w-menu-item is-disabled/.test(disablaedElement.className)).toBe(
      true
    );
  });

  test('click items should change active and call this right callback', () => {
    const thirdItem = wrapper.getByText('xyz');
    fireEvent.click(thirdItem);
    expect(/is-active/.test(thirdItem.className)).toBe(true);
    expect(/is-active/.test(activeElement.className)).not.toBe(true);
    expect(testProps.onSelect).toHaveBeenLastCalledWith(2);
    fireEvent.click(disablaedElement);
    expect(/is-active/.test(disablaedElement.className)).not.toBe(true);
    expect(testProps.onSelect).not.toHaveBeenNthCalledWith(1);
    expect(/is-active/.test(thirdItem.className)).toBe(true);
  });

  test('should render vertical mode when mode is set to vertical', () => {
    cleanup();
    const wrapper = render(generateMenu(testVerProps));
    const menuElement = wrapper.getByTestId('test-menu');
    expect(/w-menu-vertical/.test(menuElement.className)).toBe(true);
  });
});
