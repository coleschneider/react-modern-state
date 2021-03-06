import { muiTheme } from "storybook-addon-material-ui";
import AppWrapper from "AppWrapper";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const decorators = [
  muiTheme(),
  (Story) => (
    <AppWrapper>
      <Story />
    </AppWrapper>
  ),
];
