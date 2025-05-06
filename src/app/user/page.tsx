'use client'

import ManageAccount from "@/components/ManageAccount";
import ManageEvents from "@/components/ManageEvents";
import PageWrapper from "@/components/PageWrapper";
import { StyledHeading } from "@/components/styled-components/StyledHeading";

export default function Home() {
    
  	return (
    	<>
            <PageWrapper>
                <StyledHeading>
                    Manage Account
                </StyledHeading>
                <ManageAccount/>
                
                <StyledHeading>
                    Manage Events
                </StyledHeading>
                <ManageEvents/>
            </PageWrapper>
    	</>
  	)
}