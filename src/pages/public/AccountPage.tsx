import { Button, Form, Image, Input, Modal, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import "./Accounpage.scss";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  useGetUserInfoQuery,
  useUpdatePasswordMutation,
  useUpdateUserInfoMutation,
  useUploadAccountPhotoMutation,
} from "../../redux/query/account";
import { getUserImage } from "../../utils/images";
import { TOKEN, USER } from "../../constants";
import { removeAuth } from "../../redux/slice/auth";

const AccountPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [photo, setPhoto] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const { data: user, refetch } = useGetUserInfoQuery();

  const [updateUserInfo] = useUpdateUserInfoMutation();
  const [uploadAccountPhoto] = useUploadAccountPhotoMutation();
  const [updatePassword] = useUpdatePasswordMutation();

  useEffect(() => {
    form.setFieldsValue(user);
  }, [user, form]);

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    const { data } = await uploadAccountPhoto(formData);
    setPhoto(data);
  };

  const changePassword = async (values: number) => {
    try {
      await updatePassword(values);
      setShowForm(false);
      message.success("Password changed successfully");
      navigate("/");
    } catch (err) {
      message.error(err);
    }
  };

  const updateUser = async (values) => {
    await updateUserInfo(values);
    message.success("Information saved successfully");
    refetch();
  };

  const logout = () => {
    Cookies.remove(TOKEN);
    localStorage.removeItem(USER);
    dispatch(removeAuth());
    navigate("/");
  };
  return (
    <section className="account">
      <div className="container">
        <div className="account-wrapper">
          <div className="account-aside">
            <h2>My Account </h2>
            <p>You can change your account settings here</p>
            <div className="info-user">
              <h3>Your Basic Information</h3>
              <div className="border"></div>
              <Form
                className="register-form"
                name="register"
                labelCol={{
                  span: 24,
                }}
                wrapperCol={{
                  span: 24,
                }}
                onFinish={updateUser}
                autoComplete="off">
                <div style={{ display: "flex", gap: "40px" }}>
                  <div>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "40px",
                        }}>
                        <Form.Item
                          label="First name"
                          name="firstName"
                          rules={[
                            {
                              required: true,
                              message: "Please input your firstname!",
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
                              message: "Please input your lastname!",
                            },
                          ]}>
                          <Input />
                        </Form.Item>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "40px",
                        }}>
                        <Form.Item
                          label="Username"
                          name="username"
                          rules={[
                            {
                              required: true,
                              message: "Please input your username!",
                            },
                          ]}>
                          <Input />
                        </Form.Item>
                        <Form.Item
                          label="Email"
                          name="email"
                          rules={[
                            {
                              required: true,
                              message: "Please input your email address!",
                            },
                          ]}>
                          <Input />
                        </Form.Item>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "40px",
                        }}>
                        <Form.Item
                          style={{ marginTop: "20px" }}
                          label="Phone number"
                          name="phoneNumber"
                          rules={[
                            {
                              required: true,
                              message: "Please input your address!",
                            },
                          ]}>
                          <Input />
                        </Form.Item>
                        <Form.Item label="Date of birth" name="birthday">
                          <input
                            className="date-picker register-date-picker"
                            type="date"
                          />
                        </Form.Item>
                      </div>

                      <Form.Item
                        className="btn-container"
                        wrapperCol={{
                          offset: 0,
                          span: 24,
                        }}>
                        <div style={{ textAlign: "center" }}>
                          <button className="submit-btn" type="submit">
                            Update Info
                          </button>
                        </div>
                      </Form.Item>
                    </div>
                    <div>
                      <Form
                        name="password"
                        className="reset-password"
                        style={{
                          paddingTop: "30px",
                        }}
                        labelCol={{
                          span: 24,
                        }}
                        wrapperCol={{
                          span: 24,
                        }}
                        onFinish={changePassword}
                        autoComplete="off">
                        <Form.Item
                          label="Username"
                          name="username"
                          rules={[
                            {
                              required: true,
                              message: "Please input your username",
                            },
                          ]}>
                          <Input />
                        </Form.Item>

                        <Form.Item
                          label="Current password"
                          name="currentPassword"
                          rules={[
                            {
                              required: true,
                              message: "Please input your current password",
                            },
                          ]}>
                          <Input.Password />
                        </Form.Item>

                        <Form.Item
                          label="New password"
                          name="newPassword"
                          rules={[
                            {
                              required: true,
                              message: "Please input your new password",
                            },
                          ]}>
                          <Input.Password />
                        </Form.Item>

                        <Form.Item
                          className="btn-container"
                          wrapperCol={{
                            offset: 0,
                            span: 24,
                          }}>
                          <div style={{ marginBottom: "50px" }}>
                            <Button
                              style={{ marginRight: "20px" }}
                              type="submit">
                              Update Info
                            </Button>
                            <Button style={{ marginRight: "20px" }}>
                              <Link
                                onClick={() =>
                                  Modal.confirm({
                                    title: "Do you want to log out ?",
                                    onOk: () => logout(),
                                  })
                                }>
                                Logout
                              </Link>
                            </Button>
                          </div>
                        </Form.Item>
                      </Form>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </div>
          <div className="account-bside">
            <div className="account-ava">
              <h3>My Profile</h3>
              <div className="border"></div>
              <div style={{ textAlign: "center" }}>
                <Image
                  className="account-image"
                  style={{
                    width: "300px",
                    height: "300px",
                  }}
                  src={user?.photo ? getUserImage(user.photo) : "loading..."}
                />
                <Input
                  className="upload-btn"
                  type="file"
                  onChange={uploadImage}
                />
              </div>
            </div>
            <div className="user-info">
              <h3>About me</h3>
              <div className="border"></div>
              <Form.Item name="info">
                <Input.TextArea />
              </Form.Item>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountPage;
