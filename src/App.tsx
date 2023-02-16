import { memo } from "react";
import GlobalStyles from "./globalStyles";
import MonacoWrapper from "./MonacoWrapper";

function App() {
  return (
    <>
      <GlobalStyles />
      <MonacoWrapper />
    </>
  );
}

export default memo(App);
