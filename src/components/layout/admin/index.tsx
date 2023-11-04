import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  ProjectOutlined,
  MessageOutlined,
  LineChartOutlined,
  DashboardOutlined,
  CopyOutlined,
  BuildOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { Layout, Menu, Button, theme, Modal, Badge } from "antd";

import "./style.scss";
import { IS_LOGIN } from "../../../constants";
// import { useGetUsersQuery } from "../../../redux/query/user";

const { Header, Sider, Content } = Layout;

const AdminLayout = ({ setIsLogin }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  //   const { data: { total } = { users: [], total: 0 } } = useGetUsersQuery({
  //     role: "user",
  //   });

  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
    <Layout>
      <Sider
        className="admin-aside"
        trigger={null}
        collapsible
        collapsed={collapsed}>
        <div className="admin-logo">{collapsed ? "⚙️" : "Admin"}</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          items={[
            {
              key: "/dashboard",
              icon: <DashboardOutlined />,
              label: <Link to="/dashboard">Dashboard</Link>,
            },
            {
              key: "/users",
              icon: <UserOutlined />,
              label: <Link to="/users">Users</Link>,
            },

            {
              key: "/skills",
              icon: <CopyOutlined />,
              label: <Link to="/skills">Skills</Link>,
            },
            {
              key: "/portfolios",
              icon: <BuildOutlined />,
              label: <Link to="/portfolios">Portfolios</Link>,
            },
            {
              key: "/education",
              icon: <LineChartOutlined />,
              label: <Link to="/education">Education</Link>,
            },
            {
              key: "/experiences",
              icon: <ProjectOutlined />,
              label: <Link to="/experiences">Experiences</Link>,
            },
            {
              key: "/messeges",
              icon: <MessageOutlined />,
              label: <Link to="/messeges">Messeges</Link>,
            },
            {
              icon: <LogoutOutlined />,
              label: <Link onClick={logout}>Logout</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="admin-header"
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
          }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />

          <div style={{ display: "flex", alignItems: "center" }}>
            <Link
              to="/"
              className="notification"
              style={{
                paddingInline: "30px",
              }}>
              <Badge showZero s>
                <img
                  style={{ width: "30px" }}
                  src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/notification-circle-blue-512.png"
                  alt=""
                />
              </Badge>
            </Link>
            <Link
              style={{
                display: "flex",
                alignItems: "center",
                padding: "20px",
                gap: "16px",
              }}>
              <img
                style={{ width: "35px", height: "36px", borderRadius: "50%" }}
                src="https://img.freepik.com/free-photo/glowing-spaceship-orbits-planet-starry-galaxy-generated-by-ai_188544-9655.jpg?size=626&ext=jpg&ga=GA1.1.1880011253.1699056000&semt=sph"
                alt=""
              />
              <h4 style={{ color: "white" }}>Admin's name</h4>
            </Link>
          </div>
        </Header>
        <Content
          className="admin-main"
          style={{
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
