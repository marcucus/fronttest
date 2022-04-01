import * as types from "./types";

export const createBlock = (
  payload: types.createBlockAction["payload"]
): types.EditorActionTypes => ({
  type: types.createBlock,
  payload,
});

export const up = (
  payload: types.upAction["payload"]
): types.EditorActionTypes => ({
  type: types.up,
  payload,
});

export const openActions = (
  payload: types.openActionsAction["payload"]
): types.EditorActionTypes => ({
  type: types.openActions,
  payload,
});

export const closeActions = (
  payload: types.closeActionsAction["payload"]
): types.EditorActionTypes => ({
  type: types.closeActions,
  payload,
});

export const changeValue = (
  payload: types.changeValueAction["payload"]
): types.EditorActionTypes => ({
  type: types.changeValue,
  payload,
});

export const down = (
  payload: types.downAction["payload"]
): types.EditorActionTypes => ({
  type: types.down,
  payload,
});

export const removeBlock = (
  payload: types.removeBlockAction["payload"]
): types.EditorActionTypes => ({
  type: types.removeBlock,
  payload,
});

export const openEdit = (
  payload: types.openEditAction["payload"]
): types.EditorActionTypes => ({
  type: types.openEdit,
  payload,
});

export const closeEdit = (
  payload: types.closeEditAction["payload"]
): types.EditorActionTypes => ({
  type: types.closeEdit,
  payload,
});

export const updateBlockType = (
  payload: types.updateBlockTypeAction["payload"]
): types.EditorActionTypes => ({
  type: types.updateBlockType,
  payload,
});

export const updateBlockValue = (
  payload: types.updateBlockValueAction["payload"]
): types.EditorActionTypes => {
  return {
    type: types.updateBlockValue,
    payload,
  };
};

export const openDropdown = (
  payload: types.openDropdownAction["payload"]
): types.EditorActionTypes => ({
  type: types.openDropdown,
  payload,
});

export const closeDropdown = (
  payload: types.closeDropdownAction["payload"]
): types.EditorActionTypes => ({
  type: types.closeDropdown,
  payload,
});

export const runShortcut = (
  payload: types.runShortcutAction["payload"]
): types.EditorActionTypes => ({
  type: types.runShortcut,
  payload,
});
