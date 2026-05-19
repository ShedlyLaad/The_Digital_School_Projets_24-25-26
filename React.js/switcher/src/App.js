import './App.css';
import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Switch from "./switch.js";
const GlobalStyle = createGlobalStyle`
body {
  background-color: ${props => (props.isDarkMode ? "#000000" : "#ffffff")};
  color: ${props => (props.isDarkMode ? "#ffffff" : "#000000")};
}
`;

const AppContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
`;

const App = () => {
const [isDarkMode, setIsDarkMode] = React.useState(false);

const toggleDarkMode = () => {
  setIsDarkMode(!isDarkMode);
};

return (
  <React.Fragment>
    <GlobalStyle isDarkMode={isDarkMode} />
    <AppContainer>
      <Switch />
    </AppContainer>
  </React.Fragment>
);
};

export default App;