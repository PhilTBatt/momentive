'use client'

import { topics } from '@/lib/topics'
import { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import { EventCard } from './EventCard'

const StyledCard = styled.div`
    background-color: ${props => props.theme.colours.background};
    border-radius: 12px;
    border: 2px solid ${props => props.theme.colours.secondary};
    padding: 0vw 2vw;
    margin-bottom: 3vw;
`

const Label = styled.label`
`

const Select1 = styled.select`
    width: 17vw;
    padding: 1vw 0vw 1vw 0.5vw;
    margin: 1vw;
    margin-right: 2vw;
    border-radius: 8px;
    border: 1px solid #ccc;
`
const Select2 = styled(Select1)`
    width: 19vw;
    margin-right: 0;
`
const Select3 = styled(Select1)`
    width: 7vw;
`

export function FilterBar({ topic, setTopic, sortBy, setSortBy, order, setOrder }:
    { topic: string, setTopic: Dispatch<SetStateAction<string>>, sortBy: string,
        setSortBy: Dispatch<SetStateAction<string>>, order: 'DESC' | 'ASC', setOrder: Dispatch<SetStateAction<'DESC' | 'ASC'>> }
) {
    const sortByOptions = ['title', 'date', '"createdBy"', 'location', 'topic', 'attendees']
    const CorrectSortByOptions = ['Title', 'Date', 'Host', 'Location', 'Topic', 'Attendees' ]

    return (
        <StyledCard>
            <Label htmlFor="topic-select">Filter by topic:</Label>
            <Select1 id="topic-select" value={topic} onChange={e => setTopic(e.target.value)}>
                <option value="">All</option>
                {Object.keys(topics).map((key) => (
                    <option key={key} value={key}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                    </option>
                ))}
            </Select1>

            <label htmlFor="sort-by-select">Sort by:</label>
            <Select2 id="sort-by-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                {sortByOptions.map( sortBy => <option value={sortBy} key={sortByOptions.indexOf(sortBy)}>
                    {CorrectSortByOptions[sortByOptions.indexOf(sortBy)]}
                </option>)}
            </Select2>
            
            <Select3 value={order} onChange={e => {
                if (e.target.value === 'ASC' || e.target.value === 'DESC')
                    setOrder(e.target.value)
            }}>
                <option value="ASC">↑</option>
                <option value="DESC">↓</option>
            </Select3>
        </StyledCard>
    )
}