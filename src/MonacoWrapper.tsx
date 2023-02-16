// we import ...editor.api instead of just monaco-editor in order not to break the monac-webpack-plugin
// see: https://github.com/react-monaco-editor/react-monaco-editor/issues/142#issue-349223299
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import type { ReactElement } from "react";
import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import "./MonacoWrapper.css";

type MonacoEditor = monaco.editor.IStandaloneCodeEditor;

const Root = styled.div`
  flex-grow: 1;
  overflow: hidden;
`;

const defaultEditorOptions = {
  glyphMargin: true,
  minimap: { enabled: false },
  readOnly: true,
  renderValidationDecorations: "on",
  scrollBeyondLastLine: true,
} as const;

function useMonacoEditor() {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const [editor, setEditor] = useState<MonacoEditor | null>(null);

  useEffect(() => {
    if (element) {
      setEditor(monaco.editor.create(element, defaultEditorOptions));
    }
  }, [element]);

  useEffect(() => {
    if (editor) {
      return function dispose() {
        editor.getModel()?.dispose();
        editor.dispose();
      };
    }
  }, [editor]);

  const containerRef = useCallback((newElement: HTMLElement | null) => {
    setElement(newElement);
  }, []);

  return { editor, containerRef };
}

function MonacoWrapper(): ReactElement {
  const { containerRef } = useMonacoEditor();

  return (
    <>
      <Root ref={containerRef} />
    </>
  );
}

export default memo(forwardRef(MonacoWrapper));
