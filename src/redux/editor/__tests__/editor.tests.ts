import { BlockTypes, HeadingEntity } from "../../../entities/EditorEntity";
import { createStoreForTests } from "../../../utils/createStoreForTests";

describe("editor test suite", () => {
  beforeAll(() => {
    jest
      .useFakeTimers("modern")
      .setSystemTime(new Date("2020-01-01").getTime());
  });

  it("should be able to create a heading block", () => {
    const { store, actions } = createStoreForTests();

    expect(store.getState().editor.blocks).toHaveLength(0);

    store.dispatch<any>(
      actions.editor.createBlock({ type: BlockTypes.HEADING })
    );

    expect(store.getState().editor.blocks).toHaveLength(1);
    expect(store.getState().editor.blocks[0].type).toEqual(BlockTypes.HEADING);
  });

  it("should be able change value of property", () => {
    const { store, actions } = createStoreForTests();

    expect(store.getState().editor.blocks).toHaveLength(0);

    store.dispatch<any>(
      actions.editor.createBlock({ type: BlockTypes.HEADING })
    );

    let beforeBlock = store.getState().editor.blocks[0] as HeadingEntity;

    expect(beforeBlock.value.value).not.toEqual("hello");

    store.dispatch<any>(
      actions.editor.changeValue({
        id: beforeBlock.id,
        value: { value: "hello" },
      })
    );

    const updatedBlock = store.getState().editor.blocks[0] as HeadingEntity;

    expect(updatedBlock).toEqual({
      ...beforeBlock,
      value: {
        ...beforeBlock.value,
        value: "hello",
      },
    });
  });

  it("should be able to change order of block", () => {
    const { store, actions } = createStoreForTests();

    expect(store.getState().editor.blocks).toHaveLength(0);

    store.dispatch<any>(
      actions.editor.createBlock({ type: BlockTypes.HEADING })
    );
    store.dispatch<any>(
      actions.editor.createBlock({ type: BlockTypes.HEADING })
    );
    store.dispatch<any>(
      actions.editor.createBlock({ type: BlockTypes.HEADING })
    );

    expect(store.getState().editor.blocks).toHaveLength(3);

    const [first, second, last] = store.getState().editor.blocks;

    store.dispatch<any>(actions.editor.up({ id: last.id }));

    expect(store.getState().editor.blocks[1].id).toEqual(last.id);

    store.dispatch<any>(actions.editor.up({ id: last.id }));

    expect(store.getState().editor.blocks[0].id).toEqual(last.id);

    store.dispatch<any>(actions.editor.down({ id: last.id }));

    expect(store.getState().editor.blocks[1].id).toEqual(last.id);
  });

  it("should be able to remove a block", () => {
    const { store, actions } = createStoreForTests();

    expect(store.getState().editor.blocks).toHaveLength(0);

    store.dispatch<any>(
      actions.editor.createBlock({ type: BlockTypes.HEADING })
    );

    expect(store.getState().editor.blocks).toHaveLength(1);

    store.dispatch<any>(
      actions.editor.removeBlock({ id: store.getState().editor.blocks[0].id })
    );

    expect(store.getState().editor.blocks).toHaveLength(0);
  });

  it("should be able to open/close actions", () => {
    const { store, actions } = createStoreForTests();

    expect(store.getState().editor.blocks).toHaveLength(0);

    store.dispatch<any>(
      actions.editor.createBlock({ type: BlockTypes.HEADING })
    );

    const [block] = store.getState().editor.blocks;

    store.dispatch<any>(actions.editor.openActions({ blockId: block.id }));

    expect(store.getState().editor.actions.isOpen).toEqual(true);
    expect(store.getState().editor.actions.blockId).toEqual(block.id);

    store.dispatch<any>(actions.editor.closeActions({ blockId: block.id }));

    expect(store.getState().editor.actions.isOpen).toEqual(false);
    expect(store.getState().editor.actions.blockId).toEqual(null);
  });

  it("should be able to open/close edition mode", () => {
    const { store, actions } = createStoreForTests();

    expect(store.getState().editor.blocks).toHaveLength(0);

    store.dispatch<any>(
      actions.editor.createBlock({ type: BlockTypes.HEADING })
    );

    const [block] = store.getState().editor.blocks;

    store.dispatch<any>(actions.editor.openEdit({ id: block.id }));

    expect(store.getState().editor.edition.isOpen).toEqual(true);
    expect(store.getState().editor.edition.blockIdToBeEdited).toEqual(block.id);

    store.dispatch<any>(actions.editor.closeEdit({}));

    expect(store.getState().editor.edition.isOpen).toEqual(false);
    expect(store.getState().editor.edition.blockIdToBeEdited).toEqual(null);

  });
});
