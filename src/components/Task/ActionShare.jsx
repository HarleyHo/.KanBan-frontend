import { Popover, Flex } from "antd";
import {
  ExportOutlined,
  GithubOutlined,
  GitlabOutlined,
} from "@ant-design/icons";

const shareList = (
  <Flex>
    <GithubOutlined />
    <GitlabOutlined />
  </Flex>
);

export default function Share() {
  return (
    <Popover content={shareList}>
      <ExportOutlined />
    </Popover>
  );
};
