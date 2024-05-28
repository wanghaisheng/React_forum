import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  
  body {
    font-family: 'Roboto', sans-serif;
    height: 100vh;
    background-color: ${props => props.theme.colors.background};
  }

  #root {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;