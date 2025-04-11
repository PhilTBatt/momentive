'use client'

import styled from "styled-components";

const StyledHeader = styled.header`
  padding: 1vw;
  background: ${props => props.theme.colours.primary};
  color: ${props => props.theme.colours.background};
  text-align: center;
  font-size: 20vw
`

export default function Header() {
  return <StyledHeader>Momentive</StyledHeader>
}