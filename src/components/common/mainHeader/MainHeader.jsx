import { Header } from "antd/es/layout/layout";
import { Link } from "react-router-dom";

function MainHeader({ menu, menuFor }) {
  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 99,
        width: "100%",
        // background: #001529,
        padding: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingRight: "1rem",
          alignItems: "center",
          height: "100%",
        }}
      >
        {/* Logo */}
        {menuFor !== "admin" ? (
          <Link to={""} style={{ display: "inline-block", height: "100%" }}>
            <img
              style={{ width: "140px" }}
              src="/images/logo-light.png"
              alt="Logo"
            />
          </Link>
        ) : null}
        {menu}
      </div>
    </Header>
  );
}

export default MainHeader;
