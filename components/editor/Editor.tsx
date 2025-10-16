"use client";

import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { Schema } from "prosemirror-model";
import { schema } from "prosemirror-schema-basic";
import { addListNodes } from "prosemirror-schema-list";
import { keymap } from "prosemirror-keymap";
import { history, undo, redo } from "prosemirror-history";
import { baseKeymap } from "prosemirror-commands";
import {
  defaultMarkdownParser,
  defaultMarkdownSerializer,
} from "prosemirror-markdown";
import { buildKeymap } from "./keymap";
import { buildInputRules } from "./inputRules";
import "./editor.css";

// Extend the basic schema with list nodes
const mySchema = new Schema({
  nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
  marks: schema.spec.marks,
});

export interface EditorHandle {
  getMarkdown: () => string;
  setMarkdown: (markdown: string) => void;
  focus: () => void;
  getView: () => EditorView | null;
}

interface EditorProps {
  initialContent?: string;
  placeholder?: string;
  onChange?: (markdown: string) => void;
  onViewReady?: (view: EditorView) => void;
  className?: string;
}

export const Editor = forwardRef<EditorHandle, EditorProps>(
  (
    {
      initialContent = "",
      placeholder = "Start writing...",
      onChange,
      onViewReady,
      className = "",
    },
    ref,
  ) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const viewRef = useRef<EditorView | null>(null);

    useImperativeHandle(ref, () => ({
      getMarkdown: () => {
        if (!viewRef.current) return "";
        return defaultMarkdownSerializer.serialize(viewRef.current.state.doc);
      },
      setMarkdown: (markdown: string) => {
        if (!viewRef.current) return;
        const doc = defaultMarkdownParser.parse(markdown);
        if (doc) {
          const state = EditorState.create({
            doc,
            plugins: viewRef.current.state.plugins,
          });
          viewRef.current.updateState(state);
        }
      },
      focus: () => {
        viewRef.current?.focus();
      },
      getView: () => viewRef.current,
    }));

    useEffect(() => {
      if (!editorRef.current) return;

      // Parse initial content
      const doc = initialContent
        ? defaultMarkdownParser.parse(initialContent)
        : mySchema.node("doc", null, [mySchema.node("paragraph")]);

      // Create editor state
      const state = EditorState.create({
        doc: doc || undefined,
        plugins: [
          buildInputRules(mySchema),
          keymap(buildKeymap(mySchema)),
          keymap(baseKeymap),
          history(),
          keymap({ "Mod-z": undo, "Mod-y": redo }),
        ],
      });

      // Create editor view
      const view = new EditorView(editorRef.current, {
        state,
        dispatchTransaction(transaction) {
          const newState = view.state.apply(transaction);
          view.updateState(newState);

          // Call onChange callback
          if (onChange && transaction.docChanged) {
            const markdown = defaultMarkdownSerializer.serialize(newState.doc);
            onChange(markdown);
          }
        },
        attributes: {
          class: "prose-editor",
          "data-placeholder": placeholder,
        },
      });

      viewRef.current = view;

      // Notify parent that view is ready
      if (onViewReady) {
        onViewReady(view);
      }

      return () => {
        view.destroy();
      };
    }, []);

    return (
      <div className={`editor-wrapper ${className}`}>
        <div ref={editorRef} />
      </div>
    );
  },
);

Editor.displayName = "Editor";
