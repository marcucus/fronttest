import { useState } from "react";
import { PropertyActions } from "../PropertyActions/PropertyActions";

export const Xray: React.FC<{ visible: boolean; className?: string }> = (
  props
) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <div
      onClick={() => setShowActions(true)}
      className={`${props.className || ""} ${
        props.visible
          ? "border-opacity-0"
          : "border-opacity-100 cursor-pointer hover:border-blue-500"
      } border-2 relative  transition-all duration-150 ease-in-out border-blue-200 border-dashed hover:border-opacity-100`}
    >
      {showActions && <PropertyActions />}

      {props.visible && props.children}
    </div>
  );
};
