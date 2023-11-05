import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  CopyOutlined,
  BuildOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { Layout, Menu, Button, theme } from "antd";

import "./style.scss";

const { Header, Sider, Content } = Layout;

const UserLayout = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider
        className="admin-aside"
        trigger={null}
        collapsible
        collapsed={collapsed}>
        <div className="admin-logo">{collapsed ? "⚙️" : "User"}</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          items={[
            {
              key: "/profile",
              icon: <DashboardOutlined />,
              label: <Link to="/profile">Profile</Link>,
            },
            {
              key: "/userSkill",
              icon: <UserOutlined />,
              label: <Link to="/userSkill">Skills</Link>,
            },
            {
              key: "/userEducation",
              icon: <CopyOutlined />,
              label: <Link to="/userEducation">Education</Link>,
            },
            {
              key: "/userPortfolios",
              icon: <BuildOutlined />,
              label: <Link to="/userPortfolios">Portfolios</Link>,
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

          <div>
            <Link
              style={{
                display: "flex",
                alignItems: "center",
                paddingInline: "20px",
                gap: "16px",
              }}>
              <img
                style={{ width: "35px", height: "36px", borderRadius: "50%" }}
                src="https://img.freepik.com/free-photo/glowing-spaceship-orbits-planet-starry-galaxy-generated-by-ai_188544-9655.jpg?size=626&ext=jpg&ga=GA1.1.1880011253.1699056000&semt=sph"
                alt=""
              />
              <h4 style={{ color: "white" }}>User's name</h4>
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

export default UserLayout;