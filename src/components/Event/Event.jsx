import "./event.css";
import { useContext, useState } from "react";
import Detail from "./EventDetail";
import { BarsOutlined } from "@ant-design/icons";
import { CurrentEventIdContext } from "../../contexts/EventContext";

function Event({ event }) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const { setCurrentEventId } = useContext(CurrentEventIdContext);

  const handleOpenDetail = () => {
    setIsDetailOpen(true);
  };

  const handleSelectEvent = () => {
    setCurrentEventId(event.id);
  };

  return (
    <>
      <div onClick={handleSelectEvent}>
        <h2 className="event over-hide">{event.name}</h2>
      </div>
      <BarsOutlined onClick={handleOpenDetail} />
      <Detail
        event={event}
        isDetailOpen={isDetailOpen}
        setIsDetailOpen={setIsDetailOpen}
      />
    </>
  );
}

export default Event;
