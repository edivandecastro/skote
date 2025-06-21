import React from "react";
import { RotatingLines } from "react-loader-spinner";

const Button = ({ loading, label, t }) => {
  return (
    <button type="submit" className="btn btn-primary w-md" disabled={loading}>
      <RotatingLines
        visible={loading}
        height="20"
        width="20"
        strokeColor="#ffffff"
        strokeWidth="5"
        animationDuration="0.50"
        ariaLabel="rotating-lines-loading"
      />

      <span className={loading && "ml-5"}>
        {loading ? t("Wait") : label}
      </span>
    </button >
  );
};

Button.defaultProps = {
  loading: false
};

export default Button;
