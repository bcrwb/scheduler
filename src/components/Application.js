import React from "react";
import "components/Application.scss";
import Appointment from "components/Appointment";


import getAppointmentsForDay, {
  getInterview,
  getInterviewersForDay,
} from "../helpers/selectors";
import Sidebar from "./Sidebar";
import useApplicationData from "../hooks/useApplicationData";

export default function Application() {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  } = useApplicationData();

  const appointments = getAppointmentsForDay(state, state.day).map(
    (appointment) => {
      const interview = getInterview(state, appointment.interview);

      const interviewers = getInterviewersForDay(state, state.day);

      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={interview}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      );
    }
  );

  return (
    <>
      <main className="layout">
        <Sidebar days={state.days} day={state.day} setDay={setDay} />
        <section className="schedule">
          {appointments}
          <Appointment key="last" time="5pm" />
        </section>
      </main>
    </>
  );
}
