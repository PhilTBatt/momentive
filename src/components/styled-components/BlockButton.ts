'use client'

import styled from 'styled-components'

export const BlockButton = styled.button`
    font-size: 6.5vw;
    margin: 3vw auto 3vw auto;
    padding: 0.65vh 2vw 0.5vh 2vw;
    border: 2px solid black;
    border-radius: 6px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    cursor: pointer;

    @media (min-width: 768px) {
        font-size: 1.9vw;
        margin: 0vh auto 4vh auto;
        border-radius: 1vw;
    }
`