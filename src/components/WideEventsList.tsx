'use client'

import { useState, useEffect } from 'react'
import { EventCard } from './EventCard'
import { ErrorComponent } from './ErrorComponent'
import styled from 'styled-components'
import { getEvents } from '@/lib/api/events'
import { AxiosError } from 'axios'
import type { Event } from "@/types/event"
import { StyledCard } from './styled-components/StyledCard'
import { BlockButton } from './styled-components/BlockButton'

const ThinStyledCard = styled(StyledCard)`
    @media (min-width: 768px) {
        width: 76vw;
        padding: 0vh 0vw;
    }
`

const StyledList = styled.ul`
    list-style: none;
    padding: 2vw 1vw;
    margin: 1vw;

    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        place-items: center;
        margin: 0.25vw;
        padding: 2vh 0vw;
        gap: 0.5vw 0;
        align-self: flex-start;
    }
`

const StyledButton = styled(BlockButton)`
    @media (min-width: 768px) {
        margin: -2vh auto 4vh auto;
    }
`

export function WideEventsList({ sortBy, order, userId, topic }: { sortBy: string, order: 'DESC' | 'ASC', userId?: number, topic?: string }) {
    const [events, setEvents] = useState<Event[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [limit, setLimit] = useState(9)
    const [hasMore, setHasMore] = useState(false)

async function showEvents(limit: number) {
        try {
            setIsLoading(true)
            const allEvents = await getEvents({ sortBy, order, userId, topic, limit: limit + 1 })
            const now = new Date()
            const upcomingEvents = allEvents.filter(event => (new Date(event.date)).getTime() >= now.getTime())

            if (upcomingEvents.length > limit) 
                setHasMore(true)
            else
                setHasMore(false)

            setEvents(upcomingEvents.slice(0, limit))

        } catch (err: unknown) {
            if (err instanceof AxiosError)
                setError(`${err.response?.data.msg}\nPlease try again`)

        } finally {
            setIsLoading(false)
        }
    }

    function loadMore() {
        const newLimit = limit + 5
        setLimit(newLimit)
        showEvents(newLimit)
    }

    useEffect(() => {
        setLimit(9)
        showEvents(9)
    }, [sortBy, order, topic])

    return (
        <ThinStyledCard>
           { error ? <ErrorComponent msg={error} /> :
            <>
                <StyledList>
                    {isLoading && <p>Loading...</p>}
                        {events.map( event =>  <EventCard event={event} key={event.id} updateList={() => showEvents(limit)}/> )}
                </StyledList>
                
                {hasMore && !isLoading && (
                    <StyledButton onClick={loadMore}>
                        Load More
                    </StyledButton>
                )}
            </>
            }
        </ThinStyledCard>
    )
}