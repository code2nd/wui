import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Button, ButtonProps } from './Button';

export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;


export const Primary: React.VFC<{}> = () => <Button label="Button" />;
export const Secondary: React.VFC<{}> = () => <Button label="😄👍😍💯" />;
export const Tertiary: React.VFC<{}> = () => <Button label="📚📕📈🤓" />;

/* export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
};

export const MyButton = Template.bind({});
MyButton.args = {
  primary: true,
  size: 'small',
  label: 'Button',
}; */

