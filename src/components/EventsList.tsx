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
        width: 26vw;
        padding: 0vh 0vw;
        margin: 0 3vw 1vh 3vw;
        align-self: flex-start;
    }
`

const StyledList = styled.ul`
    list-style: none;
    padding: 2vw 1vw;
    margin: 1vw;
    margin-top: 2vh;

    @media (min-width: 768px) {
        display: grid;
        place-items: center;
        padding: 1vh 0vw 1vh 0vw;
    }
`

const StyledButton = styled(BlockButton)`
    @media (min-width: 768px) {
        margin: -1vh auto 2vh auto;
    }
`

export function EventsList({ sortBy, order, userId, topic }: { sortBy: string, order: 'DESC' | 'ASC', userId?: number, topic?: string }) {
    const [events, setEvents] = useState<Event[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [limit, setLimit] = useState(5)
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
        setLimit(5)
        showEvents(5)
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