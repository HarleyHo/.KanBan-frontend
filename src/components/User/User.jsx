import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { fetchUsers } from "../../services/userService";

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

  return null;
}

export default User;
