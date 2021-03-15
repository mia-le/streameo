import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

const Header = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Link
        to="/"
        className="item"
        style={{ width: "100%", maxWidth: "180px" }}
      >
        <img alt="" width="100%" src="/logo_transparent.png" />
      </Link>
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{
            fontWeight: "bold",
            padding: "0.8em 1.2em",
            background: "#9374ee",
            color: "white",
            marginRight: "1em",
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          All Streams
        </Link>
        <GoogleAuth />
      </div>
    </div>
  );
};

export default Header;
