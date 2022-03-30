import * as types from "./types";
import { v4 } from "uuid";
import {
  BlockEntity,
  BlockTypes,
  HeadingEntity,
  MarketingHero1Entity,
  Paragraph,
} from "../../entities/EditorEntity";
import { mergeDeepLeft, move } from "ramda";

const createEmptyBlock = (): Paragraph => ({
  id: v4(),
  type: BlockTypes.TEXT,
  value: "",
});

const createMarketingHeroV1Block = (): MarketingHero1Entity => ({
  id: v4(),
  type: BlockTypes.HERO_1,
  value: {
    title: {
      component: "h1",
      value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      visible: true,
    },
    description: {
      component: "div",
      value:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      visible: true,
    },
    image: {
      alt: "",
      dimensions: [],
      value: "",
      visible: true,
    },
    label: {
      value: "Lorem ipsum",
      href: null,
      visible: true,
    },
    badge: {
      value: "LOREM IPSUM",
      visible: true,
    },
    input: {
      placeholder: "Lorem ipsum dolor",
      action: "GET",
      method: "GET",
      type: "email",
      visible: true,
    },
    button: {
      value: "Ut enim ad",
      visible: true,
    },
    logo: {
      alt: "Lorem Ipsum",
      value: "",
      visible: true,
    },
  },
});

const createHeadingBlock = (): HeadingEntity => ({
  id: v4(),
  type: BlockTypes.HEADING,
  value: {
    component: "h1",
    value: "Lorem Ipsum dolor sit amet",
    id: "lorem-ipsum",
  },
});

const createDefaultBlock = (props: { type: BlockTypes }) => {
  if (props.type === BlockTypes.HERO_1) return createMarketingHeroV1Block();
  if (props.type === BlockTypes.HEADING) return createHeadingBlock();
  return createEmptyBlock();
};

interface EditorState {
  blocks: BlockEntity[];
  dropdown: {
    isOpen: boolean;
    blockIdWhereDropdownWasOpen: string | null;
    addBefore: boolean;
    addAfter: boolean;
  };
  edition: {
    isOpen: boolean;
    blockIdToBeEdited: string | null;
  };
  actions: {
    isOpen: boolean;
    blockId: string | null;
  };
}

const initialState: EditorState = {
  blocks: [],
  dropdown: {
    isOpen: false,
    addAfter: false,
    addBefore: false,
    blockIdWhereDropdownWasOpen: null,
  },
  edition: {
    isOpen: false,
    blockIdToBeEdited: null,
  },
  actions: {
    isOpen: false,
    blockId: null,
  },
};

export function editorReducer(
  state = initialState,
  action: types.EditorActionTypes
): EditorState {
  if (action.type === types.createBlock) {
    const block = createDefaultBlock({ type: action.payload.type });
    const blocks = !action.payload.after
      ? [...state.blocks, block]
      : state.blocks.flatMap((element) => {
          if (element.id === action.payload.after) return [element, block];
          return element;
        });

    return {
      ...state,
      blocks,
    };
  }

  if (action.type === types.up) {
    const findIndex = state.blocks.findIndex(
      ({ id }) => id === action.payload.id
    );

    if (findIndex === undefined) return state;

    return {
      ...state,
      blocks: move(findIndex, findIndex - 1, state.blocks),
    };
  }

  if (action.type === types.changeValue) {
    return {
      ...state,
      // @ts-ignore
      blocks: state.blocks.map((block) => {
        if (block.id !== action.payload.id) return block;
        return {
          ...block,
          value: mergeDeepLeft(action.payload.value, block.value as any),
        };
      }),
    };
  }

  if (action.type === types.openActions) {
    return {
      ...state,
      actions: {
        ...state.actions,
        isOpen: true,
        blockId: action.payload.blockId,
      },
    };
  }

  if (action.type === types.closeActions) {
    return {
      ...state,
      actions: {
        ...initialState.actions,
      },
    };
  }

  if (action.type === types.down) {
    const findIndex = state.blocks.findIndex(
      ({ id }) => id === action.payload.id
    );

    if (findIndex === undefined) return { ...state };

    return {
      ...state,
      blocks: move(findIndex, findIndex + 1, [...state.blocks]),
    };
  }

  if (action.type === types.openDropdown) {
    return {
      ...state,
      dropdown: {
        isOpen: true,
        blockIdWhereDropdownWasOpen: action.payload.blockIdWhereDropdownWasOpen,
        addAfter: action.payload.addAfter,
        addBefore: action.payload.addBefore,
      },
    };
  }

  if (action.type === types.closeDropdown) {
    return {
      ...state,
      dropdown: {
        ...initialState.dropdown,
      },
    };
  }

  if (action.type === types.removeBlock) {
    return {
      ...state,
      blocks: state.blocks.filter((block) => {
        if (block.id === action.payload.id) return false;
        return true;
      }),
    };
  }

  if (action.type === types.openEdit) {
    return {
      ...state,
      edition: {
        isOpen: true,
        blockIdToBeEdited: action.payload.id,
      },
    };
  }

  if (action.type === types.closeEdit) {
    return {
      ...state,
      edition: {
        ...initialState.edition,
      },
    };
  }

  return state;
}
