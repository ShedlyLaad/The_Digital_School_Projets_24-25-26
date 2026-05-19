import React from "react";
import "./auth.css";

const AuthLayout = ({ children, title }) => {
  return (
    <div className="auth-background">
      <div className="container">
        <div className="left">
          <h1 className="title">
            Bienvenue sur notre plateforme <br />
            <span>pour votre organisation</span>
          </h1>
          <p className="subtitle">
            Pour Simplifier Votre Vie Accedez à Notre Site.
          </p>
        </div>
        <div className="right">
          <div className="shape shape1"></div>
          <div className="shape shape2"></div>
          <div className="form-wrapper">
            <h2 style={{ textAlign: "center", marginBottom: 24 }}>{title}</h2>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
