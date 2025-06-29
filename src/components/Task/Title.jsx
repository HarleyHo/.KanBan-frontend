import { useState, useRef } from "react";
import { Button, Input, Flex, Typography } from "antd";
const { Title } = Typography;
import { CheckOutlined, EditOutlined, CloseOutlined } from "@ant-design/icons";

export default function TaskTitle({ titleIn }) {
  const [title, setTitle] = useState(titleIn || "");
  const [isEditing, setIsEditing] = useState(true);
  const titleTemp = useRef("");

  const handleSave = () => {
    if (!title.trim()) {
      setTitle("New Task");
    }
    setIsEditing(false);
  };

  const handleCancelSave = () => {
    setTitle(titleTemp.current);
    setIsEditing(false);
  };

  const handleEdit = () => {
    titleTemp.current = title;
    setIsEditing(true);
  };

  if (isEditing) {
    return (
      <Flex>
        <Input
          placeholder="New Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onPressEnter={handleSave}
          allowClear
        />
        <CheckOutlined onClick={handleSave} />
        <CloseOutlined onClick={handleCancelSave} />
      </Flex>
    );
  } else {
    return (
      <Flex>
        <Title level={3}>{title}</Title>
        <EditOutlined onClick={handleEdit} />
      </Flex>
    );
  }
};
