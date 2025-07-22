import { useState, useContext, useEffect } from "react";
import { editEvent, deleteEvent } from "../../services/eventService";
import { EventContext, CurrentEventContext } from "../../contexts/EventContext";
import { Button, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";
import Manager from "./Manager";

function EventDetail() {
  const { setEvents } = useContext(EventContext);
  const { currentEvent } = useContext(CurrentEventContext);
  const [tempEvent, setTempEvent] = useState(currentEvent);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    setTempEvent((prev) => ({
      ...prev,
      ...currentEvent,
    }));
  }, [setTempEvent, currentEvent]);

  const handleOpen = () => {
    setIsDetailOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    editEvent({ event: tempEvent }).then((result) => {
      setEvents((prevEvents) =>
        prevEvents.map((e) =>
          e.id === result.data.id ? { ...e, ...result.data } : e
        )
      );
    });
    setIsDetailOpen(false);
  };

  const handleCancel = () => {
    setIsDetailOpen(false);
  };

  const handleDelete = () => {
    Modal.confirm({
      title: "Delete " + tempEvent.name,
      content: "Are you sure to delete this event?",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        deleteEvent({ eventId: tempEvent.id }).then(() => {
          setEvents((prevEvents) =>
            prevEvents.filter((e) => e.id !== tempEvent.id)
          );
        });
      },
    });
  };

  return (
    <>
      <EditOutlined onClick={handleOpen} />
      <Modal open={isDetailOpen} onCancel={handleCancel} onOk={handleSave}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={tempEvent.name}
            onChange={handleChange}
            className="event-detail-name"
          />
        </label>
        <Manager
          event={tempEvent}
          setEvent={setTempEvent}
          onSave={handleSave}
        />
        <label>
          Start Date
          <input
            type="date"
            name="startDate"
            value={tempEvent.startDate}
            onChange={handleChange}
          />
        </label>
      </Modal>
    </>
  );
}

export default EventDetail;
