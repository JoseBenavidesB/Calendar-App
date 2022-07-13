import { useSelector, useDispatch } from "react-redux";
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent } from "../store";


export const useCalendarStore = () => {

    const dispatch = useDispatch();
  
    const { events, activeEvent } = useSelector( state => state.calendar );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    };

    const startSavingEvent = async( calendarEvent ) => {
        
        if( calendarEvent._id ){
            //updating
            dispatch( onUpdateEvent( { ...calendarEvent} ));
        } else {
            //creating
            dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }))
        }
    };

    return {

        //* properties
        events,
        activeEvent,


        //* methods
        setActiveEvent,
        startSavingEvent,
        
    }
}
