import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Navbar, CalendarEventBox, CalendarModal, FabAddNew, FabDelete} from "../";
import { localizer } from '../../helpers';
import { useState } from 'react';
import { useCalendarStore, useUiStore } from '../../hooks';



export const CalendarPage = () => {

  const { events, setActiveEvent } = useCalendarStore();

  const { openDateModal } = useUiStore();

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

  const eventStyleGetter = ( event, start, end, isSelected ) => {

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
    openDateModal();
  };

  const onSelect = ( event ) => {
    setActiveEvent( event );
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

      <CalendarModal />
      <FabAddNew />
      <FabDelete />

    </>
  )
}
