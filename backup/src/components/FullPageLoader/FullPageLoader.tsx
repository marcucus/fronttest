import {
  connector,
  ContainerProps,
} from "./containers/FullPageLoader.containers";

export const Wrapper: React.FC<{ show: boolean }> = (props) => {
  return props.show ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-90">
      <div
        className="w-20 h-20 border-8 border-gray-200 rounded-full animate-spin"
        style={{ borderTopColor: "rgb(59, 130, 246)" }}
      ></div>
    </div>
  ) : (
    <></>
  );
};

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
);

export const FullPageLoader = connector(Container);
