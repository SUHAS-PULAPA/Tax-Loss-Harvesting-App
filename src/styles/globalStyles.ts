import { createGlobalStyle, type DefaultTheme } from "styled-components";

export const theme = {
  bg: "#ffffff",
  text: "#000000",
};

export const myTheme: DefaultTheme = {
    bg: "#ffffff",
    text: "#000000",
    card: "",
    border: ""
};

declare module "styled-components" {
  export interface DefaultTheme {
    bg: string;
    text: string;
    card: string;
    border: string;
  }
}

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: Inter, sans-serif;
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};
  }
`;