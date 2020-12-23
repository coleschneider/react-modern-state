import { FC } from "react";
import DefaultLayout from "layouts/DefaultLayout";

const App: FC = ({ children }) => (
  <DefaultLayout name="apollo" primaryColor="#764abc" secondaryColor="#ca2929">
    {children}
  </DefaultLayout>
);

export default App;
