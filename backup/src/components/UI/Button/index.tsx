const BaseStyle =
  "inline-flex items-center px-3 h-10 font-medium text-sm transition duration-300 ease-in-out rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2";

const BigStyle =
  "inline-flex items-center justify-center px-5 h-14 text-lg font-medium transition-all duration-300 transform rounded-md";

type ButtonProps = {
  onClick?: () => void;
  size?: "md" | "lg";
};

export const ButtonPrimary: React.FC<ButtonProps> = ({
  children,
  ...props
}) => {
  const style = props.size === "lg" ? BigStyle : BaseStyle;
  return (
    <button
      onClick={props.onClick}
      type="button"
      className={`${style} bg-yellow-400 h- hover:bg-yellow-300 text-gray-900 focus:ring-yellow-500`}
    >
      {children}
    </button>
  );
};

export const ButtonSecondary: React.FC<ButtonProps> = ({
  children,
  ...props
}) => {
  const style = props.size === "lg" ? BigStyle : BaseStyle;

  return (
    <button
      type="button"
      onClick={props.onClick}
      className={`${style} text-gray-900 hover:bg-yellow-100 bg-gray-50 hover:text-yellow-900 focus:ring-yellow-500`}
    >
      {children}
    </button>
  );
};
