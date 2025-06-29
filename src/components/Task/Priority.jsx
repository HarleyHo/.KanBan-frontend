import { Select, Space } from "antd";
import { DownOutlined, MinusOutlined, UpOutlined } from "@ant-design/icons";

export default function Priority ({priority}) {
  const handleChange = (value) => {
    console.log(`Selected priority: ${value}`);
  };

  const options = [
    {
      value: "normal",
      label: <DownOutlined />,
      desc: "Normal",
      color: "green",
    },
    {
      value: "warning",
      label: <MinusOutlined />,
      desc: "Warning",
      color: "yellow",
    },
    { value: "danger", label: <UpOutlined />, desc: "Danger", color: "red" },
  ];

  return (
    <Select
      defaultValue={options.find((option) => option.value === priority) || options[0]}
      onChange={handleChange}
      options={options}
      optionRender={(option) => (
        <Space style={{ color: option.data.color }}>
          <span aria-label={option.data.label} role="img">
            {option.data.label}
          </span>
          {option.data.desc}
        </Space>
      )}
    />
  );
};
