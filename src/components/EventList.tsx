'use client'

import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { EventCard } from './EventCard'
import { ErrorComponent } from './ErrorComponent'
import styled from 'styled-components'
import { getEvents } from '@/lib/api/events'
import { AxiosError } from 'axios'
import type { Event } from "@/types/event"
import { StyledCard } from './styled-components/StyledCard'

const StyledList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 1vw;
`

export function EventList({ events, setEvents, sortBy, order, userId, topic }: { events: Event[], 
    setEvents: Dispatch<SetStateAction<Event[]>>, sortBy: string, order: 'DESC' | 'ASC', userId?: number, topic?: string }
) {
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
        <StyledCard>
           { error ? <ErrorComponent msg={error} /> :
            <StyledList>
                {isLoading && <p>Loading...</p>}
                    {events.map( event =>  <EventCard event={event} key={event.id}/> )}
            </StyledList>
            }
        </StyledCard>
    )
}