import { Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export default function Delete() {
  const confirm = () => {
    message.success("Click on Yes");
  };

  const cancel = () => {
    message.error("Click on No");
  };
  
  return (
    <Popconfirm
      title="Delete this task?"
      description="Are you sure you want to delete this task?"
      onConfirm={confirm}
      onCancel={cancel}
      okText="Yes"
      cancelText="No"
    >
      <DeleteOutlined />
    </Popconfirm>
  );
}
