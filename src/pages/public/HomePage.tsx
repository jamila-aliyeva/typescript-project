import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { HiBars3BottomRight, HiXMark } from "react-icons/hi2";

import "./HomePage.scss";
import AOS from "aos";
import { authName } from "../../redux/slice/auth";
import { useSelector } from "react-redux";
// import { authName } from "../../../redux/slice/auth";
// import { useSelector } from "react-redux";

const HomePage = () => {
  const { isAuthenticated } = useSelector((state) => state[authName]);
  const [navOpen, setNavOpen] = useState(false);
  useEffect(() => {
    AOS.init({ duration: "2600" });
  }, []);
  return (
    <>
      <section className="home-page">
        <div className="container">
          <header>
            <nav>
              <div className="logo">
                <a href="/">
                  <h1 data-aos="fade-down">PORFOLIO . 🎈</h1>
                </a>
              </div>

              <div className={` nav_menu ${navOpen ? navOpen : null}`}>
                <div className="sections" data-aos="fade-down">
                  <Link to="/" onClick={() => setNavOpen(false)}>
                    Home
                  </Link>
                  <Link to="/" onClick={() => setNavOpen(false)}>
                    About us
                  </Link>
                  {/* <Link hrefLang="#contact" onClick={() => setNavOpen(false)}>
                    Contact us
                  </Link> */}
                </div>
                <div className="home-btns" data-aos="fade-down">
                  {isAuthenticated ? (
                    <Link to="/account">Account</Link>
                  ) : (
                    <Link to="/login">Login</Link>
                  )}
                  <Link to="/register" onClick={() => setNavOpen(false)}>
                    Register
                  </Link>
                </div>
                <div className="closeNav" onClick={() => setNavOpen(false)}>
                  {/* <HiXMark color="white" size={35} /> */}
                </div>
              </div>
              <button className="openNav" onClick={() => setNavOpen(true)}>
                {/* <HiBars3BottomRight color="white" size={35} /> */}
              </button>
            </nav>
          </header>
          <main>
            <section className="hero-page">
              <div className="hero-aside">
                <h2 data-aos="fade-up-right">
                  Create your perfect <span>porfolio</span> with us
                </h2>
                <p data-aos="fade-down-left">
                  Brand messsges are delevered and plannedbased on the questions
                  how , what , when to whom and where your brand strategy is.
                </p>
              </div>
            </section>
          </main>
        </div>
      </section>
    </>
  );
};

export default HomePage;
