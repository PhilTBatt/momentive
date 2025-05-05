'use client'

import styled from "styled-components";

const StyledHeader = styled.img`
    position: fixed;
    left: 50%;
    top: 0;
    transform: translateX(-48%);
    width: 130vw;
  	padding: 0vw;
    height: 12vh;
    object-fit: cover;
    border: 2px solid black;
    box-sizing: border-box;
    z-index: 10;
    filter: brightness(120%);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`

export default function Header() {
  	return <StyledHeader src='images/momentive-banner.png' alt='Momentive Banner' />
}