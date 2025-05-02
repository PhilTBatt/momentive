import { UserContext } from "@/contexts/User";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import styled from "styled-components";
import ModalBackground from "../styled-components/ModalBackground";
import StyledModal from "../styled-components/StyledModal";
import { BlockButton } from "../styled-components/BlockButton";
import { Event } from "@/types/event";
import { UserModal } from "./UserModal";

const StyledHeading = styled.h3`
  	text-align: center;
  	font-size: 8vw;
    margin: 2vw 0 3vw 0;
`

export function AddEventToCalender({event, setIsModalOpen}: 
    {event: Event, setIsModalOpen: Dispatch<SetStateAction<boolean>>}) 
{
    const duration =  60

    const startDateTime = new Date(event.date).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"

    const endDateTime = new Date(new Date(event.date).getTime() + duration * 60 * 1000)
        .toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"

    const googleCalendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDateTime}/${endDateTime}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;

    const outlookCalendarLink = `https://outlook.live.com/calendar/0/action/compose?allday=false&body=${encodeURIComponent(event.description)}&enddt=${endDateTime}&location=${encodeURIComponent(event.location)}&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=${startDateTime}&subject=${encodeURIComponent(event.title)}`;

    return (
        <ModalBackground onClick={() => setIsModalOpen(false)}>
            <StyledModal onClick={e => e.stopPropagation()}>
                <StyledHeading>
                    Add this event to your calendar?
                </StyledHeading>

                <a href={googleCalendarLink} target="_blank" rel="noopener noreferrer" title="Add To Google Calendar">
                    <img src="https://img.shields.io/badge/Google%20Calendar-FF7A00?style=for-the-badge&logoColor=white"
                        alt="Google Calendar" style={{ borderRadius: '6px', margin: '2vw', border: '2px solid white'  }}/>
                </a>

                <a href={outlookCalendarLink} target="_blank" rel="noopener noreferrer" title="Add To Outlook Calendar">
                    <img src="https://img.shields.io/badge/Outlook%20Calendar-FF7A00?style=for-the-badge&logoColor=white"
                    alt="Outlook Calendar" style={{ borderRadius: '6px', margin: '2vw', border: '2px solid black'  }}/>
                </a>
            </StyledModal>
        </ModalBackground>
    )
}
