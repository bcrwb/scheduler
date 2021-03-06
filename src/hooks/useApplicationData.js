import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
    spots: 5,
  });

  const setDay = (day) => {
    setState({ ...state, day });
  };

  

  useEffect(() => {
    Promise.all([
      //Request the days
      axios.get("/api/days"),
      //Request the appointments
      axios.get("/api/appointments"),
      //Request interviewer information
      axios.get("/api/interviewers"),
    ]).then((all) => {
      console.log(all[2]);
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const calcSpots = state.days.forEach(day => {
      if (state.appointments[id].interview === null &&  day.name === state.day) {
        day.spots--;
      }
      return day;
    })


    return axios.put(`/api/appointments/${id}`, { interview }).then(
      setState({
        ...state,
        appointments
      })
    );
  }

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const calcSpots = state.days.forEach(day => {
      if (day.name === state.day) {
        day.spots++;
      }
      return day;
    })

    return axios.delete(`/api/appointments/${id}`).then(
      setState({
        ...state,
        appointments,
      })
    );
  };

  return { state, setDay, bookInterview, cancelInterview };
}
