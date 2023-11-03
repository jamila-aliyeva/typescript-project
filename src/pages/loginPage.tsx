import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button,Flex,Form, Input } from 'antd';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import request from '../server';
// import { TOKEN, USER } from '../constants';
// import { setAuth } from '../redux/slice';
// import Cookies from 'js-cookie';

const LoginPage = () => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
 

  // const login = async (e) => {
  //   e.preventDefault();
  //   const userData = {
  //     username: e.target.username.value,
  //     password: e.target.password.value,
  //   };

  //   const {
  //     data: { token, user },
  //   } = await request.post("auth/login", userData);

  //   Cookies.set(TOKEN, token);
  //   localStorage.setItem(USER, JSON.stringify(user));
  //   navigate("/dashboard");

  //   dispatch(setAuth(user));
  // };

  return (
    <Flex align='center' justify='center' style={{height: '100vh'}}>
      <Form
      labelCol={{span: 24}}
      wrapperCol={{span: 24}}
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      // onFinish={login}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
          Log in
        </Button>
      </Form.Item>
    </Form>
    </Flex>
  );
};

export default LoginPage;