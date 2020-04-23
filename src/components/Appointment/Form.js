import React, {useState} from 'react'
import InterviewerList from '../InterviewerList'
import Button from '../Button';
import { setError } from "@testing-library/react";

export default function Form(props) {
  function validate() {
  if (name === "") {
    setError("Student name cannot be blank");
    return;
  }

  setError("");
  props.onSave(name, interviewer);
}
  
  
  const [error, setError] = useState("");
    const [name, setName] = useState(props.interviewers.student || "");
    const [interviewer, setInterviewer] = useState(props.interviewers || null);

    function reset(){
      setName('')
      setInterviewer(null)
    }

    function cancel(){
      reset()
      props.onCancel()
    }

    function save(){
      props.onSave(name,interviewer)
    }
    

    return (
        <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        value = {name}
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name" 
        onChange = {(event) => setName(event.target.value)}
        
        data-testid="student-name-input"
    />
    </form>
    <section className="appointment__validation">{error}</section>
    <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button onClick ={cancel} danger>Cancel</Button>
      <Button onClick = {save} confirm>Save</Button>
    </section>
  </section>
</main>
    )
}