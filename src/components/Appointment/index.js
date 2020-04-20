import React, { Fragment } from 'react'
import 'components/Appointment/styles.scss'
import Form from './Form'
import Show from './Show'
import Header from './Header'
import Empty from './Empty'
import Button from '../Button'
import useVisualMode from 'hooks/useVisualMode'
import Status from './Status'
import Confirm from './Confirm'
import Error from './Error'

export default function Appointment(props){
    const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';
const ERROR_SAVE = 'ERROR_SAVE'
const ERROR_DELETE = 'ERROR_DELETE'



const { mode, transition, back } = useVisualMode(
  props.interview ? SHOW : EMPTY
);
    const onAdd = ()=>{
        transition(CREATE)
    }   
    
    const onCancel = () =>{
        transition(back)
    }
    
    const save = (name, interviewer) =>{
        const interview = {
            student: name,
            interviewer
        };
        transition(SAVING) 
        props
        .bookInterview(props.id,interview)
        .then(() => transition(SHOW))
        .catch(error => transition(ERROR_SAVE, true));
 
       
    }

    const cancel = () => {
        transition(CONFIRM)
        
        
    }
    
    const onConfirm = ()=>{
        transition(DELETING,true)
       
        props
        .cancelInterview(props.id)
        .then(()=>transition(EMPTY))
        .catch(error => transition(ERROR_DELETE, true));
        
    }

    const edit = ()=>{
        transition(EDIT)
    }
 
    return (


        
        <article className="appointment">
        <Header time={props.time}/>
        {mode === EMPTY && <Empty onAdd={onAdd} />}
        {mode === SHOW && (
            <Show
                studentName={props.interview.student}
                interviewerName={props.interview.interviewer.name}
                onDelete={cancel}
                onEdit ={edit}
            />
        )}
        {mode === EDIT && <Form onSave ={save} onCancel ={onCancel} student={props.interview.student} interviewers={props.interviewers}/>}
        {mode === CONFIRM && <Confirm onCancel={onCancel} onConfirm ={onConfirm} message='Are you sure you want to delete this?'/>}
        {mode === DELETING && <Status message='Deleting'/>}
        {mode === SAVING && <Status message='Saving'/>}
        {mode === CREATE && <Form onSave ={save} onCancel ={onCancel} interviewers={props.interviewers}/>}
        {mode === ERROR_SAVE && <Error message = 'Sorry could not save ' onClose={onCancel}/>}
        {mode === ERROR_DELETE && <Error message = 'Sorry could not delete ' onClose={onCancel}/>}
        </article>
        
        
    )
}