import React from "react";
import Lottie from "react-lottie";
import animationData from "../../UI/lotties/green-loading.json";
import "../../UI/css/Loading.css";

const Loading = (props) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  return (
    <div className="animation-container">
      <div className="animation">
        <Lottie options={defaultOptions} height={65} width={65} />
      </div>
    </div>
  );
};

export default Loading;
