// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Avatar, Badge } from "antd";

// import { getSkills, skillName } from "../../../redux/slice/skils";
// import { educationName, getEducations } from "../../../redux/slice/education";

import "./Dashboard.scss";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // const dispatch = useDispatch();
  // const { total, loading } = useSelector((state) => state[skillName]);
  // const { total } = useSelector((state) => state[educationName]);

  // useEffect(() => {
  //   dispatch(getSkills({ total, loading }));
  // }, [dispatch, total, loading]);

  // useEffect(() => {
  //   dispatch(getEducations({ EduTotal, loading }));
  // }, [dispatch, EduTotal, loading]);

  return (
    <section>
      <div className="container">
        <div className="dashboard-top">
          {/* <h3>Welcome back, Admin</h3> */}
        </div>
        <h2 className="dashboard-title">Dashboard</h2>
        <h1>Overview</h1>
        <div className="dashboard-wrapper">
          <Link to="/skills" className="dashboard-card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4624/4624025.png"
              alt=""
            />
            <h2>Skills</h2>
          </Link>
          <Link to="/portfolios" className="dashboard-card">
            <img
              src="https://icons-for-free.com/iconfiles/png/512/chart+diagram+graph+graph+line+graphs+statistics+icon-1320086012050639555.png"
              alt=""
            />
            <h2>Portfolio</h2>
          </Link>
          <Link to="/education" className="dashboard-card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/10155/10155966.png"
              alt=""
            />
            <h2>Education</h2>
          </Link>
          <Link to="/experiences" className="dashboard-card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2672/2672346.png"
              alt=""
            />
            <h2>Experiences</h2>
          </Link>
        </div>
        <div className="dashboard-middle">
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
              veritatis beatae commodi dolore. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Quos cumque veritatis cupiditate
              labore, tenetur quas.
              <br />
              <br />
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Dignissimos, error. Quas, nihil consequatur? Architecto
              accusantium modi in? Ipsam provident explicabo rerum, dolore
              eligendi, debitis perferendis quod aspernatur dolorem, cupiditate
              cumque!
            </p>
          </div>
          <div>
            <img
              src="https://img.freepik.com/free-vector/colorful-illustration-female-programmer-working_23-2148277397.jpg?size=338&ext=jpg&ga=GA1.1.386372595.1698192000&semt=ais"
              alt=""
            />
          </div>
        </div>
        <p style={{ marginTop: "50px" }}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate
          id, culpa laboriosam quod repellendus consequuntur, aperiam officia,
          itaque odio eligendi deserunt mollitia fugit unde voluptates est!
          Molestiae sunt quo nam cumque! Omnis et aperiam adipisci blanditiis
          voluptates facere labore ad, doloribus ea perspiciatis possimus vel
          assumenda totam reprehenderit corporis, nemo consequatur animi qui,
          deserunt sapiente quos minus quis eligendi quisquam! Iste accusamus
          consectetur, fugit, maiores inventore unde autem fuga doloremque
          corrupti totam non recusandae placeat perferendis minus veritatis et
          ducimus beatae eos. Quasi ad, suscipit non earum hic quia deserunt
          eveniet nostrum voluptate a veritatis quae tenetur eligendi maiores
          sunt.
          <br />
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
          dicta sed ad nostrum ratione? Possimus maxime repudiandae sunt, culpa
          accusamus distinctio autem fuga, alias tenetur iusto eveniet inventore
          fugit optio.
        </p>
      </div>
    </section>
  );
};

export default Dashboard;
