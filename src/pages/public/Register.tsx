import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

import { message } from "antd";
import AOS from "aos";
import request from "../../server";
import { TOKEN, USER } from "../../constants";
import { setAuth } from "../../redux/slice/auth";
import { Link } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();

  const submit = async (e) => {
    e.preventDefault();
    let userData = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      username: e.target.username.value,
      password: e.target.password.value,
    };

    const {
      data: { token, user },
    } = await request.post("auth/register", userData);
    console.log(userData);

    Cookies.set(TOKEN, token);
    localStorage.setItem(USER, JSON.stringify(user));

    dispatch(setAuth(user));
    message.success("Successfully registered and you are a user");
  };

  useEffect(() => {
    AOS.init({ duration: "1600" });
  }, []);
  return (
    <section className="register">
      <div className="container">
        <div className="form-wrap">
          <div
            className="form-container"
            style={{ marginTop: "30px" }}
            data-aos="flip-left">
            <h1
              style={{
                textAlign: "center",
              }}>
              Register
            </h1>
            <div>
              <form onSubmit={submit}>
                <input type="text" name="firstName" placeholder="Firstname" />
                <input type="text" name="lastName" placeholder="Lastname" />
                <input type="text" name="username" placeholder="Username" />
                <input type="password" name="password" placeholder="Password" />
                {/* <input type="password" placeholder="Confirm password" /> */}
                {/* <Link to="/profile">
                  <button>Register</button>
                </Link> */}
                <button>Register</button>
              </form>
            </div>
          </div>
          <div className="toggle-container">
            <div className="toggle-panel toggle-right">
              <h2>Hello, friend!</h2>
              <p>Register with personal details use all of site features</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
