import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';

import { Navbar, CalendarEventBox } from "../";
import { localizer } from '../../helpers';
import { useState } from 'react';




const events = [{
  title: 'Birthday',
  notes: 'Buy cake',
  start: new Date(),
  end: addHours( new Date(), 2 ),
  bgColor: '#fafafa',
  user: {
    _id: 123,
    name: 'Jose'
  }
}];



export const CalendarPage = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

  const eventStyleGetter = ( event, start, end, isSelected ) => {
    //console.log({event, start, end, isSelected});

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0.3rem',
      opacity: 0.8,
      color: 'white'
    };

    return {
      style
    };
  };

  const onDoubleClick = ( event ) => {
    console.log('doble click', event);
  };

  const onSelect = ( event ) => {
    console.log('On select', event);
  };

  const onViewChange = ( event ) => {
    localStorage.setItem( 'lastView', event)

  };

  return (
    <>
      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        eventPropGetter= { eventStyleGetter }
        components={{
          event: CalendarEventBox
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChange }
      />
      
    </>
  )
}
