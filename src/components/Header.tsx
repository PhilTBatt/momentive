'use client'

import styled from "styled-components";

const StyledHeader = styled.img`
    position: fixed;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    width: 120vw;
  	padding: 0vw;
    height: 12vh;
    object-fit: cover;
    border: 2px solid black;
    box-sizing: border-box;
    z-index: 10;
    filter: brightness(120%);
`

export default function Header() {
  	return <StyledHeader src='images/momentive-banner.png' alt='Momentive Banner' />
}