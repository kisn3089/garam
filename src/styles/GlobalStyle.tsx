import React from "react";
import { createGlobalStyle, keyframes } from "styled-components";

const Ani = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        padding: 0;
    }

    /* canvas {
        touch-action: none;
        animation: ${Ani} 5s ease 0.5s forwards;
    } */

    input {
        width: 100px;
        border: none;
        background-image: none;
        background-color: transparent;
        color: transparent;
        caret-color: #848484;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        font-weight: 400;
        caret-color: transparent;
        outline: 0;
    }

`;
