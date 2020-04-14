import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "index.scss";

import Button from "components/Button";
import DayListItem from '../src/components/DayListItem'
import DayList from '../src/components/DayList'
import InterviewerList from '../src/components/InterviewerList'
import InterviewerListItem from '../src/components/InterviewerListItem'
import Appointment from '../src/components/Appointment/index'
import Header from '../src/components/Appointment/Header'
import Empty from '../src/components/Appointment/Empty'
import Show from '../src/components/Appointment/Show'
import Confirm from '../src/components/Appointment/Confirm'
import Status from '../src/components/Appointment/Status'
import Error from '../src/components/Appointment/Error'

storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));


  storiesOf("DayListItem", module) //Initiates Storybook and registers our DayListItem component
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  }) // Provides the default background color for our component
  .add("Unselected", () => <DayListItem name="Monday" spots={5} />) // To define our stories, we call add() once for each of our test states to generate a story
  .add("Selected", () => <DayListItem name="Monday" spots={5} selected />) 
  .add("Full", () => <DayListItem name="Monday" spots={0} />)
  .add("Clickable", () => (
    <DayListItem name="Tuesday" setDay={action("setDay")} spots={5} /> // action() allows us to create a callback that appears in the actions panel when clicked
  ));

  const days = [
    {
      id: 1,
      name: "Monday",
      spots: 2,
    },
    {
      id: 2,
      name: "Tuesday",
      spots: 5,
    },
    {
      id: 3,
      name: "Wednesday",
      spots: 0,
    },
  ];

  
  
  storiesOf("DayList", module)
    .addParameters({
      backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
    })
    .add("Monday", () => (
      <DayList days={days} day={"Monday"} setDay={action("setDay")} />
    ))
    .add("Tuesday", () => (
      <DayList days={days} day={"Tuesday"} setDay={action("setDay")} />
    ));

    const interviewer = {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    };
    
    storiesOf("InterviewerListItem", module)
      .addParameters({
        backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
      })
      .add("Unselected", () => (
        <InterviewerListItem
          id={interviewer.id}
          name={interviewer.name}
          avatar={interviewer.avatar}
        />
      ))
      .add("Selected", () => (
        <InterviewerListItem
          id={interviewer.id}
          name={interviewer.name}
          avatar={interviewer.avatar}
          selected
        />
      ))
      .add("Clickable", () => (
        <InterviewerListItem
          id={interviewer.id}
          name={interviewer.name}
          avatar={interviewer.avatar}
          setInterviewer={event => action("setInterviewer")(interviewer.id)}
        />
      ));


      const interviewers = [
        { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
        { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
        { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
        { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
        { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
      ];
      
      storiesOf("InterviewerList", module)
        .addParameters({
          backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
        })
        .add("Initial", () => (
          <InterviewerList
            interviewers={interviewers}
            setInterviewer={action("setInterviewer")}
          />
        ))
        .add("Preselected", () => (
          <InterviewerList
            interviewers={interviewers}
            interviewer={3}
            setInterviewer={action("setInterviewer")}
          />
        ));

        storiesOf("Appointment", module)
        .addParameters({
          backgrounds: [{ name: "white", value: "#fff", default: true }]
        })
        .add("Appointment", () => <Appointment />)
        .add("Appointment with time", () => <Appointment time = '12PM'/>)
        .add("Header", () => <Header time = '12PM'/>)
        .add("Empty", () => <Empty onAdd={action("onAdd")} />)
        .add('Show',() => <Show student = "brent carey" interviewer ={interviewers[0]} onEdit ={action("onEdit")} onDelete ={action("onDelete")}/>) 
        .add('Confirm',() => <Confirm message = "Do you want to delete appointment?" onConfirm ={action("onConfirm")} onCancel = {action("onCancel")}/>)
        .add("Deleting", () => <Status message = 'Deleting!'/>)
        .add("Saving", () => <Status message = 'Saving!'/>)
        .add("Error", () => <Error message = 'Unable to Delete...' onClose ={action("onClose")}/>)