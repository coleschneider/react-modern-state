import { FC } from "react";
import DefaultLayout from "layouts/DefaultLayout";

const App: FC = ({ children }) => (
  <DefaultLayout name="apollo" primaryColor="#de5c16" secondaryColor="#2985ca">
    {children}
  </DefaultLayout>
);

export default App;
