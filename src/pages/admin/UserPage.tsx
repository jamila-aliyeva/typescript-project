import { Button, Flex, Form, Input, Modal, Space, Table } from "antd";
import { Fragment, useEffect, useState } from "react";

import UsersyType from "../../types/user";
import useUsers from "../../zustand/users";

const UserPage = () => {
  const [form] = Form.useForm();
  const [data, setdata] = useState();

  const {
    search,
    loading,
    total,
    skills,
    selected,
    isModalOpen,
    isModalLoading,
    closeModal,
    handleOk,
    handleSearch,
    showModal,
    handleEdit,
    handleDelete,
    getUsers,
  } = useUsers();

  useEffect(() => {
    getUsers();
    setdata<UsersyType[]>(skills);
  }, [getUsers]);

  const columns = [
    {
      title: "First name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (data) => (
        <p
          className={`tag ${data === "client" ? "client" : ""} ${
            data === "admin" ? "admin" : ""
          } ${data === "client" ? "client" : ""} `}>
          {data}
        </p>
      ),
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (id) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(form, id)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <Fragment>
      <Table
        scroll={{
          x: 1000,
        }}
        title={() => (
          <Flex justify="space-between" gap={36} align="center">
            <h1>Users({total})</h1>

            <Input
              value={search}
              onChange={handleSearch}
              style={{ width: "auto", flexGrow: 1 }}
              placeholder="Searching..."
            />
            <Button onClick={() => showModal(form)} type="dashed">
              Add skill
            </Button>
          </Flex>
        )}
        pagination={false}
        loading={loading}
        dataSource={skills}
        columns={columns}
      />

      {/* {total > LIMIT ? (
        <Pagination
          total={total}
          pageSize={LIMIT}
          current={page}
          onChange={(page) => setPage(page)}
        />
      ) : null} */}
      <Modal
        title="Category data"
        maskClosable={false}
        confirmLoading={isModalLoading}
        okText={selected === null ? "Add education" : "Save education"}
        open={isModalOpen}
        onOk={() => handleOk(form)}
        onCancel={closeModal}>
        <Form
          name="portfolio"
          autoComplete="off"
          initialValues={{
            phoneNumber: "+998 ",
          }}
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          form={form}>
          <Form.Item
            label="First name"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please include firstname!",
              },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Last name"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please include your lastname",
              },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please include your username",
              },
            ]}>
            <Input />
          </Form.Item>

          {selected === null ? (
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please include your password",
                },
              ]}>
              <Input.Password />
            </Form.Item>
          ) : null}
        </Form>
      </Modal>
    </Fragment>
  );
};

export default UserPage;