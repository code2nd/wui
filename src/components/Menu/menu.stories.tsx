import { Story, Meta } from '@storybook/react';

import Menu, { MenuProps } from './menu';
import SubMenu from './subMenu';
import MenuItem from './menuItem';

export default {
  title: 'Menu 导航菜单',
  component: Menu,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<MenuProps> = (args) => 
  <Menu {...args}>
    <MenuItem index="0">active</MenuItem>
    <MenuItem index="1" disabled>
      disabled
    </MenuItem>
    <MenuItem index="2">other</MenuItem>
    <SubMenu index="3" title="dropdown">
      <MenuItem index="3-1">dropdown1</MenuItem>
      <MenuItem index="3-2">dropdown2</MenuItem>
      <MenuItem index="3-3">dropdown3</MenuItem>
    </SubMenu>
  </Menu>;

export const MyMenu = Template.bind({});
MyMenu.storyName = 'Menu';
MyMenu.args = {
  defaultIndex: '0',
  mode: 'horizontal'
};

/* const Template: Story<MenuProps> = (args) => <Menu {...args} >
  <MenuItem index="0">Navigation One</MenuItem>
  <MenuItem index="1" disabled>
    Navigation One
  </MenuItem>
  <MenuItem index="2">Navigation Three</MenuItem>
</Menu>;

export const Horizontal = Template.bind({});
Horizontal.args = {
  mode: 'horizontal',
  
}; */

