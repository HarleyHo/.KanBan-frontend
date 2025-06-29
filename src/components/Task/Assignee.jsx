import { Card, Avatar, Select, Space } from "antd";
const { Meta } = Card;

const options = [
  {
    value: "Sam",
    label: <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />,
    name: "Sam",
  },
  {
    value: "Maria",
    label: (
      <Avatar src="https://api.dicebear.com/9.x/adventurer/svg?seed=Maria" />
    ),
    name: "Maria",
  },
];

export default function Assignee ({ assignee }) {
  return (
    <Select
      defaultValue={
        options.find((option) => option.value === assignee) || options[0]
      }
      options={options}
      optionRender={(option) => (
        <Space>
          <span aria-label={option.data.label} role="img">
            {option.data.label}
          </span>
          {option.data.name}
        </Space>
      )}
    />
  );
};
