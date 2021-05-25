import { addDecorator } from '@storybook/react';
import '../src/styles/index.scss';

const wrapperStyle = {
  padding: '0 40px'
}

const storyWrapper = (Story) => (
  <div style={wrapperStyle}>
    <h3>组件演示</h3>
    { Story() }
  </div>
)

addDecorator(storyWrapper);

export const parameters = {
  info: {
    inline: true
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}