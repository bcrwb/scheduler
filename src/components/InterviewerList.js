import React from 'react'
import "components/InterviewerList.scss";
import InterviewerListItem from './InterviewerListItem'
import PropTypes from 'prop-types'



export default function InterviewerList({interviewers,interviewer,setInterviewer}) {
    InterviewerList.propTypes = {
        interview: PropTypes.number,
        setInterviewer: PropTypes.func.isRequired
      };
    const interviewCopy = interviewers.map(interview => {
        return <InterviewerListItem
        key = {interview.id}
        id ={interview.id}
        name ={interview.name}
        avatar ={interview.avatar}
        selected ={interview.id === interviewer}
        setInterviewer={() => setInterviewer(interview.id)}
        />
    })

    return (
        <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">{interviewCopy}</ul>
</section>
    )
}


