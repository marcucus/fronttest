import React from "react";

export const As: React.FC<{
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div" | "p";
  className?: string;
  id?: string;
}> = ({ tag, ...props }) => {
  return React.createElement(tag, {
    ...props,
  });
};
