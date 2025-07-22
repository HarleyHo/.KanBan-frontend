import { PlusOutlined, InfoCircleOutlined } from "@ant-design/icons";
import User from "../User/User";
import "./header.css";

const AddProjectButton = () => {
  return (
    <div className="add-project-button">
      <PlusOutlined />{" "}
      Add Project
    </div>
  );
};
function Header() {
  return (
    <div className="header">
      <img className="header-icon" src="./src/assets/favicon.svg"/>
      <h3 className="header-name">VS Agile</h3>
      <div className="header-buttons">
        <AddProjectButton />
        <InfoCircleOutlined className="setting-button" />
        <div className="user">
          <User />
        </div>
      </div>
    </div>
  );
}

export default Header;
