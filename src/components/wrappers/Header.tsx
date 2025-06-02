'use client'

import styled from "styled-components";

const StyledHeader = styled.img`
    position: fixed;
    top: 0;
    left: -12%;
    width: 130vw;
    height: 12vh;
    object-fit: cover;
    box-sizing: border-box;
    filter: brightness(125%);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    border-bottom: 1px solid black;
    z-index: 10;

    @media (min-width: 768px) {
        left: 18%;
        width: 41.2vw;
        height: 18vh;
        box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.3);
        border: 4px solid white;
        border-left: none;
        border-right: none;
    }
`

const FillerBox = styled.div`
    display: none;

    @media (min-width: 768px) {
        display: block;
        position: fixed;
        height: 16.9vh;
        width: 39.8vw;
        top: 0;
        right: 0;
        z-index: 11;
        box-shadow: 14px 4px 12px rgba(0, 0, 0, 0.3);
        background-color: ${props => props.theme.colours.primary}; /* Replace with the actual background color */
        border: 4px solid white;
        border-left: none;
    }
`

export default function Header() {
  return (
      <>
        <StyledHeader src="images/momentive-banner.png" alt="Momentive Banner" />
        <FillerBox />
      </>
  )
}