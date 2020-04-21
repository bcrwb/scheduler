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
    
  const setDay = day => {
        
    setState({...state, day});
  }

  const calcSpots = (day, appointments) =>
  day.appointments.length -
  day.appointments.reduce(
    (spots, id) => (appointments[id].interview ? spots + 1 : spots),
    0
  );

  

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

      function bookInterview(id, interview) {
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        const days = state.days.map((day) => {
          if (day.appointments[id]) {
            return { ...day, spots: calcSpots(day, appointments) };
          }
          return day;
        });
        
        return axios.put(`http://localhost:8001/api/appointments/${id}`,{interview}).then(
        setState({
          ...state,
          appointments,
          days
        }))

        
      }

      const cancelInterview = (id) => {
        const appointment = {
          ...state.appointments[id],
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };

        const days = state.days.map((day) => {
          if (day.appointments[id]) {
            return { ...day, spots: calcSpots(day, appointments) };
          }
          return day;
        });

        return axios.delete(`http://localhost:8001/api/appointments/${id}`).then(
          setState({
            ...state,
            appointments,
            days
      }))
    }
    
      return {state, setDay, bookInterview, cancelInterview}

}