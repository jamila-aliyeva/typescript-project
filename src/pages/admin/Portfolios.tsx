import { Button, Flex, Form, Input, Modal, Space, Table } from "antd";
import { Fragment, useEffect, useState } from "react";
import useEducation from "../../zustand/education";

import ExperiensesTypes from "../../types/experienses";
import useExperienses from "../../zustand/experienses";

const Portfolios = () => {
  const [form] = Form.useForm();
  const [data, setdata] = useState();

  const {
    search,
    total,
    loading,
    experiences,
    selected,
    isModalOpen,
    isModalLoading,
    closeModal,
    handleOk,
    handleSearch,
    showModal,
    handleEdit,
    handleDelete,
    getExperienses,
  } = useExperienses();

  useEffect(() => {
    getExperienses();
    setdata<ExperiensesTypes[]>(experiences);
  }, [getExperienses]);

  const columns = [
    {
      title: "Image",
      dataIndex: "photo",
      key: "photo",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Url",
      dataIndex: "url",
      key: "url",
      render: (url) => (
        <a href={url} target="_blank" rel="noreferrer">
          {url}
        </a>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    // {
    //   title: "Fullname",
    //   render: (_, row) =>
    //     `${row?.user?.firstName ?? ""} ${row?.user?.lastName ?? ""}`,
    // },
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
            <h1>Porfolios ({total})</h1>

            <Input
              value={search}
              onChange={handleSearch}
              style={{ width: "auto", flexGrow: 1 }}
              placeholder="Searching..."
            />
            <Button onClick={() => showModal(form)} type="dashed">
              Add porfolio
            </Button>
          </Flex>
        )}
        pagination={false}
        loading={loading}
        dataSource={experiences}
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
          name="category"
          autoComplete="off"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          form={form}>
          {/* <input type="file" onChange={handlePhoto} />
          {photo ? <Image src={getImage(photo)} /> : null} */}

          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Url"
            name="url"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default Portfolios;
