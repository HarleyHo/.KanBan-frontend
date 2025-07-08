import { Select } from "antd";
import { useContext } from "react";
import { TempTaskContext, PriorityContext } from "../../contexts/TaskContext";

function Priority() {
  const { tempTask, setTempTask, handleBlur } = useContext(TempTaskContext);
  const { priorityOptions } = useContext(PriorityContext);

  const handleChange = (e) => {
    setTempTask((prev) => ({
      ...prev,
      priority: e,
    }));
  };

  return (
    <Select
      value={priorityOptions.find(
        (opt) => opt.id === tempTask.priority
      )}
      style={{ width: 120 }}
      onChange={handleChange}
      onBlur={handleBlur}
      options={priorityOptions}
    />
  );
}

export default Priority;
