import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import calendarApi from "../api/calendarApi";
import { convertEventsToDate } from "../helpers";
import { onAddNewEvent, onDeleteEvent, onLoadEvent, onSetActiveEvent, onUpdateEvent } from "../store";


export const useCalendarStore = () => {

    const dispatch = useDispatch();
  
    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    };

    const startSavingEvent = async( calendarEvent ) => {
        
        try {
            if( calendarEvent.id ){
                //updating
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent );
                dispatch( onUpdateEvent( { ...calendarEvent , user} ));
                return;
            } 
             
            //creating event
            const {data} = await calendarApi.post('/events', calendarEvent);
            //console.log(data);
    
            dispatch( onAddNewEvent({ ...calendarEvent, id: data.event.id, user}))
        } catch (error) {
            console.log(error);
            Swal.fire('Erro Save', error.response.data?.msg, 'error');
        }
        
    };

    const startLoadingEvents = async() => {

        try {
            const {data} = await calendarApi.get('/events');
            const events = convertEventsToDate( data.events );
            //console.log(events);
            dispatch( onLoadEvent(events) );
        } catch (error) {
            console.log('Error, loading events');
            console.log(error);
        }
    };

    const startDeletingEvent = async() => {

        try {
                await calendarApi.delete(`/events/${activeEvent.id}`);
                dispatch( onDeleteEvent() );
                return;
            
        } catch (error) {
            console.log(error);
            Swal.fire('Error to delete', error.response.data?.msg, 'error');
        }
        
    };

    return {

        //* properties
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,


        //* methods
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents,
        
    }
}
