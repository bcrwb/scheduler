import React, { useState, useEffect } from "react";
import "components/Application.scss";
import Appointment from "components/Appointment";
import { resolvePreset } from "@babel/core";
import axios from "axios";
import getAppointmentsForDay, { getInterview, getInterviewersForDay } from "../helpers/selectors";
import Sidebar from "./Sidebar";


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => {
    
    setState({...state, day});
  }

  useEffect(() => {
    Promise.all([
      //Request the days
      axios.get("http://localhost:8001/api/days"),
      //Request the appointments
      axios.get("http://localhost:8001/api/appointments"),
      //Request interviewer information
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      console.log(all[2]);
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, []);

  const appointments = getAppointmentsForDay(state, state.day).map(appointment => {
   
      const interview = getInterview(state, appointment.interview);

      const interviewers = getInterviewersForDay(state, state.day)

      function bookInterview(id, interview) {
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        
        return axios.put(`http://localhost:8001/api/appointments/${id}`,{interview}).then(
        setState({
          ...state,
          appointments
        }))

        
      }

      const cancelInterview = (id) => {
        const appointment = {
          ...state.appointments[id],
          // interview: { ...interview }
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };

        return axios.delete(`http://localhost:8001/api/appointments/${id}`).then(
          setState({
            ...state,
            appointments
      }))
    }
     
     
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
      <Sidebar days={state.days} day={state.day} setDay={setDay} />
      <section className="schedule">
        {appointments}
        <Appointment key="last" time="5pm" />
      </section>
    </>
  );
}
