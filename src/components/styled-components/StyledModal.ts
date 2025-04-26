import styled from "styled-components";

const StyledModal = styled.div`
    background: ${props => props.theme.colours.primary};
    padding: 1vh 1vw;
    border-radius: 12px;
    border: 2px solid black;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
    width: 90vw;
    align-items: center;
    justify-content: center;
    text-align: center;
    z-index: 101;
`

export default StyledModal;
