import {
  PlusIcon,
  TrashIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/solid";

export const BlockActions: React.FC<{
  type: "add" | "trash" | "up" | "down" | "edit";
  onClick?: () => void;
}> = (props) => (
  <div
    onClick={() => props.onClick && props.onClick()}
    className="p-2 cursor-pointer hover:bg-gray-50 text-gray-700 rounded border bg-white"
  >
    {props.type === "add" && <PlusIcon className="h-4 w-4" />}
    {props.type === "trash" && <TrashIcon className="h-4 w-4" />}
    {props.type === "up" && <ArrowUpIcon className="h-4 w-4" />}
    {props.type === "down" && <ArrowDownIcon className="h-4 w-4" />}
    {props.type === "edit" && <DotsHorizontalIcon className="h-4 w-4" />}
  </div>
);
