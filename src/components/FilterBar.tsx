'use client'

import { topics } from '@/lib/topics'
import { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'

const StyledCard = styled.div`
    background: ${props => props.theme.colours.secondary};
    border-radius: 12px;
    border: 2px solid ${props => props.theme.colours.primary};
    padding: 0.5vw 1.5vw;
    margin-bottom: 4vw;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
`

const Label = styled.label`
    font-size: 3.75vw;
`

const Select1 = styled.select`
    background: ${props => props.theme.colours.secondary};
    border: 1px solid ${props => props.theme.colours.primary};
    width: 16vw;
    padding: 0.5vw 0vw 0.5vw 0.5vw;
    margin: 1vw;
    margin-right: 2vw;
    border-radius: 8px;
    font-size: 3.25vw;
`
const Select2 = styled(Select1)`
    width: 21vw;
    margin-right: 0;
`
const Select3 = styled(Select1)`
    width: 9vw;
    margin-right: 0;
`

export function FilterBar({ topic, setTopic, sortBy, setSortBy, order, setOrder }:
    { topic: string, setTopic: Dispatch<SetStateAction<string>>, sortBy: string,
        setSortBy: Dispatch<SetStateAction<string>>, order: 'DESC' | 'ASC', setOrder: Dispatch<SetStateAction<'DESC' | 'ASC'>> }
) {
    const sortByOptions = ['title', 'date', '"createdBy"', 'location', 'topic', 'attendees']
    const CorrectSortByOptions = ['Title', 'Date', 'Host', 'Location', 'Topic', 'Attending' ]

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

            <Label htmlFor="sort-by-select">Sort by:</Label>
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