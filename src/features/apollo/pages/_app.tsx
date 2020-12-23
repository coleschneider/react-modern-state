import { FC } from "react";
import DefaultLayout from "layouts/DefaultLayout";

const App: FC = ({ children }) => (
  <DefaultLayout name="apollo" primaryColor="#112B49" secondaryColor="#ca7d29">
    {children}
  </DefaultLayout>
);

export default App;
