import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import {
  GooglePlusOutlined,
  FacebookOutlined,
  GithubOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";

import AOS from "aos";

import "./LoginPage.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import request from "../../server";
import { TOKEN, USER } from "../../constants";
import { setAuth } from "../../redux/slice/auth";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    const userData = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    const {
      data: { token, user },
    } = await request.post("auth/login", userData);

    Cookies.set(TOKEN, token);
    localStorage.setItem(USER, JSON.stringify(user));

    if (user.role === "admin") {
      navigate("/dashboard");
    } else if (user.role === "user") {
      navigate("/profile");
    }

    dispatch(setAuth(user));
  };
  const register = async (e) => {
    e.preventDefault();
    navigate("/register");
  };

  useEffect(() => {
    AOS.init({ duration: "1500" });
  }, []);

  return (
    <section className="login-page">
      <div className="container">
        <div className="form-wrap">
          <div className="form-container">
            <form onSubmit={login} data-aos="zoom-in">
              <h1>LoginPage</h1>
              <div className="social-icons">
                <a href="">
                  <GooglePlusOutlined />
                </a>
                <a href="">
                  <FacebookOutlined />
                </a>
                <a href="">
                  <GithubOutlined />
                </a>
                <a href="">
                  <LinkedinOutlined />
                </a>
              </div>
              <input type="text" name="username" placeholder="username" />
              <input type="password" name="password" placeholder="password" />
              <button type="submit" className="sign-in">
                Login
              </button>
            </form>
          </div>
          <div className="toggle-container">
            <div className="toggle-panel toggle-right">
              <h2>Hello, friend!</h2>
              <p>Register with personal detailsto useall of site features</p>
              <Link onClick={register}>
                <button className="hidden" id="register">
                  Sign up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
