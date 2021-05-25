module.exports = {
  stories: [
    "../src/components/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app"
  ],
  loaders: [
    {
      loader: require.resolve("react-docgen-typescript-loader"),
      options: {
        shouldExtractLiteralValuesFromEnum: true,
        propFilter: (prop) => {
          if (prop.parent) {
            return !prop.parent.fileName.includes('node_modules');
          }

          return true;
        }
      }
    }
  ]
}