import { PlusOutlined } from "@ant-design/icons";

const AddTaskButton = ({ handleClick }) => {
  return (
    <div className='add-task-button' onClick={handleClick}>
      <PlusOutlined />
    </div>
  );
};

export default AddTaskButton;
