import { Transition } from "@headlessui/react";
import Logo from "../../assets/logo/logo.svg";
import Google from "../../assets/socials/google.svg";
import Pattern from "../../assets/background/clouds.svg";
import { BackgroundShapes } from "../BackgroundShapes";
import { connector, ContainerProps } from "./containers/Login.containers";
import { FormattedMessage } from "../FormattedMessage/FormattedMessage";

type Props = {
  onLogin: () => void;
};

const LoginBtn: React.FC<{ onClick: () => void }> = (props) => (
  <div
    onClick={props.onClick}
    className="inline-flex items-center w-full px-2 py-2 mt-8 text-lg font-medium text-gray-900 transition-all duration-300 ease-in-out bg-white rounded-full shadow-lg cursor-pointer lg:mt-0 hover:bg-gray-50 hover:shadow-sm"
  >
    <img src={Google} alt="Google" className="flex-shrink-0 w-9" />
    <div className="mx-auto">
      <FormattedMessage id="signin/google" />
    </div>
  </div>
);

export const Shadow = () => (
  <div
    className="fixed inset-0 hidden w-full h-full pointer-events-none lg:block"
    style={{
      boxShadow: "0 0px 80px inset rgba(0,0,0,0.2)",
    }}
  ></div>
);

export const Wrapper: React.FC<Props> = (props) => {
  return (
    <div className="h-screen bg-gradient-to-b from-white to-gray-300">
      <div className="hidden min-h-full lg:grid lg:grid-cols-2">
        <div className="items-center justify-center flex-1 hidden p-4 lg:flex">
          <Transition
            show
            appear
            className="relative z-10 flex items-center justify-center w-full h-full overflow-hidden transform rounded-md shadow-2xl bg-gradient-to-b from-gray-800 to-black"
            enter="duration-1000 transition-all ease-in-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
          >
            <div
              className="absolute top-0 w-full h-full b-0 opacity-20"
              style={{
                backgroundImage: `url(${Pattern})`,
              }}
            ></div>

            <div className="relative w-full max-w-md pb-20">
              <h1 className="mt-8 text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-yellow-300">
                <FormattedMessage id="signin/title" />
              </h1>
              <h2 className="mt-8 text-lg text-gray-400">
                <FormattedMessage id="signin/description" />
              </h2>
            </div>
          </Transition>
        </div>

        <div className="relative flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="w-full max-w-sm mx-auto lg:w-96">
            <div className="w-full mt-8 text-center">
              <Transition
                show
                appear
                className={"transform"}
                enter="duration-1000 delay-500 transition-all ease-in-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
              >
                <LoginBtn onClick={props.onLogin} />
              </Transition>
            </div>
          </div>

          <div className="hidden lg:block">
            <BackgroundShapes absolute step={0} />
          </div>
        </div>
      </div>

      <div className="relative z-10 flex justify-center w-full h-full p-8 shadow-2xl lg:hidden bg-gradient-to-b from-gray-800 to-black">
        <div className="w-full max-w-md">
          <div>
            <img src={Logo} alt="logo" className="h-auto w-7" />
          </div>
          <h1 className="mt-8 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-yellow-300">
            <FormattedMessage id="signin/title" />
          </h1>
          <h2 className="mt-8 text-lg text-gray-400">
            <FormattedMessage id="signin/description" />
          </h2>

          <LoginBtn onClick={props.onLogin} />
        </div>
      </div>
    </div>
  );
};

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
);

export const Login = connector(Container);
