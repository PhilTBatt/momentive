import styled from "styled-components";

const StyledInput = styled.input`
    font-size: 6vw;
    margin: 0;
    width: 70vw;
    margin: 2vw auto 4vw auto;
    border: 2px solid black;
    border-radius: 4px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

    @media (min-width: 768px) {
        font-size: 1.25vw;
        width: 20vw;
        margin: 2vh auto 3vh auto;
    }
`

export default StyledInput;