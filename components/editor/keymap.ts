import { Schema } from "prosemirror-model";
import { toggleMark, setBlockType, wrapIn } from "prosemirror-commands";
import {
  wrapInList,
  splitListItem,
  liftListItem,
  sinkListItem,
} from "prosemirror-schema-list";

export function buildKeymap(schema: Schema) {
  const keys: { [key: string]: any } = {};

  // Text formatting
  if (schema.marks.strong) {
    keys["Mod-b"] = toggleMark(schema.marks.strong);
    keys["Mod-B"] = toggleMark(schema.marks.strong);
  }
  if (schema.marks.em) {
    keys["Mod-i"] = toggleMark(schema.marks.em);
    keys["Mod-I"] = toggleMark(schema.marks.em);
  }
  if (schema.marks.code) {
    keys["Mod-`"] = toggleMark(schema.marks.code);
  }

  // Headings
  for (let i = 1; i <= 6; i++) {
    if (schema.nodes.heading) {
      keys[`Mod-Shift-${i}`] = setBlockType(schema.nodes.heading, {
        level: i,
      });
    }
  }

  // Paragraph
  if (schema.nodes.paragraph) {
    keys["Mod-Alt-0"] = setBlockType(schema.nodes.paragraph);
    keys["Mod-0"] = setBlockType(schema.nodes.paragraph);
  }

  // Code block
  if (schema.nodes.code_block) {
    keys["Shift-Ctrl-\\"] = setBlockType(schema.nodes.code_block);
  }

  // Blockquote
  if (schema.nodes.blockquote) {
    keys["Ctrl->"] = wrapIn(schema.nodes.blockquote);
  }

  // Lists
  if (schema.nodes.bullet_list) {
    keys["Shift-Ctrl-8"] = wrapInList(schema.nodes.bullet_list);
  }
  if (schema.nodes.ordered_list) {
    keys["Shift-Ctrl-9"] = wrapInList(schema.nodes.ordered_list);
  }
  if (schema.nodes.list_item) {
    keys["Enter"] = splitListItem(schema.nodes.list_item);
    keys["Mod-["] = liftListItem(schema.nodes.list_item);
    keys["Mod-]"] = sinkListItem(schema.nodes.list_item);
  }

  // Horizontal rule
  if (schema.nodes.horizontal_rule) {
    keys["Mod-_"] = (state: any, dispatch: any) => {
      dispatch(
        state.tr.replaceSelectionWith(schema.nodes.horizontal_rule.create())
      );
      return true;
    };
  }

  return keys;
}
