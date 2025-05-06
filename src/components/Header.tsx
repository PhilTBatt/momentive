'use client'

import styled from "styled-components";

const StyledHeader = styled.img`
    position: fixed;
    left: -12%;
    top: 0;
    width: 130vw;
    height: 12vh;
    padding: 0vw;
    object-fit: cover;
    box-sizing: border-box;
    z-index: 10;
    filter: brightness(125%);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    border-bottom: 2px solid black;

    @media (min-width: 768px) {
        width: 81.2vw;
        height: 18vh;
        left: 18%;
        border: 4px solid white;
        border-left: 0;
    }
`

export default function Header() {
  	return <StyledHeader src='images/momentive-banner.png' alt='Momentive Banner' />
}