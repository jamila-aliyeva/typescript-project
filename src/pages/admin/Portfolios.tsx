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
} from "antd";
import { Fragment, ReactNode, useEffect, useState } from "react";

import { LIMIT } from "../../constants";
import usePortfolio from "../../zustand/portfolios";
import { getImage } from "../../utils/images";
import { PhotoType } from "../../types/porfolios";

const Portfolios = () => {
  const [form] = Form.useForm();
  const [data, setdata] = useState();

  const {
    search,
    loading,
    total,
    page,
    setActivePage,
    activePage,
    portfolios,
    selected,
    isModalOpen,
    isModalLoading,
    uploadPhoto,
    closeModal,
    handleOk,
    handleSearch,
    showModal,
    handleEdit,
    handleDelete,
    getPorfolio,
  } = usePortfolio();

  useEffect(() => {
    getPorfolio();
    setdata(portfolios);
  }, [getPorfolio]);

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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Url",
      dataIndex: "url",
      key: "url",
      render: (
        url: string | number | boolean | Iterable<ReactNode> | null | undefined
      ) => (
        <a href={url} target="_blank" rel="noreferrer">
          {url}
        </a>
      ),
    },
    {
      title: "Fullname",
      render: (
        _: string,
        row: { user: { firstName: string; lastName: string } }
      ) => `${row?.user?.firstName ?? "empty"} ${row?.user?.lastName ?? ""}`,
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (id: string) => (
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
            <h1>Portfolio({total})</h1>

            <Input
              value={search}
              onChange={handleSearch}
              style={{ width: "auto", flexGrow: 1 }}
              placeholder="Searching..."
            />
            <Button onClick={() => showModal(form)} type="dashed">
              Add Portfolio
            </Button>
          </Flex>
        )}
        pagination={false}
        loading={loading}
        dataSource={portfolios}
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
        okText={selected === null ? "Add Portfolio" : "Save Portfolio"}
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

export default Portfolios;
