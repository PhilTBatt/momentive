import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import ModalBackground from "../styled-components/ModalBackground";
import StyledModal from "../styled-components/StyledModal";
import { Event } from "@/types/event";
import ModalHeading from "../styled-components/ModalHeading";

const Modal = styled(StyledModal)`
    @media (min-width: 768px) {
        width: 30vw;
    }
`

const Heading = styled(ModalHeading)`
    @media (min-width: 768px) {
        margin-bottom: 3vh;
    }
`

const CalendarImage = styled.img`
    border-radius: 6px;
    border: 2px solid white;
    width: 60vw;
    margin-top: 3vw;
    margin-bottom: 5vw;

    @media (min-width: 768px) {
        width: 17.5vw;
        margin: 0vh auto 2vh auto
    }
`;

export function AddEventToCalender({event, setIsModalOpen}: 
    {event: Event, setIsModalOpen: Dispatch<SetStateAction<boolean>>}) 
{
    const duration =  60

    const startDateTime = new Date(event.date).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"

    const endDateTime = new Date(new Date(event.date).getTime() + duration * 60 * 1000)
        .toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"

    const googleCalendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDateTime}/${endDateTime}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`

    const outlookCalendarLink = `https://outlook.live.com/calendar/0/action/compose?allday=false&body=${encodeURIComponent(event.description)}&enddt=${endDateTime}&location=${encodeURIComponent(event.location)}&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=${startDateTime}&subject=${encodeURIComponent(event.title)}`

    return (
        <ModalBackground onClick={() => setIsModalOpen(false)}>
            <Modal onClick={e => e.stopPropagation()}>
                <Heading>
                    Add this event to your calendar?
                </Heading>

                <a href={googleCalendarLink} target="_blank" rel="noopener noreferrer" title="Add To Google Calendar">
                    <CalendarImage src="https://img.shields.io/badge/Google%20Calendar-FF7A00?style=for-the-badge&logoColor=white"
                        alt="Google Calendar"/>
                </a>

                <a href={outlookCalendarLink} target="_blank" rel="noopener noreferrer" title="Add To Outlook Calendar">
                    <CalendarImage src="https://img.shields.io/badge/Outlook%20Calendar-FF7A00?style=for-the-badge&logoColor=white"
                        alt="Outlook Calendar"/>
                </a>
            </Modal>
        </ModalBackground>
    )
}
