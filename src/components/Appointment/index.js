import React, { Fragment } from 'react'
import 'components/Appointment/styles.scss'
import Form from './Form'
import Show from './Show'
import Header from './Header'
import Empty from './Empty'
import Button from '../Button'

export default function Appointment(props){
   
    console.log(props)
    return (
        
        <article className="appointment">
        <Header time={props.time}/>
        {props.interview ? <Show name={props.interview.student} interviewer={props.interview.interviewer}/>:<Empty /> }
        </article>
        
        
    )
}