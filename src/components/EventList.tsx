'use client'

import { useState, useEffect } from 'react'
import { EventCard } from './EventCard'
import { ErrorComponent } from './ErrorComponent'
import styled from 'styled-components'

const StyledBox = styled.section`
    text-align: center;
`

export function EventList() {
    const [events, setevents] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        setIsLoading(true)
        // getevents(events in upcoming month)
        // .then(events => {
        //     setevents(events)
        //     setIsLoading(false)
        // })
        // .catch(err => {
        //     setIsLoading(false)
        //     setError(err)
        // })
    }, [])

    return (
        error ? <ErrorComponent status={500} msg={error.message} /> :
        <StyledBox>
            {isLoading && <p>Loading...</p>}
            <ul>
                {events.map(event => {
                    return <EventCard key={'event.event_id'} event={event}/>
                })}
            </ul>
        </StyledBox>
    )
}