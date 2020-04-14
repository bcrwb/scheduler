import React from 'react'
import DayListItem from './DayListItem'


export default function DayList({days,day,setDay}){
   const daysCopy = days.map(dayy => {
    return <DayListItem 
    key = {dayy.id}
    name={dayy.name} 
    spots={dayy.spots} 
    selected={dayy.name === day}
    setDay={setDay}  />
    
})
return <ul>
    {daysCopy}
    </ul>
}