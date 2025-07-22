import "./event.css";
import { useContext } from "react";
import { CurrentEventContext } from "../../contexts/EventContext";

function Event({ event }) {
  const { currentEvent, setCurrentEvent } = useContext(CurrentEventContext);

  const handleSelectEvent = () => {
    setCurrentEvent(event);
  };

  return (
    <>
      <div onClick={handleSelectEvent}>
        <h2
          className={`event over-hide ${
            currentEvent.id === event.id ? "selected-event" : ""
          }`}
        >
          {event.name}
        </h2>
      </div>
    </>
  );
}

export default Event;
