import React, { ReactElement, useEffect, useRef, useState } from "react";

export const Tooltip: React.FC<{
  direction: "top" | "left" | "bottom" | "right";
  align?: "left" | "right" | "center";
  label: string | ReactElement;
  fluid?: boolean;
}> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  const onEnter = () => setShow(true);
  const onLeave = () => setShow(false);

  useEffect(() => {
    ref.current?.addEventListener("mouseenter", onEnter);
    ref.current?.addEventListener("mouseleave", onLeave);

    return () => {
      ref.current?.removeEventListener("mouseenter", onEnter);
      ref.current?.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      className={`relative inline-block group ${props.fluid ? "w-full" : ""}`}
    >
      <div
        className={`absolute ${
          props.direction === "right" ? "top-0 -right-2 translate-x-full" : ""
        } ${
          props.direction === "left" ? "top-0 -left-2 -translate-x-full" : ""
        } ${props.direction === "top" ? "-top-2 -translate-y-full" : ""} ${
          props.direction === "bottom" ? "-bottom-1 translate-y-full" : ""
        } ${props.align === "right" ? "right-0" : ""} ${
          props.align === "center" ? "right-0 left-0 mx-auto" : ""
        } flex items-center justify-center h-full transition-all duration-300 ease-in-out transform opacity-0 pointer-events-none ${
          show ? "opacity-100 " : ""
        }`}
      >
        <div
          className={`${
            props.direction === "right"
              ? `${show ? "translate-x-0 " : "-translate-x-4"}`
              : ""
          } ${
            props.direction === "left"
              ? `${show ? "translate-x-0 " : "translate-x-4"}`
              : ""
          } ${
            props.direction === "top"
              ? `${show ? "translate-y-0 " : "translate-y-4"}`
              : ""
          } ${
            props.direction === "bottom"
              ? `${show ? "translate-y-0 " : "-translate-y-4"}`
              : ""
          } flex items-center text-sm justify-center px-4 py-2 font-medium text-gray-100 transition-all duration-300 ease-in-out transform bg-gray-900 rounded-md bg-opacity-90 whitespace-nowrap`}
        >
          {props.label}
        </div>
      </div>

      <div ref={ref}>{props.children}</div>
    </div>
  );
};
