import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Item from "./Item";
import { Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDroppable } from "@dnd-kit/core";

function Plus({ status }) {
  if (status === 2) {
    return null; // Don't show the add button for the "Done" column
  }
  return (
    <>
      <PlusOutlined />
    </>
  );
}

export default function Column({ column, onAddTask }) {
  const { setNodeRef } = useDroppable({
    id: column.status,
  });

  const handleClick = () => {
    onAddTask();
  };

  return (
    <Card
      title={column.title}
      actions={[<Plus status={column.status} onClick={handleClick} />]}
    >
      <SortableContext items={column.tasks} strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef}>
          {column.tasks.map((task) => (
            <Item key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </Card>
  );
}
