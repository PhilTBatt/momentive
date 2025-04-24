'use client'

import styled from "styled-components";

const StyledHeader = styled.header`
    position: fixed;
    top: 0;
    width: 100%;
  	padding: 0vw;
  	background: ${props => props.theme.colours.primary};
  	color: ${props => props.theme.colours.background};
  	text-align: center;
  	font-size: 17vw;
  	box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  	z-index: 100;
  	text-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2);
  	border-radius: 1vw;
`

export default function Header() {
  	return <StyledHeader>Momentive</StyledHeader>
}