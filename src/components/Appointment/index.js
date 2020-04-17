import React, { Fragment } from 'react'
import 'components/Appointment/styles.scss'
import Form from './Form'
import Show from './Show'
import Header from './Header'
import Empty from './Empty'
import Button from '../Button'

export default function Appointment(props){
  
    console.log('props',props)
    return (
        
        <article className="appointment">
        <Header time={props.time}/>
        {props.interview && props.interview.interviewer ? <Show studentName={props.interview.student} interviewerName={props.interview.interviewer.name}/>:<Empty /> }
        </article>
        
        
    )
}