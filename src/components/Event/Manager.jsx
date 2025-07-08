import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Avatar, Select, Space } from "antd";

function Manager({ event, setEvent, handleOK }) {
  const { users } = useContext(UserContext);

  const managers = [];
  users
    .filter((user) => user.role === 0)
    .map((user) => {
      managers.push({
        id: user.id,
        label: <Avatar src={user.iconUrl} />,
        value: user.name,
      });
    });
  const handleChange = (e) => {
    setEvent((prev) => ({
      ...prev,
      manager: managers.find((manager) => manager.value === e).id,
    }));
  };

  return (
    <Select
      value={managers.find((manager) => manager.id === event.managerId)}
      options={managers}
      style={{ width: 120 }}
      onChange={handleChange}
      onBlur={handleOK}
      optionRender={(option) => (
        <Space>
          <div>{option.data.label}</div>
          {option.data.value}
        </Space>
      )}
    />
  );
}

export default Manager;
