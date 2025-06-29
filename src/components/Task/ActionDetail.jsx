import { Modal, Typography } from "antd";
import {
  ProForm,
  ProFormDateTimePicker,
  ProFormText,
  ProFormTimePicker,
} from "@ant-design/pro-components";
const { Title } = Typography;
import { useState } from "react";
import { BarsOutlined, EditOutlined } from "@ant-design/icons";
import Assignee from "./Assignee.jsx";
import Priority from "./Priority.jsx";

export default function Detail({ task }) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [readonly, setReadonly] = useState(true);

  const showTaskDetail = () => {
    setIsDetailOpen(true);
  };

  const showTaskEdit = () => {
    setReadonly(false);
  };

  const handleSave = () => {
    setReadonly(true);
  };

  const handleOK = () => {
    setIsDetailOpen(false);
    setReadonly(false);
  };

  const handleCancel = () => {
    setIsDetailOpen(false);
    setReadonly(false);
  };

  return (
    <>
      <BarsOutlined onClick={showTaskDetail} />
      <Modal
        title={<EditOutlined onClick={readonly ? showTaskEdit : handleSave} />}
        open={isDetailOpen}
        onOk={handleOK}
        onCancel={handleCancel}
      >
        <ProForm
          readonly={readonly}
          initialValues={{ ...task }}
          submitter={false}
        >
          <ProFormText name="title" label="title" />
          <ProFormText name="description" label="description" />
          <Assignee assignee={task.assignee} />
          <Priority priority={task.priority} />
          <ProFormDateTimePicker name="dueTime" label="Due Time" />
          <ProFormDateTimePicker name="startDate" label="Start Date" />
        </ProForm>
      </Modal>
    </>
  );
}