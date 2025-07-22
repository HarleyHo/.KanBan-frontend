import { Modal, Result } from "antd";
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
import { deleteTask, editTask } from "../../services/taskService";
import "./task.css";

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
        deleteTask({ taskId: task.id }).then(() => {
          setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
        });
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
    editTask({ task: tempTask }).then((result) => {
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? { ...t, ...result.data } : t))
      );
    });

    setReadonly(true);
  };

  return (
    <Modal
      title={null}
      open={isDetailOpen}
      onCancel={handleCancel}
      footer={null}
      wrapClassName={"task-detail"}
    >
      <div className="task-detail-bar">
        <ShareAltOutlined className="task-detail-bar-icon" />
        <DeleteOutlined
          onClick={handleDelete}
          className="task-detail-bar-icon"
        />
      </div>
      <form className="task-detail-form">
        <input
          type="text"
          name="name"
          value={tempTask.name}
          readOnly={readonly}
          onFocus={handleFocus}
          onChange={handleChange}
          onBlur={handleBlur}
          className="task-detail-name"
        />
        <div className="task-detail-description">
          Description
          <input
            type="textarea"
            name="description"
            value={tempTask.description}
            readOnly={readonly}
            onFocus={handleFocus}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <TempTaskContext.Provider value={{ tempTask, setTempTask, handleBlur }}>
          <div>
            Assignee: <Assignee className="task-detail-assignee" />
          </div>
          <div>
            Priority: <Priority className="task-detail-priority" />
          </div>
        </TempTaskContext.Provider>
        <div className="task-detail-start-date">
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
        </div>
        <div className="task-detail-due-date">
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
        </div>
      </form>
    </Modal>
  );
}

export default Detail;
