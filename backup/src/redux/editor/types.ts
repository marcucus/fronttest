import { BlockTypes } from "../../entities/EditorEntity";

export const createBlock = "editor/createBlock";
export interface createBlockAction {
  type: typeof createBlock;
  payload: {
    after?: string;
    type: BlockTypes;
  };
}

export const removeBlock = "editor/removeBlock";
export interface removeBlockAction {
  type: typeof removeBlock;
  payload: {
    id: string;
  };
}

export const openActions = "editor/openActions";
export interface openActionsAction {
  type: typeof openActions;
  payload: {
    blockId: string;
  };
}

export const closeActions = "editor/closeActions";
export interface closeActionsAction {
  type: typeof closeActions;
  payload: {};
}

export const openEdit = "editor/openEdit";
export interface openEditAction {
  type: typeof openEdit;
  payload: {
    id: string;
  };
}

export const closeEdit = "editor/closeEdit";
export interface closeEditAction {
  type: typeof closeEdit;
  payload: {};
}

export const changeValue = "editor/changeValue";
export interface changeValueAction {
  type: typeof changeValue;
  payload: {
    id: string;
    value: { [key: string]: any };
  };
}

export const up = "editor/up";
export interface upAction {
  type: typeof up;
  payload: {
    id: string;
  };
}

export const down = "editor/down";
export interface downAction {
  type: typeof down;
  payload: {
    id: string;
  };
}

export const updateBlockType = "editor/updateBlockType";
export interface updateBlockTypeAction {
  type: typeof updateBlockType;
  payload: {
    id: string;
    type: BlockTypes;
  };
}

export const updateBlockValue = "editor/updateBlockValue";
export interface updateBlockValueAction {
  type: typeof updateBlockValue;
  payload: {
    id: string;
    value: string;
  };
}

export const openDropdown = "editor/openDropdown";
export interface openDropdownAction {
  type: typeof openDropdown;
  payload: {
    blockIdWhereDropdownWasOpen: string | null;
    addBefore: boolean;
    addAfter: boolean;
  };
}

export const closeDropdown = "editor/closeDropdown";
export interface closeDropdownAction {
  type: typeof closeDropdown;
  payload: {};
}

export const runShortcut = "editor/runShortcut";
export interface runShortcutAction {
  type: typeof runShortcut;
  payload: {
    id: string;
    value: string;
  };
}

export type EditorActionTypes =
  | createBlockAction
  | removeBlockAction
  | updateBlockValueAction
  | openDropdownAction
  | closeDropdownAction
  | runShortcutAction
  | upAction
  | downAction
  | changeValueAction
  | openEditAction
  | openActionsAction
  | closeActionsAction
  | closeEditAction
  | updateBlockTypeAction;
