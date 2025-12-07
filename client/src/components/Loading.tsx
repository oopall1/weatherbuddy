import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Loading = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <DotLottieReact autoplay loop src="/animations/thermometer.lottie" />
    </div>
  );
};

export default Loading;
