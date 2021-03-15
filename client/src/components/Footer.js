import React from "react";

const Footer = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        paddingTop: "4em",
        paddingBottom: "2em",
        textAlign: "center",
        fontSize: "1.2em",
      }}
    >
      <div>
        Copyright &copy; {new Date().getFullYear()} | Made with ❤️ by Mia Le
      </div>
      <div>
        Contact:{" "}
        <a href="mailto:minhanhle2410@gmail.com">minhanhle2410@gmail.com</a>
      </div>
    </div>
  );
};

export default Footer;
