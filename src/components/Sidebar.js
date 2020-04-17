import React from "react";
import DayList from "./DayList";
import './Sidebar.scss';

const Sidebar = ({ days, day, setDay }) => {
  return (
    <div className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList days={days} day={day} setDay={setDay} />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
    </div>
  );
};

export default Sidebar;
