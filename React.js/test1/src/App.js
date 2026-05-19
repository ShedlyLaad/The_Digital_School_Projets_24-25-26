import React from 'react';
import styled from "styled-components";
import Helloworld from './Hellome.js';
import Para1 from './Para1';
import ContactForm from'./Form.js';

const StyledT1 = styled.h1`
    color: #ffffff;
    font-size: ${16 * 1.5}px;
    background-color: red;
    text-align: center;
    .upper {
      color : green;
        text-transform: uppercase;
    }
    font-family: Arial, sans-serif;
`;

function App() {
    return (
        <div className="App">
            <Helloworld StyledT1={StyledT1} />
            <Para1 StyledT1={StyledT1} />
            <ContactForm/>
        </div>
    );
}
export default App;
