import { useState, useContext } from "react";
import { EventContext } from "../../contexts/EventContext";
import { Modal, Button } from "antd";
import Manager from "./Manager";

function Detail({ event, isDetailOpen, setIsDetailOpen }) {
  const { setEvents } = useContext(EventContext);
  const [tempEvent, setTempEvent] = useState(event);

  const handleCancel = () => {
    setIsDetailOpen(false);
  };

  const handleDelete = () => {
    Modal.confirm({
      title: "Delete " + event.name,
      content: "Are you sure to delete this event?",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        setEvents((prevEvents) => prevEvents.filter((e) => e.id !== event.id));
        setIsDetailOpen(false);
      },
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOK = () => {
    setEvents((prevEvents) =>
      prevEvents.map((e) => (e.id === event.id ? { ...e, ...tempEvent } : e))
    );
    setIsDetailOpen(false);
  };

  return (
    <Modal
      title={null}
      open={isDetailOpen}
      onCancel={handleCancel}
      onOK={handleOK}
      footer={[
        <Button key="delete" onClick={handleDelete}>
          Delete
        </Button>,
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="ok" onClick={handleOK}>
          OK
        </Button>,
      ]}
    >
      <div>
        <form>
          Name:{" "}
          <input
            type="text"
            name="name"
            value={tempEvent.name}
            onChange={handleChange}
          />
          Manager:{" "}
          <Manager
            event={tempEvent}
            setEvent={setTempEvent}
            handleOK={handleOK}
          />
          Start Date:{" "}
          <input
            type="date"
            name="startDate"
            value={tempEvent.startDate || ""}
            onChange={handleChange}
          />
        </form>
      </div>
    </Modal>
  );
}

export default Detail;
