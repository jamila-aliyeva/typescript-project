const ProfilePage = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        textAlign: "center",
        justifyContent: "center",
      }}>
      <h3
        style={{
          fontSize: "20px",
          width: "500px",
        }}>
        Your role is user. If the admin update your role to client, then you can
        add or update your experiences, skills, portfolios. To update your role,
        you can apply ti the admin!
      </h3>
    </div>
  );
};

export default ProfilePage;
