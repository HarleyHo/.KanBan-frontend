import { PlusOutlined } from "@ant-design/icons";
import { useState, useRef, useEffect, useContext } from "react";
import Event from "./Event";
import {
  CurrentEventIdContext,
  EventContext,
} from "../../contexts/EventContext";
import { addEvent, fetchEvents } from "../../services/eventService";

const AddEventButton = ({ onClick }) => {
  return (
    <div className="add-button" onClick={onClick}>
      <PlusOutlined />
    </div>
  );
};

function EventBar() {
  const newTaskCount = useRef(1);
  const [events, setEvents] = useState([]);
  const { setCurrentEventId } = useContext(CurrentEventIdContext);

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
    if (events.length > 0) setCurrentEventId(events[0].id);
  }, [events, setCurrentEventId]);

  const handleAddTask = () => {
    const newEvent = {
      name: "New Event " + newTaskCount.current,
      manager: "",
      startDate: "",
      endDate: "",
      status: 0,
    };

    addEvent({ event: newEvent }).then((result) => {
      console.log(result);
      setEvents((prevEvents) => {
        return [...prevEvents, result.data];
      });
    });

    newTaskCount.current++;
  };

  return (
    <>
      <div className="event-bar">
        <h1 className="event-bar-title">VS Agile</h1>
        <AddEventButton onClick={handleAddTask} />
        <div className="event-container">
          <EventContext.Provider value={{ setEvents }}>
            {events.map((event) => (
              <Event key={event.id} event={event} />
            ))}
          </EventContext.Provider>
        </div>
      </div>
    </>
  );
}

export default EventBar;
