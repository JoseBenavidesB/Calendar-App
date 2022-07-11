import { addHours } from "date-fns";
import DatePicker from "react-datepicker";
import { useState } from "react";
import Modal from "react-modal";

import "react-datepicker/dist/react-datepicker.css";

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
//350

export const CalendarModal = () => {
    
    const [isOpen, setIsOpen] = useState(true);

    const [formValues, setFormValues] = useState({
      title: 'Jose',
      notes: 'benavides',
      start: new Date(),
      end: addHours( new Date(), 2 )
    });

    const { title, notes, start, end } = formValues;

    const handleInputChange = ({ target }) => {
      setFormValues({
        ...formValues,
        [target.name]: target.value
      })
    };

    const handleDateChange = (event, changing) => {
      setFormValues({
        ...formValues,
        [changing]: event
      })
    };

    const onCloseModal = () => {
        //console.log('cerrando modal');
        setIsOpen( false );
    };

  return (
    <Modal
        isOpen={ isOpen }
        onRequestClose={ onCloseModal }
        style={ customStyles }
        className= "modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={ 200 }
    >
      <h1> New Event </h1>
      <hr />
      <form className="container">

          <div className="form-group mb-2">
              <label>Start date and hour</label>
              <DatePicker 
                selected={ start } 
                className="form-control"
                onChange={ (event) => handleDateChange(event, 'start')}
                dateFormat="Pp"
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
              />
          </div>

          <hr />
          <div className="form-group mb-2">
              <label>Title and notes</label>
              <input 
                  type="text" 
                  className="form-control"
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
