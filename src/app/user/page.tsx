'use client'

import ManageAccount from "@/components/ManageAccount";
import ManageEvents from "@/components/ManageEvents";
import PageWrapper from "@/components/PageWrapper";
import { StyledHeading } from "@/components/styled-components/StyledHeading";
import styled from "styled-components";

const Heading1 = styled(StyledHeading)`
    font-size: 11vw;
    margin-bottom: 1.5vh;

    @media (min-width: 768px) {
        font-size: 4vw;
        margin-top: 1vh;
    }
`

const Heading2 = styled(StyledHeading)`
    font-size: 11vw;
    margin-bottom: 1.5vh;
    margin-top: 2.5vh;

    @media (min-width: 768px) {
        font-size: 4vw;
        margin-top: 8vh;
    }
`

export default function Home() {
    
  	return (
    	<>
            <PageWrapper>
                <Heading1>
                    Manage Account
                </Heading1>
                <ManageAccount/>

                <Heading2>
                    Manage Events
                </Heading2>
                <ManageEvents/>
            </PageWrapper>
    	</>
  	)
}