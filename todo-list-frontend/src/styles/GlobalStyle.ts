// /src/styles/GlobalStyle.ts

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Arial, sans-serif;
    background-color: #f0f2f5;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  * {
    box-sizing: border-box;
  }

  h1 {
    text-align: center;
  }

  button {
    cursor: pointer;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

export default GlobalStyle;
