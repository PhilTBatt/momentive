import styled from "styled-components";

const StyledModal = styled.div`
    text-align: center;
    background: ${props => props.theme.colours.primary};
    padding: 0.4vh 3vw;
    margin-bottom: 7.5vh;
    border-radius: 12px;
    border: 1px solid black;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
    width: 90vw;
    z-index: 101;

    @media (min-width: 768px) {
        width: 22.5vw;
        margin-bottom: 0vh;
    }
`

export default StyledModal;
