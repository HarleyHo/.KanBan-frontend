import { Modal } from "antd";
import { useState, useContext } from "react";
import {
  CloseOutlined,
  DeleteOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { TaskContext } from "../../contexts/TaskContext";
import { TempTaskContext } from "../../contexts/TaskContext";
import Assignee from "./Assignee";
import Priority from "./Priority";

function Detail({ task, isDetailOpen, setIsDetailOpen }) {
  const [readonly, setReadonly] = useState(true);
  const { setTasks } = useContext(TaskContext);
  const [tempTask, setTempTask] = useState(task);

  const handleCancel = () => {
    setReadonly(true);
    setIsDetailOpen(false);
  };

  const handleDelete = () => {
    Modal.confirm({
      title: "Delete " + task.name,
      content: "Are you sure to delete this task?",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
        setIsDetailOpen(false);
      },
    });
  };

  const handleFocus = () => {
    setReadonly(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = () => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === task.id ? { ...t, ...tempTask } : t))
    );
    setReadonly(true);
  };

  return (
    <Modal
      title={null}
      open={isDetailOpen}
      onCancel={handleCancel}
      closable={false}
      footer={null}
    >
      <div>
        <ShareAltOutlined />
        <DeleteOutlined onClick={handleDelete} />
        <CloseOutlined onClick={handleCancel} />
      </div>
      <div>
        <form>
          Name:{" "}
          <input
            type="text"
            name="name"
            value={tempTask.name}
            readOnly={readonly}
            onFocus={handleFocus}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          Description:{" "}
          <input
            type="textarea"
            name="description"
            value={tempTask.description}
            readOnly={readonly}
            onFocus={handleFocus}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TempTaskContext.Provider
            value={{ tempTask, setTempTask, handleBlur }}
          >
            Assignee: <Assignee />
            Priority: <Priority />
          </TempTaskContext.Provider>
          Start Date:{" "}
          <input
            type="date"
            name="startDate"
            value={tempTask.startDate}
            readOnly={readonly}
            onFocus={handleFocus}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          Due Date:{" "}
          <input
            type="date"
            name="dueDate"
            value={tempTask.dueDate}
            readOnly={readonly}
            onFocus={handleFocus}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </form>
      </div>
    </Modal>
  );
}

export default Detail;
