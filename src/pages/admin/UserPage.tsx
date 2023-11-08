import {
  Button,
  Flex,
  Form,
  Image,
  Input,
  Modal,
  Pagination,
  Space,
  Table,
  message,
} from "antd";
import { Fragment, useEffect, useState } from "react";

import UsersyType from "../../types/user";
import useUsers from "../../zustand/users";
import { LIMIT } from "../../constants";

import {
  useGetUserMutation,
  useUpgradeUserMutation,
} from "../../redux/query/user";
import { PhotoType } from "../../types/porfolios";
import { getImage } from "../../utils/images";

const UserPage = () => {
  const [page, setPage] = useState(1);
  const [form] = Form.useForm();
  const [data, setdata] = useState();

  const [AddUser] = useUpgradeUserMutation();
  const [getUser] = useGetUserMutation();

  const upgradeToClient = async (id) => {
    const values = await getUser(id);
    values.role = "client";
    await AddUser({ id, values });
    // refetch();
    message.success("User is added to client");
  };

  const {
    search,
    loading,
    total,
    users,
    selected,
    isModalOpen,
    isModalLoading,
    activePage,
    uploadPhoto,
    setActivePage,
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
    setdata<UsersyType[]>(users);
  }, [getUsers, page]);

  const columns = [
    {
      title: "Image",
      dataIndex: "photo",
      key: "photo",
      render: (data: PhotoType) => (
        <Image height={50} width={50} src={getImage(data)} />
      ),
    },
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
          <Button
            type="primary"
            danger
            onClick={() =>
              Modal.confirm({
                title: "Do you want to delete this message ?",
                onOk: () => handleDelete(id),
              })
            }>
            Delete
          </Button>
          <Button onClick={() => upgradeToClient(id)}>Add to Client</Button>
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
              Add user
            </Button>
          </Flex>
        )}
        pagination={false}
        loading={loading}
        dataSource={users}
        columns={columns}
      />

      {total > LIMIT ? (
        <Pagination
          total={total}
          pageSize={LIMIT}
          current={activePage}
          onChange={(page) => setActivePage(page)}
        />
      ) : null}
      <Modal
        title="Category data"
        maskClosable={false}
        confirmLoading={isModalLoading}
        okText={selected === null ? "Add user" : "Save user"}
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
          <div>
            <input
              className="upload-btn"
              type="file"
              onChange={(e) => uploadPhoto(e)}
            />
          </div>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default UserPage;
