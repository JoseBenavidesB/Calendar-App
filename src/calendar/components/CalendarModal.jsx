import { addHours, differenceInSeconds } from "date-fns";
import DatePicker from "react-datepicker";
import { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';
import "react-datepicker/dist/react-datepicker.css";
import { useCalendarStore, useUiStore } from "../../hooks";


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

Modal.setAppElement('#root');


export const CalendarModal = () => {

    const { isDateModalOpen, closeDateModal } = useUiStore();

    const { activeEvent, startSavingEvent } = useCalendarStore();

    /* Form Submitted State */
    const [formSubmitted, setFormSubmitted] = useState(false);

    /* Form values State */
    const [formValues, setFormValues] = useState({
      title: '',
      notes: '',
      start: new Date(),
      end: addHours( new Date(), 2 )
    });
    const { title, notes, start, end } = formValues;

    /* Set class is-invalid */
    const titleClass = useMemo(() => {
      if ( !formSubmitted ) return '';

      return ( (title.length > 0 ) ? '' : 'is-invalid' ) 
    }, [title, formSubmitted])


    /* Reload when activeEvent change */
    useEffect(() => {
      
      if ( activeEvent !== null ) {
        setFormValues({ ...activeEvent })
      }
      
    }, [ activeEvent ])
    
 
    /* Handle input change */
    const handleInputChange = ({ target }) => {
      setFormValues({
        ...formValues,
        [target.name]: target.value
      })
    };

    /* Handle date input change */
    const handleDateChange = (event, changing) => {
      setFormValues({
        ...formValues,
        [changing]: event
      })
    };

    /* handle Modal Close */
    const onCloseModal = () => {
        closeDateModal();
    };

    /* Handle On Submit form */
    const onSubmit = async(e) => {
      e.preventDefault();
      setFormSubmitted( true );

      const timeDifference = differenceInSeconds( end, start )
      if ( isNaN( timeDifference )  || timeDifference <= 0) {
        Swal.fire('Wrong date', 'Check Date Value', 'error')
        return; 
      };
      
      if( title.length <= 0 ) return;

      await startSavingEvent( formValues );
      closeDateModal();
      setFormSubmitted( false );
    };


  return (
    <Modal
        isOpen={ isDateModalOpen }
        onRequestClose={ onCloseModal }
        style={ customStyles }
        className= "modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={ 200 }
    >
      <h1> New Event </h1>
      <hr />
      <form className="container" onSubmit={ onSubmit }>

          <div className="form-group mb-2">
              <label>Start date and hour</label>
              <DatePicker 
                selected={ start } 
                className="form-control"
                onChange={ (event) => handleDateChange(event, 'start')}
                dateFormat="Pp"
                showTimeSelect
              />
          </div>

          <div className="form-group mb-2">
              <label>End date and hour</label>
              <DatePicker 
                minDate={ start } 
                selected={ end } 
                className="form-control"
                onChange={ (event) => handleDateChange(event, 'end')}
                dateFormat="Pp"
                showTimeSelect
              />
          </div>

          <hr />
          <div className="form-group mb-2">
              <label>Title and notes</label>
              <input 
                  type="text" 
                  className={ `form-control ${titleClass}` }
                  placeholder="Event Title"
                  name="title"
                  autoComplete="off"
                  onChange={ handleInputChange }
                  value={ title }
              />
              <small id="emailHelp" className="form-text text-muted">A short description</small>
          </div>

          <div className="form-group mb-2">
              <textarea 
                  type="text" 
                  className="form-control"
                  placeholder="Notes"
                  rows="5"
                  name="notes"
                  onChange={ handleInputChange }
                  value={ notes }
              ></textarea>
              <small id="emailHelp" className="form-text text-muted">Aditional information</small>
          </div>

          <button
              type="submit"
              className="btn btn-outline-primary btn-block"
          >
              <i className="far fa-save"></i>
              <span> Save </span>
          </button>

      </form>
    </Modal>
  )
}
