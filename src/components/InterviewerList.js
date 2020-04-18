import React from 'react'
import "components/InterviewerList.scss";
import InterviewerListItem from './InterviewerListItem'



export default function InterviewerList({interviewers,interviewer,setInterviewer}) {
    const interviewCopy = interviewers.map(interviewer => {
        return <InterviewerListItem
        key = {interviewer.id}
        id ={interviewer.id}
        name ={interviewer.name}
        avatar ={interviewer.avatar}
        selected ={interviewer.id === interviewer}
        setInterviewer={event => setInterviewer(interviewer.id)}
        />
    })

    return (
        <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">{interviewCopy}</ul>
</section>
    )
}


