import { ChevronDownIcon, EyeIcon, PencilIcon } from "@heroicons/react/outline";

export const PropertyActions: React.FC = (props) => (
  <div className="absolute -top-2 left-0 right-0 transform -translate-y-full">
    <div className="inline-flex items-center border bg-white shadow-lg rounded divide-x">
      <div className="flex hover:bg-gray-50 p-2 px-3 text-sm items-center space-x-1 cursor-pointer">
        <span>H1</span>
        <ChevronDownIcon className="h-4 w-4" />
      </div>

      <div className="flex py-2 hover:bg-gray-50 px-3 text-sm items-center space-x-1 cursor-pointer">
        <PencilIcon className="h-4 w-4" />
      </div>

      <div className="flex py-2 hover:bg-gray-50 px-3 text-sm items-center space-x-1 cursor-pointer">
        <EyeIcon className="h-4 w-4" />
      </div>
    </div>
  </div>
);
