'use client'

import { useState, useEffect } from 'react'
import { EventCard } from './EventCard'
import { ErrorComponent } from './ErrorComponent'
import styled from 'styled-components'
import { getEvents } from '@/lib/api/events'
import { AxiosError } from 'axios'
import type { Event } from "@/types/event"

const StyledBox = styled.div`
    display: grid;
	background: ${props => props.theme.colours.primary};
	border-radius: 12px;
	box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
	width: 90vw;
`

const StyledList = styled.ul`
    list-style: none;
    padding: 0;
`

export function EventList() {
    const [events, setEvents] = useState<Event[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    async function showUpcomingEvents() {
        try {
            setIsLoading(false)
            const upcomingeEvents = await getEvents({})
            setEvents(upcomingeEvents)

        } catch (err: unknown) {
            if (err instanceof AxiosError)
                setError(`${err.response?.data.msg}\nPlease try again`)

        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        showUpcomingEvents()
    }, [])

    return (
        <StyledBox>
           { error ? <ErrorComponent msg={error} /> :
            <StyledList>
                {isLoading && <p>Loading...</p>}
                    {events.map(event => {
                        return <EventCard key={'event.event_id'} event={event}/>
                    })}
            </StyledList>
            }
        </StyledBox>
    )
}