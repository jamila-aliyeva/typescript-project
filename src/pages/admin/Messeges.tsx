import {
  Button,
  Flex,
  Form,
  Input,
  Modal,
  Pagination,
  Select,
  Space,
  Table,
} from "antd";
import { Fragment, useEffect, useState } from "react";

import { LIMIT } from "../../constants";
import useMessages from "../../zustand/messeges";

const Messeges = () => {
  const [form] = Form.useForm();
  const [data, setdata] = useState();

  const {
    sortingOption,
    search,
    loading,
    total,
    page,
    messages,
    selected,
    isModalOpen,
    isModalLoading,
    closeModal,
    handleOk,
    handleSearch,
    showModal,
    handleEdit,
    handleDelete,
    getMessages,
  } = useMessages();

  useEffect(() => {
    getMessages(sortingOption);
    setdata(messages);
  }, [getMessages, sortingOption]);

  const columns = [
    {
      title: "User",
      dataIndex: "user",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      render: (data: string) => (
        <p
          style={{
            marginBottom: "0px",
          }}
          title="click answer to read more">
          {data.slice(0, 50)}
        </p>
      ),
    },

    {
      title: "Answer",
      dataIndex: "answer",
      render: (data: string) => {
        return (
          <p
            title="click answer to read more"
            className={data ? `answer` : `not-answered`}>
            {data ? `${data}` : "No answer"}
          </p>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (_id: string) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(_id)}>
            Answer
          </Button>
          <Button
            type="primary"
            danger
            onClick={() =>
              Modal.confirm({
                title: "Do you want to delete this message ?",
                onOk: () => handleDelete(_id),
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
            <h1>Messeges({total})</h1>

            <Input
              value={search}
              onChange={handleSearch}
              style={{ width: "auto", flexGrow: 1 }}
              placeholder="Searching..."
            />
            <Select
              defaultValue="Sort"
              value={sortingOption}
              onChange={(value) => getMessages(value)}
              options={[
                {
                  value: "answer[gt]",
                  label: "answered",
                },
                { value: "answer", label: "not-answered" },
              ]}
            />
            <Button onClick={() => showModal(form)} type="dashed">
              Add messege
            </Button>
          </Flex>
        )}
        pagination={false}
        loading={loading}
        dataSource={messages}
        columns={columns}
      />

      {total > LIMIT ? (
        <Pagination
          total={total}
          pageSize={LIMIT}
          current={page}
          // onChange={(acti) => setPage(page)}
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
          name="message"
          autoComplete="off"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          form={form}>
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: { selected },
                message: "Please type message title!",
              },
            ]}>
            <Input title="This is ready-only mode" disabled={selected} />
          </Form.Item>

          <Form.Item
            label="Message"
            name="message"
            rules={[
              {
                required: true,
                message: "Please enter your message !",
              },
            ]}>
            <Input.TextArea
              title="This is ready-only mode"
              // disabled={selected}
              showCount
              maxLength={100}
            />
          </Form.Item>

          {selected ? null : (
            <Fragment>
              <Form.Item
                label="The receiver id"
                name="whom"
                rules={[
                  {
                    required: true,
                    message: "Please enter receiver id !",
                  },
                ]}>
                <Input />
              </Form.Item>

              <Form.Item
                label="Your email or phone number"
                name="user"
                rules={[
                  {
                    required: true,
                    message: "Please enter receiver id !",
                  },
                ]}>
                <Input />
              </Form.Item>
            </Fragment>
          )}

          {selected ? (
            <Form.Item
              label="Answer"
              name="answer"
              rules={[
                {
                  required: true,
                  message: "Please enter your response",
                },
              ]}>
              <Input />
            </Form.Item>
          ) : null}
        </Form>
      </Modal>
    </Fragment>
  );
};

export default Messeges;
