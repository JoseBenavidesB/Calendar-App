import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Navbar, CalendarEventBox, CalendarModal, FabAddNew, FabDelete} from "../";
import { localizer } from '../../helpers';
import { useEffect, useState } from 'react';
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks';



export const CalendarPage = () => {

  const { user } = useAuthStore();

  const { events, setActiveEvent, startLoadingEvents} = useCalendarStore();

  const { openDateModal } = useUiStore();

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

  const eventStyleGetter = ( event, start, end, isSelected ) => {
    
    const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user.uid );

    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
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
    setLastView( event )
  }; 

  /* ---------Laods Events from DB ---------*/
  useEffect(() => {
      startLoadingEvents();
  }, [])
  

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
