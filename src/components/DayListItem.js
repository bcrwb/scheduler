import React from "react";
import "components/DayListItem.scss";
import classnames from 'classnames'

export default function DayListItem(props) {
    const dateClass = classnames({
        "day-list__item":true,
        "day-list__item--selected": props.selected,
        "day-list__item--full": props.spots === 0
      });
  return (
    <li className ={dateClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.spots}</h3>
    </li>
  );
}