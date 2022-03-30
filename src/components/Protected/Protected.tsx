import React, { useEffect } from "react";
import { connector, ContainerProps } from "./containers/Protected.containers";

type Props = {
  onMount: () => void;
  showComponent: boolean;
};

export const Wrapper: React.FC<Props> = (props) => {
  useEffect(() => {
    props.onMount();
  }, []);

  if (props.showComponent) return <>{props.children}</>;

  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className="w-20 h-20 border-8 border-gray-200 rounded-full animate-spin"
        style={{ borderTopColor: "rgb(59, 130, 246)" }}
      ></div>
    </div>
  );
};

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
);

export const Protected = connector(Container);
