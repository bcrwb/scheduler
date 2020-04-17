export default function getAppointmentsForDay(state, day) { 
    const filteredDays =state.days.filter(dayObj => dayObj.name === day)
   
   if(filteredDays.length === 0 || filteredDays === undefined) return []
   
   const filteredAppointments = filteredDays[0].appointments.map(id =>  state.appointments[id])
   return filteredAppointments
    
}

  export function getInterview(state, interview){

    console.log('====================================== getInterview called');
    console.log('interview', interview)
    console.log('state', state)
      
    if(!interview)return null
    let {student} = interview
    
    const object = {
        student,
        interviewer:{
            ...state.interviewers[interview.interviewer],
            
        }
      }
       
    console.log('object' ,object)
    return object
}