import { HeadingEntity } from "../../../../entities/EditorEntity";

export const Heading: React.FC<HeadingEntity["value"]> = (props) => {
  return <h1 className="max-w-7xl text-3xl mx-auto">{props.value}</h1>;
};
