'use client'

import styled from 'styled-components'

export const StyledButton = styled.button`
    font-size: 6.25vw;
    padding: 0.25vh 1.5vw 0.35vh 1.5vw;
    margin-top: 0.25vw;
    vertical-align: top;
    border-radius: 6px;
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.15);
    cursor: pointer;

    @media (min-width: 768px) {
        font-size: 1.1vw;
        margin-top: 0.2vh;
        border-radius: 1vw;
    }
`