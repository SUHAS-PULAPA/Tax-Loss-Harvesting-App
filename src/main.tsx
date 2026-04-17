import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/theme";
import { GlobalStyle } from "./styles/globalStyles";
import { useState } from "react";

const Root = () => {
  const [dark, setDark] = useState(false);

  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <App dark={dark} setDark={setDark} />
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);