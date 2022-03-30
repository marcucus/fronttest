import React from "react";
import { Link } from "@reach/router";

type Props = {
  to: string;
};

export const Cancel: React.FC<Props> = (props) => (
  <div className="absolute top-0 left-0 p-4">
    <Link
      to={props.to}
      className={`group flex items-center cursor-pointer transform duration-300 transition-all`}
    >
      <div className="relative z-10 p-2 text-gray-400 transition-all duration-300 ease-in-out rounded bg-gray-50 group-hover:bg-gray-200 group-hover:text-gray-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-7 w-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <div className="p-2 text-sm font-semibold text-gray-600 uppercase transition-all duration-300 ease-in-out transform -translate-x-8 opacity-0 group-hover:opacity-100 group-hover:translate-x-0">
        {props.children}
      </div>
    </Link>
  </div>
);
