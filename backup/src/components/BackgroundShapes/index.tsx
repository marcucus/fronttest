import React from "react";

const Square: React.FC<{
  position: string;
  size: string;
  translate: string;
}> = ({ position, size, translate }) => (
  <div className={`transform duration-1000 ease-in-out ${translate}`}>
    <div
      className={`absolute ${position}`}
      style={{
        animationName: "bounce",
        animationDuration: "10s",
        animationIterationCount: "infinite",
        animationTimingFunction: "ease-in-out",
      }}
    >
      <div
        className={`${size} border-2 rounded border-gray-900 opacity-5`}
        style={{
          animationName: "spin",
          animationDuration: "60s",
          animationIterationCount: "infinite",
          animationTimingFunction: "linear",
        }}
      ></div>
    </div>
  </div>
);

const Circle: React.FC<{
  position: string;
  size: string;
  translate: string;
}> = ({ position, size, translate }) => (
  <div className={`transform duration-1000 ease-in-out ${translate}`}>
    <div
      className={`absolute ${position} ${size} rounded-full border-2 border-gray-900 opacity-5`}
      style={{
        animationName: "bounce",
        animationDuration: "20s",
        animationIterationCount: "infinite",
        animationTimingFunction: "linear",
      }}
    ></div>
  </div>
);

export type Props = {
  step: number;
  error?: boolean;
  absolute?: boolean;
};

export const BackgroundShapes: React.FC<Props> = (props) => {
  const isPair = props.step % 2 === 0;

  return (
    <div
      className={`${
        props.absolute ? "absolute" : "fixed"
      } top-0 bottom-0 left-0 right-0 pointer-events-none block`}
    >
      <Square
        position="right-2 top-20"
        size="w-40 h-40"
        translate={`${
          !props.error
            ? isPair && "-translate-x-20 translate-y-0"
            : "translate-x-full"
        } `}
      />

      <Square
        position="left-32 top-96"
        size="w-24 h-24"
        translate={`${
          !props.error
            ? isPair && "-translate-x-5 translate-y-40"
            : "-translate-x-full"
        } `}
      />

      <Circle
        position="-left-6 top-32"
        size="w-60 h-60"
        translate={`${
          !props.error
            ? isPair && "-translate-x-20 translate-y-0"
            : "-translate-x-full"
        } `}
      />

      <Circle
        position="right-6 top-96"
        size="w-36 h-36"
        translate={`${
          !props.error
            ? isPair && "-translate-x-5 translate-y-40"
            : "translate-x-full"
        } `}
      />
    </div>
  );
};
