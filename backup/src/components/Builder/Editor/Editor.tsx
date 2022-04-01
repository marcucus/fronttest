import React from "react";
import {
  BlockEntity,
  BlockTypes,
  HeadingEntity,
  MarketingHero1Entity,
} from "../../../entities/EditorEntity";
import { CreateBlockModal } from "../CreateBlockModal/CreateBlockModal";
import { UpdateBlockModal } from "../UpdateBlockModal/UpdateBlockModal";
import { Heading } from "../public/Heading/Heading";
import { Hero } from "../public/Hero/Hero";

import { connector, ContainerProps } from "./containers/Editor.containers";
import { Empty } from "../Empty/Empty";
import { BlockActions } from "../BlockActions/BlockActions";
import { Tooltip } from "../../UI/Tooltip";

const Xray: React.FC<{
  onUp: () => void;
  onDown: () => void;
  onCreateBefore: () => void;
  onRemove: () => void;
  onCreateAfter: () => void;
  onEdit: () => void;
}> = (props) => {
  return (
    <div className="relative group">
      <div className="absolute group-hover:opacity-100 transition-opacity pt-2 duration-300 ease-in-out opacity-0 z-10 px-2 top-0 left-0 right-0 grid grid-cols-3">
        <div></div>
        <div className="flex items-center justify-center space-x-2"></div>
        <div className="flex items-center justify-end space-x-2">
          <Tooltip
            direction="bottom"
            align="center"
            label={"Déplacer vers le haut"}
          >
            <BlockActions type="up" onClick={props.onUp} />
          </Tooltip>
          <Tooltip
            direction="bottom"
            align="center"
            label={"Déplacer vers le bas"}
          >
            <BlockActions type="down" onClick={props.onDown} />
          </Tooltip>
          <Tooltip direction="bottom" align="center" label={"Supprimer"}>
            <BlockActions type="trash" onClick={props.onRemove} />
          </Tooltip>
          <Tooltip
            direction="bottom"
            align="right"
            label={"Modifier le contenu"}
          >
            <BlockActions type="edit" onClick={props.onEdit} />
          </Tooltip>
        </div>
      </div>

      {props.children}

      <div
        className="w-full h-2 bg-blue-200 transition-all duration-300 ease-in-out opacity-50 group-hover:opacity-100 hover:bg-blue-500 cursor-pointer"
        onClick={props.onCreateAfter}
      ></div>
    </div>
  );
};

type Props = {
  blocks: BlockEntity[];
  onCreateBefore: ({ id }: { id: string }) => void;
  onCreateAfter: ({ id }: { id: string }) => void;
  onRemove: ({ id }: { id: string }) => void;
  onUp: ({ id }: { id: string }) => void;
  onDown: ({ id }: { id: string }) => void;
  onEdit: ({ id }: { id: string }) => void;
};

export const Wrapper: React.FC<Props> = (props) => {
  return (
    <div>
      {props.blocks.length === 0 && (
        <Empty onCreate={() => props.onCreateAfter({ id: "" })} />
      )}

      {props.blocks.map(({ id, type, value }) => {
        return (
          <Xray
            onCreateAfter={() => {
              props.onCreateAfter({ id });
            }}
            onCreateBefore={() => {
              props.onCreateBefore({ id });
            }}
            onUp={() => {
              props.onUp({ id });
            }}
            onDown={() => {
              props.onDown({ id });
            }}
            onRemove={() => {
              props.onRemove({ id });
            }}
            onEdit={() => {
              props.onEdit({ id });
            }}
          >
            {type === BlockTypes.HERO_1 && (
              <Hero {...(value as MarketingHero1Entity["value"])} />
            )}
            {type === BlockTypes.HEADING && (
              <Heading {...(value as HeadingEntity["value"])} />
            )}
          </Xray>
        );
      })}

      <UpdateBlockModal />
      <CreateBlockModal />
    </div>
  );
};

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
);

export const Editor = connector(Container);
