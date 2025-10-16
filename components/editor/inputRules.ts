import {
  inputRules,
  wrappingInputRule,
  textblockTypeInputRule,
  smartQuotes,
  emDash,
  ellipsis,
  InputRule,
} from "prosemirror-inputrules";
import { Schema } from "prosemirror-model";
import { EditorState, Transaction } from "prosemirror-state";

// Helper to create heading input rules
function headingRule(level: number, schema: Schema) {
  return textblockTypeInputRule(
    new RegExp("^(#{1," + level + "})\\s$"),
    schema.nodes.heading,
    () => ({ level }),
  );
}

// Helper to create a code block input rule
function codeBlockRule(schema: Schema) {
  return textblockTypeInputRule(/^```$/, schema.nodes.code_block);
}

// Helper to create a blockquote input rule
function blockquoteRule(schema: Schema) {
  return wrappingInputRule(/^\s*>\s$/, schema.nodes.blockquote);
}

export function buildInputRules(schema: Schema) {
  const rules: InputRule[] = [...smartQuotes, emDash, ellipsis];

  // Add heading rules (# to ######)
  if (schema.nodes.heading) {
    for (let i = 1; i <= 6; i++) {
      rules.push(headingRule(i, schema));
    }
  }

  // Add code block rule
  if (schema.nodes.code_block) {
    rules.push(codeBlockRule(schema));
  }

  // Add blockquote rule
  if (schema.nodes.blockquote) {
    rules.push(blockquoteRule(schema));
  }

  // Add list rules
  if (schema.nodes.bullet_list) {
    rules.push(wrappingInputRule(/^\s*([-+*])\s$/, schema.nodes.bullet_list));
  }
  if (schema.nodes.ordered_list) {
    rules.push(
      wrappingInputRule(
        /^(\d+)\.\s$/,
        schema.nodes.ordered_list,
        (match: string[]) => ({ order: +match[1] }),
        (match: string[], node: any) =>
          node.childCount + node.attrs.order === +match[1],
      ),
    );
  }

  // Add horizontal rule
  if (schema.nodes.horizontal_rule) {
    rules.push(
      new InputRule(
        /^(?:---|___\s|\*\*\*\s)$/,
        (
          state: EditorState,
          match: RegExpMatchArray,
          start: number,
          end: number,
        ): Transaction | null => {
          const tr = state.tr.replaceWith(
            start - 1,
            end,
            schema.nodes.horizontal_rule.create(),
          );
          return tr;
        },
      ),
    );
  }

  return inputRules({ rules });
}
