import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Toggle from "react-toggle";
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const MoonIcon = styled.span`
  font-size: 24px;
  margin-right: 10px;
`;

const SunIcon = styled.span`
  font-size: 24px;
  margin-left: 10px;
`;

const Switch = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Container>
      <MoonIcon>🌙</MoonIcon>
      <Toggle
        defaultChecked={isDarkMode}
        icons={{ checked: null, unchecked: null }}
        onChange={toggleDarkMode}
        aria-label="Dark mode toggle"
      />
      <SunIcon>☀️</SunIcon>
    </Container>
  );
};
Switch.propTypes = {
  isDarkMode: PropTypes.bool,
  setIsDarkMode: PropTypes.func.isRequired,
};

export default Switch;