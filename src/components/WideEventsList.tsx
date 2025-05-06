'use client'

import { useState, useEffect } from 'react'
import { EventCard } from './EventCard'
import { ErrorComponent } from './ErrorComponent'
import styled from 'styled-components'
import { getEvents } from '@/lib/api/events'
import { AxiosError } from 'axios'
import type { Event } from "@/types/event"
import { StyledCard } from './styled-components/StyledCard'

const ThinStyledCard = styled(StyledCard)`
    @media (min-width: 768px) {
        width: 65vw;
        padding: 0vh 0vw;
    }
`

const StyledList = styled.ul`
    list-style: none;
    padding: 2vw 1vw;
    margin: 1vw;

    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        place-items: center;
        padding: 1vh 0vw;
        gap: 1vw;
    }
`

export function WideEventsList({ sortBy, order, userId, topic }: { sortBy: string, order: 'DESC' | 'ASC', userId?: number, topic?: string }) {
    const [events, setEvents] = useState<Event[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    async function showEvents() {
        try {
            setIsLoading(true)
            const upcomingeEvents = await getEvents({sortBy, order, userId, topic})
            setEvents(upcomingeEvents)

        } catch (err: unknown) {
            if (err instanceof AxiosError)
                setError(`${err.response?.data.msg}\nPlease try again`)

        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        showEvents()
    }, [sortBy, order, topic])

    return (
        <ThinStyledCard>
           { error ? <ErrorComponent msg={error} /> :
            <StyledList>
                {isLoading && <p>Loading...</p>}
                    {events.map( event =>  <EventCard event={event} key={event.id} updateList={showEvents}/> )}
            </StyledList>
            }
        </ThinStyledCard>
    )
}