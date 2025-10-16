"use client";

import { EditorView } from "prosemirror-view";
import { toggleMark, setBlockType, wrapIn } from "prosemirror-commands";
import { wrapInList } from "prosemirror-schema-list";
import { undo, redo } from "prosemirror-history";
import {
  Bold,
  Italic,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Minus,
  Undo,
  Redo,
  Type,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ToolbarProps {
  view: EditorView | null;
}

export function Toolbar({ view }: ToolbarProps) {
  if (!view) return null;

  const { state, dispatch } = view;
  const { schema } = state;

  const isActive = (name: string) => {
    const { from, to } = state.selection;
    return state.doc.rangeHasMark(from, to, schema.marks[name]);
  };

  const isBlockActive = (name: string, attrs?: any) => {
    const { $from } = state.selection;
    const node = $from.parent;
    return (
      node.type.name === name &&
      (!attrs ||
        Object.keys(attrs).every((key) => node.attrs[key] === attrs[key]))
    );
  };

  const handleCommand = (command: any) => {
    return () => {
      command(state, dispatch);
      view.focus();
    };
  };

  return (
    <div className="flex items-center gap-1 border-b border-border/40 px-3 py-2 flex-wrap">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={handleCommand(undo)}
        className="h-8 w-8 p-0"
        title="Undo (Cmd+Z)"
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={handleCommand(redo)}
        className="h-8 w-8 p-0"
        title="Redo (Cmd+Y)"
      >
        <Redo className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-border mx-1" />

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={handleCommand(toggleMark(schema.marks.strong))}
        className={`h-8 w-8 p-0 ${isActive("strong") ? "bg-muted" : ""}`}
        title="Bold (Cmd+B)"
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={handleCommand(toggleMark(schema.marks.em))}
        className={`h-8 w-8 p-0 ${isActive("em") ? "bg-muted" : ""}`}
        title="Italic (Cmd+I)"
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={handleCommand(toggleMark(schema.marks.code))}
        className={`h-8 w-8 p-0 ${isActive("code") ? "bg-muted" : ""}`}
        title="Code (Cmd+`)"
      >
        <Code className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-border mx-1" />

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={handleCommand(setBlockType(schema.nodes.paragraph))}
        className={`h-8 w-8 p-0 ${isBlockActive("paragraph") ? "bg-muted" : ""}`}
        title="Paragraph (Cmd+0)"
      >
        <Type className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={handleCommand(
          setBlockType(schema.nodes.heading, { level: 1 }),
        )}
        className={`h-8 w-8 p-0 ${isBlockActive("heading", { level: 1 }) ? "bg-muted" : ""}`}
        title="Heading 1 (Cmd+Shift+1)"
      >
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={handleCommand(
          setBlockType(schema.nodes.heading, { level: 2 }),
        )}
        className={`h-8 w-8 p-0 ${isBlockActive("heading", { level: 2 }) ? "bg-muted" : ""}`}
        title="Heading 2 (Cmd+Shift+2)"
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={handleCommand(
          setBlockType(schema.nodes.heading, { level: 3 }),
        )}
        className={`h-8 w-8 p-0 ${isBlockActive("heading", { level: 3 }) ? "bg-muted" : ""}`}
        title="Heading 3 (Cmd+Shift+3)"
      >
        <Heading3 className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-border mx-1" />

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={handleCommand(wrapInList(schema.nodes.bullet_list))}
        className="h-8 w-8 p-0"
        title="Bullet List (Shift+Ctrl+8)"
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={handleCommand(wrapInList(schema.nodes.ordered_list))}
        className="h-8 w-8 p-0"
        title="Ordered List (Shift+Ctrl+9)"
      >
        <ListOrdered className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-border mx-1" />

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={handleCommand(wrapIn(schema.nodes.blockquote))}
        className="h-8 w-8 p-0"
        title="Blockquote (Ctrl+>)"
      >
        <Quote className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => {
          const tr = state.tr.replaceSelectionWith(
            schema.nodes.horizontal_rule.create(),
          );
          dispatch(tr);
          view.focus();
        }}
        className="h-8 w-8 p-0"
        title="Horizontal Rule"
      >
        <Minus className="h-4 w-4" />
      </Button>
    </div>
  );
}
