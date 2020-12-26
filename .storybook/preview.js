import AppWrapper from "AppWrapper";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const decorators = [
  (Story) => (
    <AppWrapper>
      <Story />
    </AppWrapper>
  ),
];
