import { Story, Meta, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import Button,  { ButtonProps } from './button';

addDecorator(withInfo);

export default {
  title: 'Button 按钮',
  component: Button,
  argTypes: {
    backgroundcolor: { control: 'color' },
  },
  parameters: {
    info: {
      text: `
        按钮用于开始一个即时操作。
        ### 使用方式
        ~~~js
          import Button from 'wui';
        ~~~
      `
    },
  }
} as Meta
const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Btn = Template.bind({});
Btn.storyName = 'Button';
Btn.args = {
  btnType: 'primary',
  children: 'Button',
  onClick: action('clicked')
};

/* export const Default = Template.bind({});
Default.args = {
  btnType: ButtonType.Default,
  children: 'Default Button',
};

export const Danger = Template.bind({});
Danger.args = {
  btnType: ButtonType.Danger,
  children: 'Danger Button',
};

export const Link = Template.bind({});
Link.args = {
  href: "https://www.github.com",
  btnType: ButtonType.Link,
  children: 'Link Button',
};

export const Large  = Template.bind({});
Large.args = {
  btnType: ButtonType.Primary,
  size: ButtonSize.Large,
  children: 'Large Button',
};

export const Disabled  = Template.bind({});
Disabled.args = {
  disabled: true,
  children: 'Disabled Button',
}; */

