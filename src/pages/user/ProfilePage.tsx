import { Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { IS_LOGIN } from "../../constants";
import { authName } from "../../redux/slice/auth";
import { useSelector } from "react-redux";

const ProfilePage = ({ setIsLogin }) => {
  const { isAuthenticated, user } = useSelector((state) => state[authName]);
  const navigate = useNavigate();
  const logout = () => {
    Modal.confirm({
      title: "Do you want to exit ?",
      onOk: () => {
        navigate("/login");
        setIsLogin(false);
        localStorage.removeItem(IS_LOGIN);
      },
    });
  };
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        textAlign: "center",
        justifyContent: "center",
      }}>
      <div>
        <h3
          style={{
            fontSize: "20px",
            width: "500px",
            marginBottom: "28px",
          }}>
          {isAuthenticated && user === "user"
            ? `Your role is user. If the admin update your role to client, then you
          can add or update your experiences, skills, portfolios. To update your
          role, you can apply ti the admin!`
            : `Your role is client. You can change your experiences, skills, portfolios.`}
        </h3>
        <Button onClick={logout}>Logout</Button>
      </div>
    </div>
  );
};

export default ProfilePage;
