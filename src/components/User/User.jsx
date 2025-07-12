import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { fetchUsers } from "../../services/userService";
import {Avatar} from "antd"
import {UserOutlined} from "@ant-design/icons"

function User() {
  const { setUsers } = useContext(UserContext);

  useEffect(() => {
    fetchUsers().then((result) => {
      setUsers((prevUsers) => {
        const merged = [...prevUsers, ...result.data];
        return Array.from(
          new Map(merged.map((user) => [user.id, user])).values()
        );
      });
    });
  }, [setUsers]);

  return (
    <Avatar icon={<UserOutlined />} />
  );
}

export default User;
