import React, { useState, useEffect } from "react";
import "components/Application.scss";
import Appointment from "components/Appointment";
import { resolvePreset } from "@babel/core";
import axios from "axios";
import getAppointmentsForDay, { getInterview } from "../helpers/selectors";
import Sidebar from "./Sidebar";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => {
    console.log('setDay called');
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
      console.log(interview);
      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={interview}
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
