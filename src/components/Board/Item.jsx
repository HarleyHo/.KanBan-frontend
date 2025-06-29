import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Task from "../Task/Task";

export default function Item({ task }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({id: task.id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Task task={task} />
    </div>
  );
}
