import React from 'react'
import "components/InterviewerList.scss";
import InterviewerListItem from './InterviewerListItem'



export default function InterviewerList({interviewers,interviewer,setInterviewer}) {
    const interviewCopy = interviewers.map(i => {
        return <InterviewerListItem
        key = {i.id}
        id ={i.id}
        name ={i.name}
        avatar ={i.avatar}
        selected ={i.id === interviewer}
        setInterviewer={event => setInterviewer(i.id)}
        />
    })

    return (
        <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">{interviewCopy}</ul>
</section>
    )
}


