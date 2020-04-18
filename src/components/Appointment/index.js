import React, { Fragment } from 'react'
import 'components/Appointment/styles.scss'
import Form from './Form'
import Show from './Show'
import Header from './Header'
import Empty from './Empty'
import Button from '../Button'
import useVisualMode from 'hooks/useVisualMode'

export default function Appointment(props){
    const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";



const { mode, transition, back } = useVisualMode(
  props.interview ? SHOW : EMPTY
);
const onAdd = ()=>{
    transition(CREATE)
}
const onCancel = () =>{
    transition(back)
}
    return (


        
        <article className="appointment">
        <Header time={props.time}/>
        {mode === EMPTY && <Empty onAdd={onAdd} />}
        {mode === SHOW && (
            <Show
                studentName={props.interview.student}
                interviewerName={props.interview.interviewer.name}
            />
        )}
        {mode === CREATE && <Form onCancel ={onCancel} interviewers={props.interviewers}/>}
        </article>
        
        
    )
}