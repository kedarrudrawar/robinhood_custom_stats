import Lottie from "react-lottie";
import animationData from "../ui/lotties/green-loading.json";
import "../ui/css/Loading.css";

export function LoadingLottie(): JSX.Element {
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
}

export default LoadingLottie;
