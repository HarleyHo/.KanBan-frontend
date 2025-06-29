import { Card, Flex } from "antd";
import Title from "./Title.jsx";
import Priority from "./Priority.jsx";
import Assignee from "./Assignee.jsx";
import Detail from "./ActionDetail.jsx";
import Share from "./ActionShare.jsx";
import Delete from "./ActionDelete.jsx";

export default function Task({ task }) {
  return (
    <Card
      title={<Title titleIn={task.title} />}
      actions={[
        <Detail key="detail" task={task} />,
        <Share key="share" />,
        <Delete key="delete" />,
      ]}
    >
      <Flex>
        <Assignee />
        <Priority />
      </Flex>
    </Card>
  );
}
