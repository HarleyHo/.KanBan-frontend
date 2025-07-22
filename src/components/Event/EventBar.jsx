import { PlusOutlined } from "@ant-design/icons";
import { useRef, useEffect, useContext } from "react";
import Event from "./Event";
import { CurrentEventContext, EventContext } from "../../contexts/EventContext";
import { addEvent, fetchEvents } from "../../services/eventService";
import "./event.css";

const AddEventButton = ({ onClick }) => {
  return (
    <div className="add-event-button" onClick={onClick}>
      <PlusOutlined />
    </div>
  );
};

function EventBar() {
  const newEventCount = useRef(1);
  const { events, setEvents } = useContext(EventContext);
  const { setCurrentEvent } = useContext(CurrentEventContext);

  useEffect(() => {
    fetchEvents().then((result) => {
      setEvents((prevEvents) => {
        const merged = [...prevEvents, ...result.data];
        return Array.from(
          new Map(merged.map((event) => [event.id, event])).values()
        );
      });
    });
  }, [setEvents]);

  useEffect(() => {
    if (events.length > 0) setCurrentEvent(events[0]);
  }, [events, setCurrentEvent]);

  const handleAddEvent = () => {
    const newEvent = {
      name: "New Event " + newEventCount.current,
      managerId: "",
      startDate: "",
      endDate: "",
      status: 0,
    };

    addEvent({ event: newEvent }).then((result) => {
      setEvents((prevEvents) => {
        return [...prevEvents, result.data];
      });
    });

    newEventCount.current++;
  };

  return (
    <>
      <div className="event-bar">
        <h1 className="event-bar-title">Project 1</h1>
        <AddEventButton onClick={handleAddEvent} />
        <div className="event-container">
          {events.map((event) => (
            <Event key={event.id} event={event} />
          ))}
        </div>
      </div>
    </>
  );
}

export default EventBar;
